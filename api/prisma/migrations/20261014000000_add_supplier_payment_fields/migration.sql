-- Adds Supplier payment/tax columns that exist in schema.prisma but were
-- never captured in a migration upstream (applied via drift, not migrate).
ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "payment_method" TEXT;
ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "payment_method_details" TEXT;
ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "payment_currency" TEXT;
ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "payment_frequency" TEXT NOT NULL DEFAULT 'monthly';
ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "tax_id" TEXT;
ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "tax_id_type" TEXT;
ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "tax_country" TEXT;
ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "tax_verified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "payment_details_verified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "payment_details_verified_at" TIMESTAMP(3);
