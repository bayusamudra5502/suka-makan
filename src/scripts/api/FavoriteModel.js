import { openDB } from 'idb';
import config from '@/config.json';

const {
  indexedDB: {
    name: DB_NAME,
    favoriteStore: FAVORITE_OBJ_STORE,
    version: DB_VERSION,
  },
} = config;

class FavoriteModel {
  #db;

  constructor() {
    this.#db = openDB(DB_NAME, DB_VERSION, {
      upgrade(database) {
        const favorites = database.createObjectStore(FAVORITE_OBJ_STORE, { keyPath: 'id' });

        favorites.createIndex('name', 'name');
        favorites.createIndex('description', 'description');
        favorites.createIndex('pictureId', 'pictureId');
        favorites.createIndex('rating', 'rating');
      },
    });
  }

  async getFavorites() {
    try {
      return (await this.#db).getAll(FAVORITE_OBJ_STORE);
    } catch (err) {
      return [];
    }
  }

  async addFavorite(restaurantObject) {
    try {
      (await this.#db).put(FAVORITE_OBJ_STORE, restaurantObject);
      return true;
    } catch {
      return false;
    }
  }

  async deleteFavorite(restoId) {
    try {
      (await this.#db).delete(FAVORITE_OBJ_STORE, restoId);
      return true;
    } catch {
      return false;
    }
  }

  async isFavorite(restaurantId) {
    try {
      const db = await this.#db;
      return !!(await db.get(FAVORITE_OBJ_STORE, restaurantId));
    } catch {
      return false;
    }
  }
}

export default (new FavoriteModel());
