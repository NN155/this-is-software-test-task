import type { UIUser } from '@/shared/types/';
import { executeDBOperation } from '@/utils/dbHelper';

class IndexedDBService {
  async saveUser(user: UIUser): Promise<void> {
    try {
      await executeDBOperation(
        (store) => store.put(user),
        'readwrite'
      );
    } catch (error) {
      console.error('Error saving user to IndexedDB:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<UIUser[]> {
    try {
      return await executeDBOperation(
        (store) => store.getAll()
      ) || [];
    } catch (error) {
      console.error('Error getting users from IndexedDB:', error);
      return [];
    }
  }

  async removeUser(userId: string): Promise<void> {
    try {
      await executeDBOperation(
        (store) => store.delete(userId),
        'readwrite'
      );
    } catch (error) {
      console.error('Error removing user from IndexedDB:', error);
      throw error;
    }
  }
}

export const indexedDBService = new IndexedDBService();
