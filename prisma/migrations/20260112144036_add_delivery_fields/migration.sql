-- CreateEnum
CREATE TYPE "DeliveryType" AS ENUM ('DELIVERY', 'PICKUP', 'BOTH');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deliveryType" "DeliveryType" NOT NULL DEFAULT 'BOTH',
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pickupLocation" TEXT;
