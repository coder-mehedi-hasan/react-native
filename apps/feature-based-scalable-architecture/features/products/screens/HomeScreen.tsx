import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useAllFoods, useFeaturedFoods, useSearchFoods } from '../hooks/useProducts';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'HomeStack'>;

export function HomeScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const allFoodsQuery = useAllFoods();
  const featuredQuery = useFeaturedFoods();
  const searchQuery_hook = useSearchFoods(searchQuery);

  // Use search results if available, otherwise show all foods
  const foods =
    searchQuery.length > 0
      ? searchQuery_hook.data || []
      : allFoodsQuery.data || [];

  const isLoading = searchQuery.length > 0 ? searchQuery_hook.isLoading : allFoodsQuery.isLoading;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Search foods..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
      />

      {isLoading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#FF6B35" />
        </View>
      ) : (
        <FlatList
          data={foods}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.foodCard}
              onPress={() =>
                navigation.navigate('ProductDetail', { foodId: item.id })
              }
            >
              <Text style={styles.foodImage}>{item.image}</Text>
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.foodFooter}>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                  <View style={styles.rating}>
                    <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                    <Text style={styles.reviews}>({item.reviews})</Text>
                  </View>
                </View>
                <View style={styles.tags}>
                  {item.isVegan && <Text style={styles.tag}>🌱 Vegan</Text>}
                  {item.isSpicy && <Text style={styles.tag}>🌶️ Spicy</Text>}
                  <Text style={styles.tag}>⏱️ {item.preparationTime}m</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No foods found</Text>
            </View>
          }
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
  searchInput: {
    margin: 16,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  foodCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  foodImage: {
    fontSize: 60,
    marginRight: 12,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  foodDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  foodFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
  reviews: {
    fontSize: 11,
    color: '#999',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    fontSize: 11,
    backgroundColor: '#ffe6d5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    color: '#FF6B35',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
