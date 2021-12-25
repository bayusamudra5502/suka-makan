import NotFoundError from './NotFoundError';
import Sender from './APISender';
import config from '@/config.json';
import ApiUtil from '../lib/util/API';

const { endpoint: ENDPOINT_URL } = config;

class RestaurantModel {
  static async getRestaurants(APISender = Sender) {
    const restaurantList = await APISender.get(`${ENDPOINT_URL}/list`);

    return ApiUtil.restaurantResponseFormatter(restaurantList);
  }

  static async searchRestaurant(query, APISender = Sender) {
    const restaurantList = await APISender.get(`${ENDPOINT_URL}/search`, {
      q: query,
    });

    return ApiUtil.restaurantResponseFormatter(restaurantList);
  }

  static async getRestaurantDetail(restoId, APISender = Sender) {
    const restaurantDetail = (await APISender.get(`${ENDPOINT_URL}/detail/${restoId}`));

    if (restaurantDetail.error) {
      throw new NotFoundError('Restaurant not found');
    }

    return ApiUtil.restaurantObjFormatter(restaurantDetail.restaurant);
  }

  static async postReview(restoId, name, review, APISender = Sender) {
    const payload = {
      id: restoId,
      name,
      review,
    };

    return APISender.post(`${ENDPOINT_URL}/review`, payload);
  }
}

export default RestaurantModel;
