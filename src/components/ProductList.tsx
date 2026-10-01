import ProductCard from './ProductCard';
import type { Product } from '../types/Product';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

function ProductList({
  products,
  onAddToCart,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-search display-4 text-muted"></i>
        <h4 className="mt-3">No products found</h4>
        <p className="text-muted">
          Try searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
