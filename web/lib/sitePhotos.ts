import { IMAGE_HOST } from './imageLoader';

// Site-wide photography (hero, city cards, attractions). Files live at
// <host>/site/<slot>/{128,384,640,1600,3840}.webp; imageLoader picks the size.
export const sitePhoto = (slot: string) => `${IMAGE_HOST}/site/${slot}/1600.webp`;
