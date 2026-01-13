export type Variant = {
  id: string;
  name: string;
  sku?: string;
  available?: boolean;
  options?: Record<string, string>;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number; // cents
  compareAtPrice?: number | null; // cents
  category: string;
  tags: string[];
  rating?: number;
  images: string[];
  deliveryType?: 'DELIVERY' | 'PICKUP' | 'BOTH';
  pickupLocation?: string | null;
  isActive?: boolean;
  variants?: Variant[];
  paymentLink: string;
  affiliateParamKey?: string;
  affiliateIdValue?: string;
  isFeatured?: boolean;
  isEditorPick?: boolean;
  isFastShipping?: boolean;
  isOfferOfTheDay?: boolean;
  soldCount?: number;
  manualRank?: number | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};
