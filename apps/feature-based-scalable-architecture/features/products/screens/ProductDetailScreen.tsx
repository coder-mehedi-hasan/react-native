import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { useFoodById } from '../hooks/useProducts';
import { useAddToCart } from '../../orders/hooks/useOrders';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'ProductDetail'>;

export function ProductDetailScreen({ route, navigation }: Props) {
  const { foodId } = route.params as { foodId: string };
  const [quantity, setQuantity] = useState(1);

  const foodQuery = useFoodById(foodId);
  const addToCartMutation = useAddToCart();

  const food = foodQuery.data;

  const handleAddToCart = async () => {
    if (!food) return;

    try {
      await addToCartMutation.mutateAsync({ food, quantity });
      Alert.alert('Success', `Added ${quantity} ${food.name}(s) to cart!`, [
        {
          text: 'Continue Shopping',
          onPress: () => navigation.goBack(),
        },
        {
          text: 'Go to Cart',
          onPress: () => navigation.navigate('Cart'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add to cart');
    }
  };

  if (foodQuery.isLoading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  if (!food) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.errorText}>Food not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Text style={styles.mainImage}>{food.image}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{food.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {food.rating}</Text>
              <Text style={styles.reviews}>({food.reviews} reviews)</Text>
            </View>
          </View>
          <Text style={styles.price}>${food.price.toFixed(2)}</Text>
        </View>

        <Text style={styles.description}>{food.description}</Text>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Preparation Time</Text>
            <Text style={styles.detailValue}>⏱️ {food.preparationTime} minutes</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{food.category.toUpperCase()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Attributes</Text>
            <View style={styles.attributes}>
              {food.isVegan && <Text style={styles.badge}>🌱 Vegan</Text>}
              {food.isSpicy && <Text style={styles.badge}>🌶️ Spicy</Text>}
            </View>
          </View>
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.priceBreakdown}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Unit Price</Text>
            <Text style={styles.priceValue}>${food.price.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Quantity</Text>
            <Text style={styles.priceValue}>x {quantity}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>
              ${(food.price * quantity).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.addButton, addToCartMutation.isPending && styles.buttonDisabled]}
        onPress={handleAddToCart}
        disabled={addToCartMutation.isPending}
      >
        {addToCartMutation.isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.addButtonText}>Add to Cart</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
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
  imageContainer: {
    backgroundColor: 'white',
    padding: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainImage: {
    fontSize: 120,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#999',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  detailsSection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  attributes: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    fontSize: 12,
    backgroundColor: '#ffe6d5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: '#FF6B35',
    fontWeight: '500',
  },
  quantitySection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: 'bold',
    minWidth: 50,
    textAlign: 'center',
  },
  priceBreakdown: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
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
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  link: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
});
