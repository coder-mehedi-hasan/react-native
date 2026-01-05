import { LoginPayload, SignupPayload, User } from '../types';
import { storage } from '../../../shared/services/storage';

// Mock user database
const MOCK_USERS: Record<string, { user: User; password: string }> = {
  'test@example.com': {
    user: {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      avatar: '👤',
      createdAt: new Date().toISOString(),
    },
    password: 'password123',
  },
  'demo@foodie.com': {
    user: {
      id: '2',
      name: 'Demo User',
      email: 'demo@foodie.com',
      avatar: '👨‍🍳',
      createdAt: new Date().toISOString(),
    },
    password: 'demo123',
  },
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  async login(payload: LoginPayload) {
    await delay(800);

    const userRecord = MOCK_USERS[payload.email];
    if (!userRecord || userRecord.password !== payload.password) {
      throw new Error('Invalid email or password');
    }

    const token = `token_${userRecord.user.id}_${Date.now()}`;
    await storage.setItem('auth_token', token);
    await storage.setItem('auth_user', userRecord.user);

    return {
      user: userRecord.user,
      token,
    };
  },

  async signup(payload: SignupPayload) {
    await delay(800);

    if (MOCK_USERS[payload.email]) {
      throw new Error('Email already registered');
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: payload.name,
      email: payload.email,
      avatar: '👤',
      createdAt: new Date().toISOString(),
    };

    const token = `token_${newUser.id}_${Date.now()}`;

    // Add to mock database
    MOCK_USERS[payload.email] = {
      user: newUser,
      password: payload.password,
    };

    await storage.setItem('auth_token', token);
    await storage.setItem('auth_user', newUser);

    return {
      user: newUser,
      token,
    };
  },

  async logout() {
    await delay(300);
    await storage.removeItem('auth_token');
    await storage.removeItem('auth_user');
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(200);
    const user = await storage.getItem('auth_user');
    return user || null;
  },

  async verifyToken(token: string): Promise<boolean> {
    await delay(200);
    const storedToken = await storage.getItem('auth_token');
    return storedToken === token;
  },
};

