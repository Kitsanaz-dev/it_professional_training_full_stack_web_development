// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Reports from "./components/Reports";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState("products");

  // Move products state to App level for stock management
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Coffee",
      price: 25000,
      stock: 20,
      category: "Beverages",
      image: "/coffee.jpg",
    },
    {
      id: 2,
      name: "Sandwich",
      price: 30000,
      stock: 15,
      category: "Food",
      image: "/sandwich.jpg",
    },
    {
      id: 3,
      name: "Juice",
      price: 25000,
      stock: 30,
      category: "Beverages",
      image: "/juice.jpeg",
    },
    {
      id: 4,
      name: "Donut",
      price: 15000,
      stock: 10,
      category: "Food",
      image: "/donut.jpg",
    },
    {
      id: 5,
      name: "Tea",
      price: 20000,
      stock: 18,
      category: "Beverages",
      image: "/tea.jpg",
    },
    {
      id: 6,
      name: "Salad",
      price: 40000,
      stock: 12,
      category: "Food",
      image: "/salad.jpg",
    },
    {
      id: 7,
      name: "Papaya Salad",
      price: 30000,
      stock: 9,
      category: "Food",
      image: "/papayasalad.jpg",
    },
    {
      id: 8,
      name: "Beerlao",
      price: 15000,
      stock: 100,
      category: "Beverage",
      image: "/beerlao.jpg",
    },
  ]);

  const addToCart = (product) => {
    // Check if product has stock available
    const currentProduct = products.find((p) => p.id === product.id);
    if (!currentProduct || currentProduct.stock <= 0) {
      return; // Don't add to cart if no stock
    }

    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Check if we can increase quantity (stock available)
      if (existingItem.quantity >= currentProduct.stock) {
        return; // Don't allow adding more than available stock
      }

      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    // Reduce stock by 1
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );
  };

  const removeFromCart = (productId) => {
    // Find the item being removed to restore its stock
    const removedItem = cartItems.find((item) => item.id === productId);
    if (removedItem) {
      // Restore stock
      setProducts(
        products.map((p) =>
          p.id === productId
            ? { ...p, stock: p.stock + removedItem.quantity }
            : p
        )
      );
    }

    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    const currentItem = cartItems.find((item) => item.id === productId);
    const currentProduct = products.find((p) => p.id === productId);

    if (!currentItem || !currentProduct) return;

    const quantityDiff = newQuantity - currentItem.quantity;

    // Check if we have enough stock for the increase
    if (quantityDiff > 0 && currentProduct.stock < quantityDiff) {
      return; // Don't allow update if not enough stock
    }

    // Update cart quantity
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Update product stock (subtract the difference)
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - quantityDiff } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto py-8">
        {activeTab === "products" ? (
          <div className="flex flex-col xl:flex-row gap-6 mt-20">
            {/* Products Section */}
            <div className="flex-[2]">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  Products
                </h1>
                <p className="text-gray-700 dark:text-gray-300">
                  Browse and add products to your cart
                </p>
              </div>
              <ProductList products={products} onAddToCart={addToCart} />
            </div>

            {/* Cart Section */}
            <div className="flex-1">
              <Cart
                cartItems={cartItems}
                onRemoveItem={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            </div>
          </div>
        ) : activeTab === "orders" ? (
          <div className="mt-20">
            <Orders />
          </div>
        ) : (
          <div className="mt-20">
            <Reports />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
