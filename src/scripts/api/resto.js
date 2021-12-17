import Model from './model';
import db from '../../DATA.json';

class RestaurantModel extends Model {
  async get() {
    return db.restaurants;
  }
}

export default (new RestaurantModel());
