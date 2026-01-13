import ProductForm from '@/components/admin/ProductForm';
import { createProduct } from '@/app/admin/actions';

export default function NewProductPage() {
  return <ProductForm title="Novo produto" action={createProduct} />;
}
