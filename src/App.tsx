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
  // Product state
  const [products, setProducts] = useState<Product[]>([]);

  // Shopping cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  // API loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme !== null) {
      return savedTheme === 'true';
    }

    return window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
  });

  // Apply dark/light theme
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );

    localStorage.setItem(
      'darkMode',
      String(darkMode)
    );
  }, [darkMode]);

  // Fetch products from Fake Store API
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

  // Add product to cart
  const handleAddToCart = (product: Product) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.id === product.id
      );

      // If product already exists, increase quantity
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

      // Otherwise add a new item
      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Remove product completely from cart
  const handleRemoveFromCart = (productId: number) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Update cart item quantity
  const handleUpdateQuantity = (
    productId: number,
    quantity: number
  ) => {
    // Remove item if quantity becomes 0
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

  // Add a new product from the form
  const handleAddProduct = (product: Product) => {
    setProducts((previousProducts) => [
      product,
      ...previousProducts,
    ]);
  };

  // Calculate total number of products in cart
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar
        cartCount={cartCount}
        darkMode={darkMode}
        onToggleDarkMode={() =>
          setDarkMode((previous) => !previous)
        }
      />

      <Routes>
        {/* Home / Product List */}
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

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={products}
              onAddToCart={handleAddToCart}
            />
          }
        />

        {/* Shopping Cart */}
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

        {/* Redirect /home to / */}
        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default App;
