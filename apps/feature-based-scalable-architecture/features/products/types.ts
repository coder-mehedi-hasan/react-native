export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: FoodCategory;
  rating: number;
  reviews: number;
  isVegan: boolean;
  isSpicy: boolean;
  preparationTime: number; // in minutes
}

export enum FoodCategory {
  BURGERS = 'burgers',
  PIZZA = 'pizza',
  SALADS = 'salads',
  DESSERTS = 'desserts',
  DRINKS = 'drinks',
  SIDES = 'sides',
}

export interface CartItem {
  food: Food;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}
