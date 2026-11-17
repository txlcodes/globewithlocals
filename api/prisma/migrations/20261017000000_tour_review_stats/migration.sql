-- Review summary on the tour row: lets list cards show a rating and lets the list API order a
-- city by popularity without reading the reviews JSON blob. Nullable, no backfill needed.
ALTER TABLE "tours" ADD COLUMN IF NOT EXISTS "review_avg" DOUBLE PRECISION;
ALTER TABLE "tours" ADD COLUMN IF NOT EXISTS "review_count" INTEGER;
CREATE INDEX IF NOT EXISTS "tours_status_city_review_count_idx" ON "tours"("status", "city", "review_count" DESC);
