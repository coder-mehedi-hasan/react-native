import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useOrders, useCancelOrder } from '../hooks/useOrders';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'Orders'>;

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#FFA500';
    case 'confirmed':
      return '#4CAF50';
    case 'preparing':
      return '#2196F3';
    case 'ready':
      return '#9C27B0';
    case 'delivered':
      return '#4CAF50';
    case 'cancelled':
      return '#F44336';
    default:
      return '#999';
  }
};

const getStatusEmoji = (status: string) => {
  switch (status) {
    case 'pending':
      return '⏳';
    case 'confirmed':
      return '✅';
    case 'preparing':
      return '👨‍🍳';
    case 'ready':
      return '📦';
    case 'delivered':
      return '🚚';
    case 'cancelled':
      return '❌';
    default:
      return '📋';
  }
};

export function OrdersScreen({ navigation }: Props) {
  const ordersQuery = useOrders();
  const cancelOrderMutation = useCancelOrder();

  const orders = ordersQuery.data || [];

  const handleCancelOrder = (orderId: string) => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
      { text: 'Keep Order', style: 'cancel' },
      {
        text: 'Cancel Order',
        style: 'destructive',
        onPress: () => cancelOrderMutation.mutate(orderId),
      },
    ]);
  };

  if (ordersQuery.isLoading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📋</Text>
          <Text style={styles.emptyText}>No orders yet</Text>
          <Text style={styles.emptySubtext}>
            Start shopping to place your first order!
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.emptyLink}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>{item.id}</Text>
                  <Text style={styles.orderDate}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) },
                  ]}
                >
                  <Text style={styles.statusEmoji}>{getStatusEmoji(item.status)}</Text>
                  <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
                </View>
              </View>

              <View style={styles.itemsList}>
                {item.items.map((cartItem, index) => (
                  <View key={index} style={styles.orderItem}>
                    <Text style={styles.orderItemEmoji}>{cartItem.food.image}</Text>
                    <View style={styles.orderItemInfo}>
                      <Text style={styles.orderItemName}>{cartItem.food.name}</Text>
                      <Text style={styles.orderItemQuantity}>
                        Qty: {cartItem.quantity}
                      </Text>
                    </View>
                    <Text style={styles.orderItemPrice}>
                      ${(cartItem.food.price * cartItem.quantity).toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.orderFooter}>
                <View>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
                </View>
                <View style={styles.estimatedDelivery}>
                  <Text style={styles.deliveryLabel}>Est. Delivery</Text>
                  <Text style={styles.deliveryTime}>
                    {new Date(item.estimatedDelivery).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              </View>

              {item.status !== 'delivered' && item.status !== 'cancelled' && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancelOrder(item.id)}
                  disabled={cancelOrderMutation.isPending}
                >
                  <Text style={styles.cancelButtonText}>Cancel Order</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  itemsList: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderItemEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  orderItemQuantity: {
    fontSize: 11,
    color: '#999',
  },
  orderItemPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  totalLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  estimatedDelivery: {
    alignItems: 'flex-end',
  },
  deliveryLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginHorizontal: 12,
    marginBottom: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#F44336',
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyLink: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: 'bold',
    marginTop: 12,
  },
});
