import { productsAPI } from './api';

// Mock products for fallback when API is not available (matches backend structure)
const mockProducts = [
  { 
    _id: '1', 
    name: 'ເບຍລາວ', 
    description: 'Traditional Lao beer',
    price: 25.00, 
    image: '/beerlao.jpg', 
    category: { _id: 'cat1', name: 'Beverages', color: '#28a745' }, 
    stock: 50,
    barcode: '123456789001',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  { 
    _id: '2', 
    name: 'ລາບປາ', 
    description: 'Spicy fish salad',
    price: 90.00, 
    image: '/larb.jpeg', 
    category: { _id: 'cat2', name: 'Food', color: '#dc3545' }, 
    stock: 25,
    barcode: '123456789002',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  { 
    _id: '3', 
    name: 'ຕຳໝາກຫຸ່ງ', 
    description: 'Green papaya salad',
    price: 75.00, 
    image: '/papayasalad.jpg', 
    category: { _id: 'cat2', name: 'Food', color: '#dc3545' }, 
    stock: 30,
    barcode: '123456789003',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  { 
    _id: '4', 
    name: 'ຂ້າວໜຽວ', 
    description: 'Sticky rice',
    price: 15.00, 
    image: '/sticky-rice.jpg', 
    category: { _id: 'cat2', name: 'Food', color: '#dc3545' }, 
    stock: 40,
    barcode: '123456789004',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  { 
    _id: '5', 
    name: 'Heineken', 
    description: 'Premium beer',
    price: 60.00, 
    image: '/heineken.jpg', 
    category: { _id: 'cat1', name: 'Beverages', color: '#28a745' }, 
    stock: 35,
    barcode: '123456789005',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  { 
    _id: '6', 
    name: 'ຕົ້ມຊັບປີ້ງແບ້', 
    description: 'Grilled fish soup',
    price: 120.00, 
    image: '/fish-soup.jpeg', 
    category: { _id: 'cat2', name: 'Food', color: '#dc3545' }, 
    stock: 20,
    barcode: '123456789006',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

export const productService = {
  // Get all products - try API first, fallback to mock
  getProducts: async () => {
    try {
      const response = await productsAPI.getAll();
      // Backend returns { success: true, data: [...products] }
      return response.data.data || response.data;
    } catch (error) {
      console.log('API not available, using mock data:', error.message);
      // Return mock data if API fails - format to match backend response
      return mockProducts;
    }
  },

  // Create product - try API first, fallback to mock
  createProduct: async (productData) => {
    try {
      const response = await productsAPI.create(productData);
      return response.data || response;
    } catch (error) {
      console.log('API not available, using mock creation:', error.message);
      // Simulate creation with mock data
      const newProduct = {
        id: Date.now(),
        ...productData
      };
      mockProducts.push(newProduct);
      return newProduct;
    }
  },

  // Update product - try API first, fallback to mock
  updateProduct: async (id, productData) => {
    try {
      const response = await productsAPI.update(id, productData);
      return response.data || response;
    } catch (error) {
      console.log('API not available, using mock update:', error.message);
      // Simulate update with mock data
      const index = mockProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        mockProducts[index] = { ...mockProducts[index], ...productData };
        return mockProducts[index];
      }
      throw new Error('Product not found');
    }
  },

  // Delete product - try API first, fallback to mock
  deleteProduct: async (id) => {
    try {
      const response = await productsAPI.delete(id);
      return response.data || response;
    } catch (error) {
      console.log('API not available, using mock deletion:', error.message);
      // Simulate deletion with mock data
      const index = mockProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
        return { success: true };
      }
      throw new Error('Product not found');
    }
  }
};