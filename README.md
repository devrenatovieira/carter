# Carter | Shopay-Canvi - Premium Storefront (Next.js + TypeScript)

Projeto de vitrine e-commerce premium minimalista com checkout por link externo (modelo afiliados/white-label).

Principais tecnologias
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui (componentes UI inspirados, com UI personalizada)
- Prisma + PostgreSQL
- NextAuth (Auth.js) com credenciais para Admin

Instalacao
1. npm i
2. Configure `.env.local` com as variaveis abaixo
3. npx prisma migrate dev
4. npx prisma db seed
5. npm run dev

Estrutura
- `/app` - Next App Router pages
- `/components` - Componentes reutilizaveis (Header, Footer, ProductCard, etc.)
- `/data/seed.json` - Seed de produtos (substitua por CMS quando desejar)
- `/lib` - Utilitarios (affiliate builder, analytics, cart store, formatadores)
- `/prisma` - Schema e seed
- `/public` - Imagens e assets

Checkout
- O botao "Finalizar pagamento" redireciona ao `paymentLink` cadastrado no produto, sem adicionar parametros extras.
- Se o parceiro nao suportar checkout multi-item, o app gera um link por item.

Admin
- Acesso em `/admin` (login em `/admin/login`)
- Usuario e senha definidos via `ADMIN_USER` e `ADMIN_PASSWORD_HASH` (ou `ADMIN_PASSWORD` em dev)
- CRUD completo de produtos, preview e upload local de imagens
- Uploads usam Supabase Storage quando `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estao configurados (fallback local em dev)

Analytics & Consent
- `lib/analytics` contem stubs que enviam eventos para `dataLayer` (GTM/GA4/Meta Pixel atraves de env vars).
- Banner de consentimento LGPD simples armazena escolha em `localStorage`.

Deploy
- Projetado para deploy no Vercel; adicione `NEXT_PUBLIC_SITE_URL`, `GTM_ID`, etc., nas variaveis de ambiente.

Vercel checklist
- Configure `NEXT_PUBLIC_SITE_URL` para o dominio final.
- Adicione `NEXT_PUBLIC_AFFILIATE` padrao (ex: CANVI).
- Configure `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_META_PIXEL_ID` conforme necessario (opcional).
- Habilite "Otimizacao de imagens" se usar dominios externos.
- Faca build (`npm run build`) para conferir warnings/erros antes de deploy.

Proximos passos sugeridos
- Trocar o upload local por Supabase Storage ou outro CDN
- Substituir `data/seed.json` por um CMS ou API
- Implementar testes end-to-end do fluxo de checkout

License: MIT

Variaveis de ambiente (exemplo)
```
DATABASE_URL=postgresql://user:password@localhost:5432/carter
NEXTAUTH_SECRET=coloque-um-secret-forte
NEXTAUTH_URL=http://localhost:3000
ADMIN_USER=admin@carter.com.br
ADMIN_PASSWORD_HASH=hash_bcrypt_da_senha
# opcional (apenas para dev local, se nao usar hash)
# ADMIN_PASSWORD=senha_em_texto
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET=carter-products
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_AFFILIATE=carter
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

Gerar hash de senha (exemplo)
```
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('sua_senha', 10).then(console.log)"
```
