import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import TwoScreen from '../screens/TwoScreen';
import OneScreen from '../screens/OneScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
      }}>
      <Tab.Screen
        name="One"
        component={OneScreen}
        options={{
          title: 'First',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="house.fill" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Two"
        component={TwoScreen}
        options={{
          title: 'Second',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="paperclip" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
