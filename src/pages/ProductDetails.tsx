import { Link, useParams } from 'react-router-dom';
import type { Product } from '../types/Product';

interface ProductDetailsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

function ProductDetails({
  products,
  onAddToCart,
}: ProductDetailsProps) {
  const { id } = useParams<{ id: string }>();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          Product not found.
        </div>

        <Link to="/" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <main className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        <i className="bi bi-arrow-left me-2"></i>
        Back to Products
      </Link>

      <div className="card border-0 shadow-sm">
        <div className="row g-0">
          <div className="col-md-5 product-details-image-container">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid product-details-image"
            />
          </div>

          <div className="col-md-7">
            <div className="card-body p-4 p-lg-5">
              <span className="badge bg-secondary mb-3">
                {product.category}
              </span>

              <h1 className="display-6 fw-bold">
                {product.title}
              </h1>

              <div className="mb-3">
                <span className="text-warning">
                  <i className="bi bi-star-fill"></i>
                </span>

                <span className="ms-2">
                  {product.rating.rate} / 5
                </span>

                <span className="text-muted ms-2">
                  ({product.rating.count} reviews)
                </span>
              </div>

              <h2 className="fw-bold mb-4">
                ${product.price.toFixed(2)}
              </h2>

              <p className="text-muted">
                {product.description}
              </p>

              <button
                className="btn btn-primary btn-lg"
                onClick={() => onAddToCart(product)}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
