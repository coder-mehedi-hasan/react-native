## 🍔 Foodie eCommerce App - Architecture Overview

This is a fully functional food ordering app built with React Native following a feature-based scalable architecture pattern.

### 🎯 Architecture Pattern

The app follows the **Feature-Based Architecture** pattern as outlined in `DEVELOPMENT_RULES.MD`:

```
features/
├── auth/                 # Authentication feature
│   ├── screens/         # UI screens (LoginScreen, SignupScreen)
│   ├── hooks/           # Custom hooks (useLogin, useSignup, useLogout)
│   ├── services/        # API & business logic (authApi)
│   ├── types.ts         # TypeScript interfaces
│   └── index.ts         # Public exports
├── products/            # Products/Menu feature  
│   ├── screens/         # UI screens (HomeScreen, ProductDetailScreen)
│   ├── hooks/           # Custom hooks (useAllFoods, useFoodById, etc)
│   ├── services/        # Mock API with food data
│   ├── types.ts         # Food, FoodCategory interfaces
│   └── index.ts         # Public exports
├── orders/              # Cart & Orders feature
│   ├── screens/         # UI screens (CartScreen, OrdersScreen)
│   ├── hooks/           # Custom hooks (useCart, useCreateOrder, etc)
│   ├── services/        # Cart & order management with localStorage
│   ├── types.ts         # Order, CartItem interfaces
│   └── index.ts         # Public exports
└── profile/             # User profile feature
    ├── screens/         # UI screens (ProfileScreen)
    ├── types.ts         # User interface
    └── index.ts         # Public exports

shared/
├── services/            # Global services
│   ├── api.ts          # Axios API client setup
│   ├── storage.ts      # AsyncStorage wrapper (localStorage)
│   └── index.ts        # Exports
├── components/          # Shared UI components
├── hooks/               # Shared custom hooks
├── utils/               # Utility functions
└── constants/           # App constants

app/
├── App.tsx             # Root component
├── providers.tsx       # React Query & other providers
├── queryClient.ts      # React Query client config
```

### 🔑 Key Features

#### 1. **Authentication** (with localStorage)
- Login with email & password
- Sign up for new users
- Mock user data (easily replaceable with real API)
- Token stored in AsyncStorage
- Automatic logout & cache clearing

**Demo Credentials:**
- Email: `test@example.com` / Password: `password123`
- Email: `demo@foodie.com` / Password: `demo123`

#### 2. **Products** (Mock API with 12 items)
- List all foods with search
- Filter by category (Burgers, Pizza, Salads, Desserts, Drinks, Sides)
- Product details with ratings & reviews
- Vegan & spicy indicators
- Preparation time estimates

#### 3. **Cart Management** (with localStorage)
- Add/remove items
- Update quantities
- Calculate totals
- Persistent cart (survives app restart)

#### 4. **Orders** (with localStorage)
- Place orders from cart
- View order history
- Track order status
- Cancel pending orders
- Estimated delivery times

#### 5. **User Profile**
- View user information
- Logout with confirmation
- Profile settings placeholder

### 🏗️ Data Flow & Separation of Concerns

#### Layer 1: UI (Smart Components)
- Screens use custom hooks
- No direct API calls
- Handle user interactions

Example:
```tsx
export function LoginScreen({ navigation }: Props) {
  const loginMutation = useLogin();
  
  const handleLogin = async () => {
    await loginMutation.mutateAsync({ email, password });
  };
  
  return ( /* UI */ );
}
```

#### Layer 2: Business Logic (Custom Hooks with React Query)
- Custom hooks provide state & mutations
- Handle loading, error states
- Query caching & invalidation

Example:
```tsx
export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => { /* update cache */ },
  });
}
```

#### Layer 3: Services (API & Storage)
- Pure functions for business logic
- Mock API with delays
- AsyncStorage for persistence

Example:
```tsx
export const authApi = {
  async login(payload: LoginPayload) {
    await delay(800);
    const userRecord = MOCK_USERS[payload.email];
    // Validation & token generation
    await storage.setItem('auth_token', token);
    return { user, token };
  },
};
```

### 💾 Local Storage Integration

All features use AsyncStorage (with a custom wrapper) for persistence:

- **Auth**: `auth_token`, `auth_user`
- **Cart**: `cart` (items & lastUpdated)
- **Orders**: `orders` (array of Order objects)

The storage service (`shared/services/storage.ts`) provides:
- Type-safe `setItem()`, `getItem()`, `removeItem()`
- Automatic JSON serialization
- Error handling with fallbacks
- Namespaced keys (prevents conflicts)

### 🎨 UI Components

All screens built with React Native primitives (no external UI libraries yet):
- Custom styled components
- Consistent color scheme (#FF6B35 primary orange)
- Responsive layouts
- Loading & error states
- Form validation

### ⚙️ State Management

Uses **React Query** (TanStack Query) for:
- Server state management
- Caching & background refetching
- Loading & error states
- Automatic garbage collection

### 🔄 Navigation

Bottom Tab Navigation with:
1. **Home** - Browse foods
2. **Cart** - View & manage cart
3. **Orders** - View order history
4. **Profile** - User account

Auth Stack appears before login, hidden after.

### 📦 Dependencies

Key packages used:
- `expo` - React Native framework
- `@react-navigation/*` - Navigation
- `@tanstack/react-query` - State management
- `@react-native-async-storage/async-storage` - Local storage
- `axios` - HTTP client (configured but using mock APIs)
- `typescript` - Type safety

### 🚀 How to Run

```bash
# Install dependencies (from root or app folder)
npm install

# Start the app
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

### 🧪 Testing the App

1. **Login**
   - Use demo credentials above
   - App stores token in AsyncStorage

2. **Browse Products**
   - Tap items to see details
   - Use search to filter

3. **Add to Cart**
   - Adjust quantity
   - Click "Add to Cart"
   - Cart data persists

4. **Checkout**
   - Go to Cart tab
   - Review total
   - Click "Place Order"
   - Order appears in Orders tab
   - Cart clears

5. **View Orders**
   - Orders tab shows history
   - Shows status, items, total
   - Can cancel pending orders

6. **Logout**
   - Profile tab → Logout
   - Clears all cached data
   - Returns to login

### 🔧 Extending the App

#### Adding a New Feature

1. Create feature folder: `features/yourfeature/`
2. Add subdirectories: `screens/`, `hooks/`, `services/`, `store/`
3. Define types in `types.ts`
4. Create service functions
5. Create React Query hooks
6. Create UI screens
7. Export from `index.ts`
8. Add navigation in `AppNavigator.tsx`

#### Replacing Mock API

1. Update service functions (e.g., `productsApi.getAllFoods()`)
2. Keep same function signatures for compatibility
3. Update error handling
4. Add auth headers if needed

### 📝 Design Decisions

1. **Mock APIs over network calls**
   - Faster development
   - No backend dependency
   - Easy to simulate delays
   - Easily replaceable

2. **localStorage over Redux/Context**
   - Simpler for this app size
   - No prop drilling
   - Automatic persistence
   - React Query handles caching

3. **React Query over Redux**
   - Better for async state
   - Built-in caching
   - Less boilerplate
   - Better DX

4. **Feature-based structure**
   - Each feature is self-contained
   - Easy to add/remove features
   - Team-friendly organization
   - Clear dependencies

### 🎓 Learning Resources

- [Feature-Based Architecture Guide](./DEVELOPMENT_RULES.MD)
- [React Query Docs](https://tanstack.com/query/latest)
- [React Navigation Docs](https://reactnavigation.org)
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)

### 📱 App Screenshots (Conceptual)

```
[Login Screen]          [Home Screen]           [Product Detail]
┌─────────────┐       ┌──────────────┐        ┌──────────────┐
│  🍔 Foodie  │       │ 🔍 Search... │        │ Classic      │
│             │       │──────────────│        │ Burger 🍔    │
│ Email: ___  │       │ 🍔 Burger    │        │              │
│             │       │ $8.99 ⭐4.5  │        │ $8.99        │
│ Pass:  ___  │       │              │        │ ⭐ 4.5 (245) │
│             │       │ 🍕 Pizza     │        │              │
│[Login] [→]  │       │ $11.99 ⭐4.6 │        │ Qty: [−] 1[+]│
│             │       │──────────────│        │              │
│ New user?   │       │[Cart] [Orders]       │[Add to Cart]  │
└─────────────┘       └──────────────┘        └──────────────┘

[Cart Screen]            [Orders Screen]      [Profile Screen]
┌──────────────┐       ┌──────────────┐      ┌──────────────┐
│🍔 x2 $17.98 │       │ ORDER_12345  │      │ 👤           │
│🍕 x1 $11.99 │       │ ✅ CONFIRMED │      │ Test User    │
│              │       │              │      │ test@exa...  │
│ Total: $29.97       │ 🍔 x2 $17.98 │      │              │
│              │       │ 🍕 x1 $11.99 │      │ [Edit]       │
│[Checkout]    │       │              │      │ [Settings]   │
│              │       │ Total: $29.97       │              │
│[Continue]    │       │ 📦 Ready     │      │ [Logout]     │
└──────────────┘       │              │      └──────────────┘
                       │[Cancel]      │
                       └──────────────┘
```

### 🐛 Troubleshooting

**Cart not persisting?**
- Check AsyncStorage is installed
- Verify storage key matches in service

**Queries not working?**
- Check QueryClient is set up in providers.tsx
- Verify @tanstack/react-query is installed

**Navigation not working?**
- Check all screens are exported from screens/index.ts
- Verify types in AppNavigator match screen names

**Login not working?**
- Use demo credentials above
- Check auth service mock data has correct email/password

---

**Happy coding! 🚀🍕**
