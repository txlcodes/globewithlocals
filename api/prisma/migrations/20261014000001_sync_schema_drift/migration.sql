-- DropForeignKey
ALTER TABLE "ticket_bookings" DROP CONSTRAINT "ticket_bookings_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "ticket_bookings" DROP CONSTRAINT "ticket_bookings_ticket_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_supplier_id_fkey";

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "abandoned_alerted_at" TIMESTAMP(3),
ADD COLUMN     "admin_escalated_at" TIMESTAMP(3),
ADD COLUMN     "confirmed_at" TIMESTAMP(3),
ADD COLUMN     "guide_confirmation_token" TEXT,
ADD COLUMN     "guide_confirmed_at" TIMESTAMP(3),
ADD COLUMN     "guide_last_reminded_at" TIMESTAMP(3),
ADD COLUMN     "guide_reminder_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "invoice_url" TEXT,
ADD COLUMN     "pre_tour_reminder_sent_at" TIMESTAMP(3),
ADD COLUMN     "recovered_at" TIMESTAMP(3),
ADD COLUMN     "recovery_escalated_at" TIMESTAMP(3),
ADD COLUMN     "recovery_nudge1_sent_at" TIMESTAMP(3),
ADD COLUMN     "recovery_nudge2_sent_at" TIMESTAMP(3),
ADD COLUMN     "recovery_token" TEXT,
ADD COLUMN     "recovery_whatsapp_sent_at" TIMESTAMP(3),
ADD COLUMN     "review_reminder_sent_at" TIMESTAMP(3),
ADD COLUMN     "review_request_sent_at" TIMESTAMP(3),
ADD COLUMN     "review_token" TEXT,
ADD COLUMN     "review_token_expires_at" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'pending_payment';

-- AlterTable
ALTER TABLE "suppliers" ADD COLUMN     "certificates" TEXT;

-- AlterTable
ALTER TABLE "tour_options" ADD COLUMN     "group_pricing_tiers" TEXT,
ADD COLUMN     "images" TEXT;

-- AlterTable
ALTER TABLE "tours" ADD COLUMN     "activity_provider" TEXT,
ADD COLUMN     "checklist_items" TEXT,
ADD COLUMN     "detailed_itinerary" TEXT,
ADD COLUMN     "group_price" DOUBLE PRECISION,
ADD COLUMN     "group_pricing_tiers" TEXT,
ADD COLUMN     "external_activity_id" TEXT,
ADD COLUMN     "itinerary_items" TEXT,
ADD COLUMN     "max_group_size" INTEGER,
ADD COLUMN     "pickup_included" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "unavailable_dates" TEXT,
ADD COLUMN     "unavailable_days_of_week" TEXT,
ADD COLUMN     "visitor_info" TEXT;

-- DropTable
DROP TABLE "ticket_bookings";

-- DropTable
DROP TABLE "tickets";

-- CreateTable
CREATE TABLE "reviews_table" (
    "id" SERIAL NOT NULL,
    "tour_id" INTEGER NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "country" TEXT,
    "rating" INTEGER NOT NULL,
    "guide_rating" INTEGER,
    "value_rating" INTEGER,
    "text" TEXT NOT NULL,
    "photos" TEXT,
    "review_token" TEXT NOT NULL,
    "token_expires_at" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tourists" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tourists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_subscriptions" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT,
    "country" TEXT,
    "subscriptionType" TEXT NOT NULL DEFAULT 'itinerary',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_token" TEXT,
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_table_booking_id_key" ON "reviews_table"("booking_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_table_review_token_key" ON "reviews_table"("review_token");

-- CreateIndex
CREATE INDEX "reviews_table_tour_id_idx" ON "reviews_table"("tour_id");

-- CreateIndex
CREATE INDEX "reviews_table_booking_id_idx" ON "reviews_table"("booking_id");

-- CreateIndex
CREATE INDEX "reviews_table_review_token_idx" ON "reviews_table"("review_token");

-- CreateIndex
CREATE UNIQUE INDEX "tourists_email_key" ON "tourists"("email");

-- CreateIndex
CREATE INDEX "tourists_email_idx" ON "tourists"("email");

-- CreateIndex
CREATE INDEX "email_subscriptions_email_idx" ON "email_subscriptions"("email");

-- CreateIndex
CREATE INDEX "email_subscriptions_city_idx" ON "email_subscriptions"("city");

-- CreateIndex
CREATE UNIQUE INDEX "email_subscriptions_email_city_subscriptionType_key" ON "email_subscriptions"("email", "city", "subscriptionType");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_guide_confirmation_token_key" ON "bookings"("guide_confirmation_token");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_review_token_key" ON "bookings"("review_token");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_recovery_token_key" ON "bookings"("recovery_token");

-- CreateIndex
CREATE INDEX "bookings_status_guide_confirmed_at_idx" ON "bookings"("status", "guide_confirmed_at");

-- AddForeignKey
ALTER TABLE "reviews_table" ADD CONSTRAINT "reviews_table_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews_table" ADD CONSTRAINT "reviews_table_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

