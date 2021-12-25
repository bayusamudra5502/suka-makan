import config from '@/config.json';

const { endpoint: ENDPOINT_URL } = config;

export default class ApiUtil {
  static imageStructureBuilder(pictureId) {
    return {
      sm: `${ENDPOINT_URL}/images/small/${pictureId}`,
      md: `${ENDPOINT_URL}/images/medium/${pictureId}`,
      lg: `${ENDPOINT_URL}/images/large/${pictureId}`,
    };
  }

  static restaurantObjFormatter({ pictureId, ...data }) {
    return {
      image: ApiUtil.imageStructureBuilder(pictureId),
      ...data,
    };
  }

  static restaurantResponseFormatter(response) {
    return response.restaurants.map((data) => ApiUtil.restaurantObjFormatter(data));
  }

  static URLBuilder(baseURL, params) {
    const paramsString = new URLSearchParams(params).toString();
    return paramsString.length > 0 ? `${baseURL}?${paramsString}` : baseURL;
  }
}
