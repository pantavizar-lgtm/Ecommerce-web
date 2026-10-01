import { useMemo, useState } from 'react';

import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import SearchBar from '../components/SearchBar';

import type { Product } from '../types/Product';

interface HomeProps {
  products: Product[];
  loading: boolean;
  error: string;
  onAddToCart: (product: Product) => void;
  onAddProduct: (product: Product) => void;
}

function Home({
  products,
  loading,
  error,
  onAddToCart,
  onAddProduct,
}: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (sortOrder === 'low-high') {
        return a.price - b.price;
      }

      if (sortOrder === 'high-low') {
        return b.price - a.price;
      }

      return 0;
    });
  }, [products, searchTerm, sortOrder]);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold">
            Welcome to ShopZone
          </h1>

          <p className="lead text-muted">
            Find products you love at great prices.
          </p>
        </div>
      </section>

      <div className="container pb-5">

        {/* Add Product Form */}
        <ProductForm onAddProduct={onAddProduct} />

        {/* Search and Sort */}
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by price</option>
              <option value="low-high">
                Price: Low to High
              </option>
              <option value="high-low">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && <ProductSkeletonList />}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        {/* Actual Products */}
        {!loading && !error && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h3 mb-0">
                Products
              </h2>

              <span className="text-muted">
                {filteredAndSortedProducts.length} products
              </span>
            </div>

            <ProductList
              products={filteredAndSortedProducts}
              onAddToCart={onAddToCart}
            />
          </>
        )}
      </div>
    </main>
  );
}

export default Home;
