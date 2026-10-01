import { Link } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
}

function Navbar({ cartCount }: NavbarProps) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-shop me-2"></i>
          ShopZone
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <i className="bi bi-cart3 me-1"></i>
                Cart

                {cartCount > 0 && (
                  <span className="badge bg-danger rounded-pill ms-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
