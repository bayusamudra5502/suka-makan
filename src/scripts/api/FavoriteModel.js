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
    return (await this.#db).getAll(FAVORITE_OBJ_STORE);
  }

  async addFavorite(restaurantObject) {
    return (await this.#db).put(FAVORITE_OBJ_STORE, restaurantObject);
  }

  async deleteFavorite(restoId) {
    return (await this.#db).delete(FAVORITE_OBJ_STORE, restoId);
  }

  async isFavorite(restaurantId) {
    const db = await this.#db;
    return !!(await db.get(FAVORITE_OBJ_STORE, restaurantId));
  }
}

export default (new FavoriteModel());
