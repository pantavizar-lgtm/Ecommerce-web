import { Link } from 'react-router-dom';
import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm product-card">
        <Link
          to={`/product/${product.id}`}
          className="text-decoration-none"
        >
          <div className="product-image-container">
            <img
              src={product.image}
              className="card-img-top product-image"
              alt={product.title}
            />
          </div>
        </Link>

        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary align-self-start mb-2">
            {product.category}
          </span>

          <h5 className="card-title product-title">
            {product.title}
          </h5>

          <div className="mb-2">
            <span className="text-warning">
              <i className="bi bi-star-fill"></i>
            </span>

            <span className="ms-1">
              {product.rating.rate}
            </span>

            <small className="text-muted ms-1">
              ({product.rating.count} reviews)
            </small>
          </div>

          <h4 className="fw-bold mt-auto">
            ${product.price.toFixed(2)}
          </h4>

          <button
            className="btn btn-primary w-100 mt-2"
            onClick={() => onAddToCart(product)}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
