import { Link } from 'react-router-dom';
import type { CartItem } from '../types/Product';

interface CartProps {
  cart: CartItem[];
  onRemove: (productId: number) => void;
  onUpdateQuantity: (
    productId: number,
    quantity: number
  ) => void;
}

function Cart({
  cart,
  onRemove,
  onUpdateQuantity,
}: CartProps) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="container py-5 text-center">
        <i className="bi bi-cart-x display-1 text-muted"></i>

        <h2 className="mt-3">Your cart is empty</h2>

        <p className="text-muted">
          Add some products to your cart first.
        </p>

        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="mb-4">Shopping Cart</h1>

      <div className="row g-4">
        <div className="col-lg-8">
          {cart.map((item) => (
            <div
              className="card border-0 shadow-sm mb-3"
              key={item.id}
            >
              <div className="card-body">
                <div className="row align-items-center g-3">
                  <div className="col-3 col-md-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid cart-image"
                    />
                  </div>

                  <div className="col-9 col-md-4">
                    <h5>{item.title}</h5>
                    <p className="text-muted mb-0">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="col-6 col-md-3">
                    <div className="input-group">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span className="form-control text-center">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-4 col-md-2 fw-bold text-end">
                    $
                    {(item.price * item.quantity).toFixed(2)}
                  </div>

                  <div className="col-2 col-md-1 text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onRemove(item.id)}
                      title="Remove"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4>Order Summary</h4>

              <hr />

              <div className="d-flex justify-content-between">
                <span>Total Items</span>
                <span>
                  {cart.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <strong>Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>

              <button className="btn btn-success w-100 mt-4">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
