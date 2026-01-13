-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "compareAtPrice" INTEGER,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "images" TEXT[],
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isEditorPick" BOOLEAN NOT NULL DEFAULT false,
    "isFastShipping" BOOLEAN NOT NULL DEFAULT false,
    "isOfferOfTheDay" BOOLEAN NOT NULL DEFAULT false,
    "paymentLink" TEXT NOT NULL,
    "affiliateParamKey" TEXT NOT NULL DEFAULT 'afiliado',
    "affiliateIdValue" TEXT NOT NULL DEFAULT 'carter',
    "soldCount" INTEGER NOT NULL DEFAULT 0,
    "manualRank" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_isFeatured_isEditorPick_isFastShipping_idx" ON "Product"("isFeatured", "isEditorPick", "isFastShipping");
