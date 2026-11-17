// Review types for tour pages. Reviews are read from the database (tours.reviews, served
// as reviewData by /api/public/tours/by-slug) and NOT from hardcoded per-slug TypeScript
// maps: those grew to about 25 MB and pushed the production build past Render's memory.
// getTourReviews() is kept so existing call sites fall through to the DB data; it returns
// null on purpose.

export interface TourReview {
    author: string;
    country: string;
    rating: number;
    date: string;
    text: string;
  /** Guest photos, already rehosted on our own CDN, never hotlinked. */
  photos?: string[];
}

export interface TourReviewData {
    averageRating: number;
    totalReviews: number;
    guideRating: number;
    valueRating: number;
    reviews: TourReview[];
}

export const getTourReviews = (_slug: string | undefined): TourReviewData | null => null;
