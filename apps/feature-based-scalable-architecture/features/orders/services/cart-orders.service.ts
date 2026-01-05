import { Food, CartItem, Order, OrderStatus } from '../../products/types';
import { storage } from '../../../shared/services/storage';
import type { Order as OrderType } from '../types';

const CART_KEY = 'cart';
const ORDERS_KEY = 'orders';

interface CartData {
  items: CartItem[];
  lastUpdated: string;
}

export const cartApi = {
  async getCart(): Promise<CartData> {
    const data = await storage.getItem(CART_KEY);
    return (
      data || {
        items: [],
        lastUpdated: new Date().toISOString(),
      }
    );
  },

  async addToCart(food: Food, quantity: number = 1) {
    const cart = await this.getCart();
    const existingItem = cart.items.find(item => item.food.id === food.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ food, quantity });
    }

    cart.lastUpdated = new Date().toISOString();
    await storage.setItem(CART_KEY, cart);
    return cart;
  },

  async removeFromCart(foodId: string) {
    const cart = await this.getCart();
    cart.items = cart.items.filter(item => item.food.id !== foodId);
    cart.lastUpdated = new Date().toISOString();
    await storage.setItem(CART_KEY, cart);
    return cart;
  },

  async updateQuantity(foodId: string, quantity: number) {
    const cart = await this.getCart();
    const item = cart.items.find(i => i.food.id === foodId);

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(foodId);
      }
      item.quantity = quantity;
    }

    cart.lastUpdated = new Date().toISOString();
    await storage.setItem(CART_KEY, cart);
    return cart;
  },

  async clearCart() {
    await storage.removeItem(CART_KEY);
    return { items: [], lastUpdated: new Date().toISOString() };
  },

  async calculateTotal(items: CartItem[]): Promise<number> {
    return items.reduce((total, item) => {
      return total + item.food.price * item.quantity;
    }, 0);
  },
};

export const ordersApi = {
  async createOrder(items: CartItem[]): Promise<Order> {
    const total = await cartApi.calculateTotal(items);
    const order: Order = {
      id: `ORDER_${Date.now()}`,
      items,
      total,
      status: OrderStatus.PENDING,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(), // 30 mins
    };

    await this.saveOrder(order);
    await cartApi.clearCart();

    return order;
  },

  async saveOrder(order: Order) {
    const orders = await this.getOrders();
    orders.push(order);
    await storage.setItem(ORDERS_KEY, orders);
  },

  async getOrders(): Promise<Order[]> {
    const orders = await storage.getItem(ORDERS_KEY);
    return orders || [];
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const orders = await this.getOrders();
    return orders.find(o => o.id === orderId) || null;
  },

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
    const orders = await this.getOrders();
    const order = orders.find(o => o.id === orderId);

    if (order) {
      order.status = status;
      await storage.setItem(ORDERS_KEY, orders);
    }

    return order || null;
  },

  async cancelOrder(orderId: string): Promise<boolean> {
    const order = await this.getOrderById(orderId);
    if (order && order.status !== OrderStatus.DELIVERED) {
      await this.updateOrderStatus(orderId, OrderStatus.CANCELLED);
      return true;
    }
    return false;
  },
};
