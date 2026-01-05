import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'FOODIE_APP_';

export const storage = {
  async setItem(key: string, value: any) {
    try {
      await AsyncStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (error) {
      console.error(`Storage setItem error for key ${key}:`, error);
      throw error;
    }
  },

  async getItem(key: string) {
    try {
      const value = await AsyncStorage.getItem(PREFIX + key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Storage getItem error for key ${key}:`, error);
      return null;
    }
  },

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(PREFIX + key);
    } catch (error) {
      console.error(`Storage removeItem error for key ${key}:`, error);
      throw error;
    }
  },

  async clear() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const appKeys = keys.filter(key => key.startsWith(PREFIX));
      await AsyncStorage.multiRemove(appKeys);
    } catch (error) {
      console.error('Storage clear error:', error);
      throw error;
    }
  },
};
