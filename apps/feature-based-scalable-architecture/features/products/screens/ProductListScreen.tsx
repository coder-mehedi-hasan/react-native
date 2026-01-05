import { FlatList, Text } from 'react-native';
import { useProducts } from '../hooks/useProducts';

export function ProductListScreen() {
  const { data, isLoading } = useProducts();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
