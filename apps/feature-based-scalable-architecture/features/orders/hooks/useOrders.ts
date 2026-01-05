import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartApi, ordersApi } from '../services/cart-orders.service';
import { Food } from '../../products/types';
import { OrderStatus } from '../types';

const CART_QUERY_KEY = ['cart'] as const;
const ORDERS_QUERY_KEY = ['orders'] as const;

export function useCart() {
  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: () => cartApi.getCart(),
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { food: Food; quantity?: number }) =>
      cartApi.addToCart(data.food, data.quantity),
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (foodId: string) => cartApi.removeFromCart(foodId),
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
  });
}

export function useUpdateQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { foodId: string; quantity: number }) =>
      cartApi.updateQuantity(data.foodId, data.quantity),
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: any[]) => {
      const order = await ordersApi.createOrder(items);
      return order;
    },
    onSuccess: () => {
      queryClient.setQueryData(CART_QUERY_KEY, { items: [], lastUpdated: new Date().toISOString() });
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
    },
  });
}

export function useOrders() {
  return useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: () => ordersApi.getOrders(),
  });
}

export function useOrderById(orderId: string) {
  return useQuery({
    queryKey: [...ORDERS_QUERY_KEY, orderId],
    queryFn: () => ordersApi.getOrderById(orderId),
    enabled: !!orderId,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { orderId: string; status: OrderStatus }) =>
      ordersApi.updateOrderStatus(data.orderId, data.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => ordersApi.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
    },
  });
}
