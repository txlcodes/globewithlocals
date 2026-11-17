// Image/document storage for GlobeWithLocals: Cloudflare R2 only.
// Every upload is encoded to a 128/384/640/1600 WebP ladder and stored
// straight to R2, keyed as <key>/<width>.webp.
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const WIDTHS = [128, 384, 640, 1600];

function r2Client() {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

const BUCKET = () => process.env.R2_BUCKET || 'globewithlocals-images';
const PUBLIC_HOST = () => (process.env.R2_PUBLIC_HOST || 'https://images.globewithlocals.com').replace(/\/$/, '');

export function isR2Configured() {
  return !!(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY);
}

/** Decode once, emit every width as WebP. Never upscales past the original. */
async function buildVariants(buffer) {
  const base = sharp(buffer);
  const meta = await base.metadata();
  const out = {};
  for (const w of WIDTHS) {
    const width = Math.min(w, meta.width || w);
    out[w] = await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  }
  return out;
}

function keyFor(folder, publicId) {
  const safeFolder = String(folder || 'globewithlocals').replace(/^\/+|\/+$/g, '');
  const id = publicId || `img_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  return `${safeFolder}/${id}`;
}

/**
 * Upload a single image from a base64 data URL (or pass through an
 * already-hosted http(s) URL unchanged — e.g. a supplier re-saving a tour
 * without changing its cover).
 */
export async function uploadImage(base64Image, folder = 'globewithlocals', publicId = null) {
  if (typeof base64Image === 'string' && /^https?:\/\//i.test(base64Image.trim())) {
    return base64Image.trim();
  }
  try {
    const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
    const buffer = Buffer.from(base64Data, 'base64');
    const key = keyFor(folder, publicId);
    const variants = await buildVariants(buffer);
    const client = r2Client();
    await Promise.all(
      Object.entries(variants).map(([w, data]) =>
        client.send(new PutObjectCommand({
          Bucket: BUCKET(),
          Key: `${key}/${w}.webp`,
          Body: data,
          ContentType: 'image/webp',
          CacheControl: 'public, max-age=31536000, immutable',
        }))
      )
    );
    return `${PUBLIC_HOST()}/${key}/1600.webp`;
  } catch (error) {
    console.error('R2 image upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

/** Upload a raw document (PDF) to R2 — no resize ladder, stored as-is. */
export async function uploadDocument(base64Data, folder = 'invoices', publicId) {
  try {
    const data = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
    const buffer = Buffer.from(data, 'base64');
    const key = keyFor(folder, publicId);
    const client = r2Client();
    await client.send(new PutObjectCommand({
      Bucket: BUCKET(),
      Key: `${key}.pdf`,
      Body: buffer,
      ContentType: 'application/pdf',
      CacheControl: 'public, max-age=31536000, immutable',
    }));
    return `${PUBLIC_HOST()}/${key}.pdf`;
  } catch (error) {
    console.error('R2 document upload error:', error);
    throw new Error(`Failed to upload document: ${error.message}`);
  }
}

export async function uploadMultipleImages(base64Images, folder = 'globewithlocals') {
  try {
    const urls = [];
    for (let i = 0; i < base64Images.length; i++) {
      urls.push(await uploadImage(base64Images[i], folder, `${folder.replace(/\//g, '_')}_${Date.now()}_${i}`));
    }
    return urls;
  } catch (error) {
    console.error('R2 batch upload error:', error);
    throw new Error(`Failed to upload images: ${error.message}`);
  }
}

/** Delete every stored width variant for an image key (or a full R2 photo URL). */
export async function deleteImage(keyOrUrl) {
  try {
    let key = keyOrUrl;
    const m = typeof keyOrUrl === 'string' && keyOrUrl.match(/^https?:\/\/[^/]+\/(.+)\/\d+\.webp$/);
    if (m) key = m[1];
    const client = r2Client();
    await Promise.all(
      WIDTHS.map((w) =>
        client.send(new DeleteObjectCommand({ Bucket: BUCKET(), Key: `${key}/${w}.webp` })).catch(() => {})
      )
    );
  } catch (error) {
    console.error('R2 delete error:', error);
    // Don't throw — deletion failures shouldn't break the app.
  }
}

export async function deleteMultipleImages(keysOrUrls) {
  try {
    await Promise.all(keysOrUrls.map((k) => deleteImage(k)));
  } catch (error) {
    console.error('R2 batch delete error:', error);
  }
}
