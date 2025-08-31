import { DB_CONFIG } from "@/config/idb.config"

// Helper to open database (extracted from IndexedDBService)
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version)

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'))
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      
      if (!db.objectStoreNames.contains(DB_CONFIG.storeName)) {
        const store = db.createObjectStore(DB_CONFIG.storeName, { keyPath: 'id' })
        store.createIndex('id', 'id', { unique: true })
      }
    }
  })
}

// Helper to execute database operations (eliminates code duplication)
export async function executeDBOperation<T>(
  operation: (store: IDBObjectStore) => IDBRequest<T>,
  mode: IDBTransactionMode = 'readonly'
): Promise<T> {
  const db = await openDB()
  const transaction = db.transaction([DB_CONFIG.storeName], mode)
  const store = transaction.objectStore(DB_CONFIG.storeName)
  
  return new Promise((resolve, reject) => {
    const request = operation(store)
    
    request.onsuccess = () => {
      resolve(request.result)
    }
    
    request.onerror = () => {
      reject(new Error(`Database operation failed: ${request.error?.message || 'Unknown error'}`))
    }
  })
}
