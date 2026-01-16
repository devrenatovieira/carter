import { z } from 'zod';

export const productSchema = z
  .object({
    slug: z
      .string()
      .min(3, 'Slug precisa ter pelo menos 3 caracteres')
      .regex(/^[a-z0-9-]+$/, 'Slug inválido (use letras minúsculas, números e hífen)'),

    title: z.string().min(3, 'Nome do produto precisa ter pelo menos 3 caracteres'),

    shortDescription: z.string().min(10, 'Resumo precisa ter pelo menos 10 caracteres'),
    description: z.string().min(10, 'Descrição precisa ter pelo menos 10 caracteres'),

    // Em centavos (seu actions.ts já converte). Evita produto com preço 0.
    price: z.coerce.number().int().min(1, 'Preço inválido'),

    compareAtPrice: z.coerce.number().int().min(0).optional().nullable(),

    category: z.string().min(2, 'Categoria é obrigatória'),

    tags: z.array(z.string()).default([]),

    rating: z.coerce.number().min(0).max(5).default(0),

    images: z
      .array(
        z
          .string()
          .min(1)
          .refine((value) => value.startsWith('http') || value.startsWith('/'), {
            message: 'Imagem inválida (use uma URL http(s) ou caminho /... )'
          })
      )
      .min(1, 'Envie pelo menos 1 imagem do produto'),

    deliveryType: z.enum(['DELIVERY', 'PICKUP', 'BOTH']).default('BOTH'),

    pickupLocation: z.string().optional().nullable(),

    isActive: z.coerce.boolean().default(true),
    isFeatured: z.coerce.boolean().default(false),
    isEditorPick: z.coerce.boolean().default(false),
    isFastShipping: z.coerce.boolean().default(false),
    isOfferOfTheDay: z.coerce.boolean().default(false),

    paymentLink: z.string().url('Informe um link de pagamento válido (Shopay-Canvi)'),

    affiliateParamKey: z.string().min(2).default('afiliado'),
    affiliateIdValue: z.string().min(2).default('carter'),

    soldCount: z.coerce.number().int().min(0).default(0),

    manualRank: z.coerce.number().int().min(0).optional().nullable()
  })
  .superRefine((data, ctx) => {
   
    if ((data.deliveryType === 'PICKUP' || data.deliveryType === 'BOTH') && !data.pickupLocation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Local de retirada é obrigatório para produtos com retirada.',
        path: ['pickupLocation']
      });
    }

    
    if (data.compareAtPrice != null && data.compareAtPrice < data.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Preço “de” (compareAtPrice) não pode ser menor que o preço atual.',
        path: ['compareAtPrice']
      });
    }
  });
