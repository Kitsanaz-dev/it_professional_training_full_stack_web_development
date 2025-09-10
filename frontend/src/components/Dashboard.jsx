import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';
import Orders from './Orders';
import Reports from './Reports';

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('products');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, ordersData] = await Promise.all([
          productService.getProducts(),
          orderService.getOrders()
        ]);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartItem = (productId, quantity) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300">Loading...</span>
        </div>
      );
    }

    switch (activeTab) {
      case 'products':
        return <ProductList products={products} onAddToCart={addToCart} />;
      case 'orders':
        return <Orders orders={orders} />;
      case 'reports':
        return <Reports orders={orders} products={products} />;
      default:
        return <ProductList products={products} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItemsCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        toggleCart={toggleCart}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        user={user}
        onLogout={onLogout}
      />

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Message */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Welcome back, {user?.firstName} {user?.lastName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Role: <span className="font-medium capitalize">{user?.role}</span>
          </p>
        </div>

        {/* Main Content */}
        {renderContent()}
      </div>

      {/* Cart Sidebar */}
      <Cart
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={toggleCart}
        onUpdateItem={updateCartItem}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
    </div>
  );
}

export default Dashboard;