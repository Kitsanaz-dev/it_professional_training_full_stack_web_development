import { ordersAPI } from './api';

// Mock orders for fallback when API is not available (matches backend structure)
const mockOrders = [
  {
    _id: '1',
    orderNumber: 'ORD-20240115-001',
    customer: null,
    customerName: 'John Doe',
    items: [
      { 
        _id: 'item1', 
        product: '1', 
        name: 'ເບຍລາວ', 
        price: 25.00, 
        quantity: 2, 
        subtotal: 50.00 
      },
      { 
        _id: 'item2', 
        product: '2', 
        name: 'ລາບປາ', 
        price: 90.00, 
        quantity: 1, 
        subtotal: 90.00 
      }
    ],
    subtotal: 140.00,
    tax: 14.00,
    discount: 0.00,
    total: 154.00,
    paymentMethod: 'cash',
    status: 'completed',
    paymentStatus: 'paid',
    notes: '',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    _id: '2',
    orderNumber: 'ORD-20240115-002',
    customer: null,
    customerName: 'Jane Smith',
    items: [
      { 
        _id: 'item3', 
        product: '3', 
        name: 'ຕຳໝາກຫຸ່ງ', 
        price: 75.00, 
        quantity: 1, 
        subtotal: 75.00 
      },
      { 
        _id: 'item4', 
        product: '5', 
        name: 'Heineken', 
        price: 60.00, 
        quantity: 1, 
        subtotal: 60.00 
      }
    ],
    subtotal: 135.00,
    tax: 13.50,
    discount: 5.00,
    total: 143.50,
    paymentMethod: 'card',
    status: 'pending',
    paymentStatus: 'unpaid',
    notes: '',
    createdAt: '2024-01-15T11:15:00Z'
  },
  {
    _id: '3',
    orderNumber: 'ORD-20240115-003',
    customer: null,
    customerName: 'Bob Wilson',
    items: [
      { 
        _id: 'item5', 
        product: '6', 
        name: 'ຕົ້ມຊັບປີ້ງແບ້', 
        price: 120.00, 
        quantity: 1, 
        subtotal: 120.00 
      }
    ],
    subtotal: 120.00,
    tax: 12.00,
    discount: 0.00,
    total: 132.00,
    paymentMethod: 'cash',
    status: 'cancelled',
    paymentStatus: 'refunded',
    notes: 'Customer cancelled',
    createdAt: '2024-01-15T09:45:00Z'
  }
];

export const orderService = {
  // Get all orders - try API first, fallback to mock
  getOrders: async () => {
    try {
      const response = await ordersAPI.getAll();
      // Backend returns { success: true, data: [...orders] }
      return response.data.data || response.data;
    } catch (error) {
      console.log('API not available, using mock data:', error.message);
      // Return mock data if API fails
      return mockOrders;
    }
  },

  // Create order - try API first, fallback to mock
  createOrder: async (orderData) => {
    try {
      const response = await ordersAPI.create(orderData);
      return response.data || response;
    } catch (error) {
      console.log('API not available, using mock creation:', error.message);
      // Simulate creation with mock data
      const newOrder = {
        id: `ORD-${String(mockOrders.length + 1).padStart(3, '0')}`,
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      mockOrders.unshift(newOrder); // Add to beginning
      return newOrder;
    }
  },

  // Update order status - try API first, fallback to mock
  updateOrderStatus: async (id, status) => {
    try {
      const response = await ordersAPI.updateStatus(id, status);
      return response.data || response;
    } catch (error) {
      console.log('API not available, using mock update:', error.message);
      // Simulate update with mock data
      const order = mockOrders.find(o => o.id === id);
      if (order) {
        order.status = status;
        return order;
      }
      throw new Error('Order not found');
    }
  },

  // Get order by ID - try API first, fallback to mock
  getOrderById: async (id) => {
    try {
      const response = await ordersAPI.getById(id);
      return response.data || response;
    } catch (error) {
      console.log('API not available, using mock data:', error.message);
      // Find in mock data
      const order = mockOrders.find(o => o.id === id);
      if (order) {
        return order;
      }
      throw new Error('Order not found');
    }
  }
};