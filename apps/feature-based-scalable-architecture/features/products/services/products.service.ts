import { Food, FoodCategory } from '../types';

// Mock data
const MOCK_FOODS: Food[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh lettuce and tomato',
    price: 8.99,
    image: '🍔',
    category: FoodCategory.BURGERS,
    rating: 4.5,
    reviews: 245,
    isVegan: false,
    isSpicy: false,
    preparationTime: 15,
  },
  {
    id: '2',
    name: 'Spicy Buffalo Burger',
    description: 'Crispy burger with spicy buffalo sauce',
    price: 9.99,
    image: '🌶️',
    category: FoodCategory.BURGERS,
    rating: 4.8,
    reviews: 156,
    isVegan: false,
    isSpicy: true,
    preparationTime: 15,
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, basil, and tomato sauce',
    price: 11.99,
    image: '🍕',
    category: FoodCategory.PIZZA,
    rating: 4.6,
    reviews: 320,
    isVegan: false,
    isSpicy: false,
    preparationTime: 20,
  },
  {
    id: '4',
    name: 'Pepperoni Pizza',
    description: 'Traditional pepperoni with cheese',
    price: 12.99,
    image: '🍕',
    category: FoodCategory.PIZZA,
    rating: 4.7,
    reviews: 410,
    isVegan: false,
    isSpicy: true,
    preparationTime: 20,
  },
  {
    id: '5',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan and croutons',
    price: 7.99,
    image: '🥗',
    category: FoodCategory.SALADS,
    rating: 4.3,
    reviews: 128,
    isVegan: false,
    isSpicy: false,
    preparationTime: 10,
  },
  {
    id: '6',
    name: 'Vegan Buddha Bowl',
    description: 'Quinoa, chickpeas, and seasonal vegetables',
    price: 10.99,
    image: '🥗',
    category: FoodCategory.SALADS,
    rating: 4.9,
    reviews: 89,
    isVegan: true,
    isSpicy: false,
    preparationTime: 12,
  },
  {
    id: '7',
    name: 'Chocolate Cake',
    description: 'Rich, moist chocolate cake with frosting',
    price: 5.99,
    image: '🍰',
    category: FoodCategory.DESSERTS,
    rating: 4.8,
    reviews: 567,
    isVegan: false,
    isSpicy: false,
    preparationTime: 5,
  },
  {
    id: '8',
    name: 'Strawberry Cheesecake',
    description: 'Creamy cheesecake with fresh strawberries',
    price: 6.99,
    image: '🍰',
    category: FoodCategory.DESSERTS,
    rating: 4.9,
    reviews: 423,
    isVegan: false,
    isSpicy: false,
    preparationTime: 5,
  },
  {
    id: '9',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 3.99,
    image: '🧃',
    category: FoodCategory.DRINKS,
    rating: 4.4,
    reviews: 234,
    isVegan: true,
    isSpicy: false,
    preparationTime: 3,
  },
  {
    id: '10',
    name: 'Iced Latte',
    description: 'Cold coffee with milk and ice',
    price: 4.99,
    image: '☕',
    category: FoodCategory.DRINKS,
    rating: 4.6,
    reviews: 512,
    isVegan: false,
    isSpicy: false,
    preparationTime: 5,
  },
  {
    id: '11',
    name: 'French Fries',
    description: 'Crispy golden fries with salt',
    price: 3.49,
    image: '🍟',
    category: FoodCategory.SIDES,
    rating: 4.5,
    reviews: 678,
    isVegan: true,
    isSpicy: false,
    preparationTime: 8,
  },
  {
    id: '12',
    name: 'Onion Rings',
    description: 'Crunchy onion rings with dipping sauce',
    price: 4.49,
    image: '🧅',
    category: FoodCategory.SIDES,
    rating: 4.7,
    reviews: 345,
    isVegan: false,
    isSpicy: false,
    preparationTime: 10,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productsApi = {
  async getAllFoods(): Promise<Food[]> {
    await delay(500);
    return MOCK_FOODS;
  },

  async getFoodsByCategory(category: FoodCategory): Promise<Food[]> {
    await delay(300);
    return MOCK_FOODS.filter(food => food.category === category);
  },

  async getFoodById(id: string): Promise<Food | null> {
    await delay(200);
    return MOCK_FOODS.find(food => food.id === id) || null;
  },

  async searchFoods(query: string): Promise<Food[]> {
    await delay(400);
    const lowerQuery = query.toLowerCase();
    return MOCK_FOODS.filter(
      food =>
        food.name.toLowerCase().includes(lowerQuery) ||
        food.description.toLowerCase().includes(lowerQuery)
    );
  },

  async getFeaturedFoods(): Promise<Food[]> {
    await delay(300);
    return MOCK_FOODS.filter(food => food.rating >= 4.7).slice(0, 6);
  },
};

