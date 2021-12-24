import ApiUtil from '../lib/util/API';

export default class APISender {
  static async get(URL, params = {}) {
    const response = await fetch(ApiUtil.URLBuilder(URL, params));
    return response.json();
  }

  static async post(URL, data = {}, params = {}) {
    const response = await fetch(ApiUtil.URLBuilder(URL, params), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }
}
