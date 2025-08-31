import type { UIUser, UsersApiResponse } from '@/shared/types/';
import { indexedDBService } from './indexedDBService';

export class UserService {
  static async getUsers(count: number = 6, page: number = 1): Promise<UIUser[]> {
    try {
      const response = await fetch(`/api/users?count=${count}&page=${page}`);

      
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
      const data: UsersApiResponse = await response.json();
      return data.users;
    } catch (error) {
      console.error('Error fetching random users:', error);
      throw error;
    }
  }

  static async saveUser(user: UIUser): Promise<void> {
    try {
      await indexedDBService.saveUser(user);
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  static async getSavedUsers(): Promise<UIUser[]> {
    try {
      return await indexedDBService.getAllUsers();
    } catch (error) {
      console.error('Error getting saved users:', error);
      return [];
    }
  }

  static async removeUser(userId: string): Promise<void> {
    try {
      await indexedDBService.removeUser(userId);
    } catch (error) {
      console.error('Error removing user:', error);
      throw error;
    }
  }
}
