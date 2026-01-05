import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useCart, useRemoveFromCart, useUpdateQuantity, useCreateOrder } from '../hooks/useOrders';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'Cart'>;

export function CartScreen({ navigation }: Props) {
  const cartQuery = useCart();
  const removeFromCartMutation = useRemoveFromCart();
  const updateQuantityMutation = useUpdateQuantity();
  const createOrderMutation = useCreateOrder();

  const cart = cartQuery.data;
  const items = cart?.items || [];
  const total = items.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Please add items before checkout');
      return;
    }

    try {
      await createOrderMutation.mutateAsync(items);
      Alert.alert('Order Placed', 'Your order has been confirmed!', [
        {
          text: 'View Orders',
          onPress: () => navigation.navigate('Orders'),
        },
        {
          text: 'Continue Shopping',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to place order');
    }
  };

  const handleRemoveItem = (foodId: string) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => removeFromCartMutation.mutate(foodId),
      },
    ]);
  };

  if (cartQuery.isLoading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.emptyLink}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.food.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemImage}>{item.food.image}</Text>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.food.name}</Text>
                  <Text style={styles.itemPrice}>${item.food.price.toFixed(2)} each</Text>
                </View>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantityMutation.mutate({
                        foodId: item.food.id,
                        quantity: Math.max(1, item.quantity - 1),
                      })
                    }
                  >
                    <Text style={styles.quantityButton}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantityMutation.mutate({
                        foodId: item.food.id,
                        quantity: item.quantity + 1,
                      })
                    }
                  >
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemTotal}>
                  ${(item.food.price * item.quantity).toFixed(2)}
                </Text>
                <TouchableOpacity onPress={() => handleRemoveItem(item.food.id)}>
                  <Text style={styles.removeButton}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>$0.00</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={[styles.checkoutButton, createOrderMutation.isPending && styles.buttonDisabled]}
              onPress={handleCheckout}
              disabled={createOrderMutation.isPending}
            >
              <Text style={styles.checkoutButtonText}>
                {createOrderMutation.isPending ? 'Processing...' : 'Place Order'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
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
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    fontSize: 40,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 12,
    color: '#666',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
    fontSize: 14,
  },
  quantity: {
    paddingHorizontal: 8,
    fontWeight: 'bold',
    minWidth: 24,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginRight: 8,
    minWidth: 60,
    textAlign: 'right',
  },
  removeButton: {
    fontSize: 18,
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
  emptyLink: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: 'bold',
    marginTop: 12,
  },
  summary: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: '#FF6B35',
    paddingVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  checkoutButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
