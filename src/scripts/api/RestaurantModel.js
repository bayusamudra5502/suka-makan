import NotFoundError from './NotFoundError';
import APISender from './APISender';
import config from '@/config.json';

const { endpoint: ENDPOINT_URL } = config;

class RestaurantModel {
  static #imageBuilder(pictureId) {
    return {
      sm: `${ENDPOINT_URL}/images/small/${pictureId}`,
      md: `${ENDPOINT_URL}/images/medium/${pictureId}`,
      lg: `${ENDPOINT_URL}/images/large/${pictureId}`,
    };
  }

  static #formatRestaurantObj({ pictureId, ...data }) {
    return {
      image: this.#imageBuilder(pictureId),
      ...data,
    };
  }

  static async getRestaurants() {
    const restaurantList = await APISender.get(`${ENDPOINT_URL}/list`);

    return restaurantList.restaurants.map((data) => this.#formatRestaurantObj(data));
  }

  static async searchRestaurant(query) {
    const restaurantList = await APISender.get(`${ENDPOINT_URL}/search`, { q: query });

    return restaurantList.restaurants.map((data) => this.#formatRestaurantObj(data));
  }

  static async getRestaurantDetail(restoId) {
    const restaurantDetail = (await APISender.get(`${ENDPOINT_URL}/detail/${restoId}`));

    if (restaurantDetail.error) {
      throw new NotFoundError('Restaurant not found');
    }

    return this.#formatRestaurantObj(restaurantDetail.restaurant);
  }

  static async postReview(restoId, name, review) {
    const payload = {
      id: restoId,
      name,
      review,
    };

    return APISender.post(`${ENDPOINT_URL}/review`, payload);
  }
}

export default RestaurantModel;
