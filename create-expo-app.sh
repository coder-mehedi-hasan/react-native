#!/usr/bin/env bash

set -e

APP_NAME=""
ROUTER="expo-router"

# -------------------------
# Parse Arguments
# -------------------------
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --name)
      APP_NAME="$2"
      shift
      ;;
    --router)
      ROUTER="$2"
      shift
      ;;
    *)
      echo "❌ Unknown parameter passed: $1"
      exit 1
      ;;
  esac
  shift
done

if [[ -z "$APP_NAME" ]]; then
  echo "❌ App name is required"
  echo "Usage:"
  echo "  ./create-expo-app.sh --name myApp --router expo-router|react-navigation"
  exit 1
fi

echo "🚀 Creating Expo app: $APP_NAME"
echo "📦 Router: $ROUTER"

# -------------------------
# Create Expo App
# -------------------------
mkdir -p apps
npx create-expo-app "apps/$APP_NAME" --template blank-typescript
cd "apps/$APP_NAME"

# -------------------------
# Install Expo Dev Client
# -------------------------
echo "📲 Installing Expo Dev Client..."
npx expo install expo-dev-client

# -------------------------
# Router Setup
# -------------------------
if [[ "$ROUTER" == "expo-router" ]]; then
  echo "🧭 Setting up Expo Router..."

  npx expo install expo-router react-native-safe-area-context react-native-screens

  # Update app.json
  jq '.expo.plugins += ["expo-router"]' app.json > app.tmp.json && mv app.tmp.json app.json

  mkdir -p app
  cat <<EOF > app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack />;
}
EOF

  cat <<EOF > app/index.tsx
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Expo Router Ready 🚀</Text>
    </View>
  );
}
EOF

elif [[ "$ROUTER" == "react-navigation" ]]; then
  echo "🧭 Setting up React Navigation..."

  npx expo install \
    @react-navigation/native \
    @react-navigation/native-stack \
    react-native-safe-area-context \
    react-native-screens

  cat <<EOF > App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>React Navigation Ready 🚀</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
EOF

else
  echo "❌ Invalid router option: $ROUTER"
  echo "Valid options: expo-router | react-navigation"
  exit 1
fi

# -------------------------
# Final Message
# -------------------------
echo ""
echo "🧹 Cleaning up node_modules..."
rm -rf node_modules

echo "📦 Returning to root and installing dependencies..."
cd ../../
npm install

echo ""
echo "✅ Expo app setup complete!"
echo ""
echo "Next steps:"
echo "  cd apps/$APP_NAME"
echo "  npx expo prebuild"
echo "  npx expo run:android | run:ios"
echo ""
echo "Happy coding 🚀"
