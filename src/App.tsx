import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import type { CartItem, Product } from './types/Product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          'https://fakestoreapi.com/products'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }

        const data: Product[] = await response.json();

        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load products.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  const handleUpdateQuantity = (
    productId: number,
    quantity: number
  ) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === productId
          ? {
            ...item,
            quantity,
          }
          : item
      )
    );
  };

  const handleAddProduct = (product: Product) => {
    setProducts((previousProducts) => [
      product,
      ...previousProducts,
    ]);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              loading={loading}
              error={error}
              onAddToCart={handleAddToCart}
              onAddProduct={handleAddProduct}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={products}
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onRemove={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          }
        />

        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
