export default class APISender {
  static #URLBuilder(baseURL, params) {
    const paramsString = new URLSearchParams(params).toString();
    return paramsString.length > 0 ? `${baseURL}?${paramsString}` : baseURL;
  }

  static async get(URL, params = {}) {
    const response = await fetch(this.#URLBuilder(URL, params));
    return response.json();
  }

  static async post(URL, data = {}, params = {}) {
    const response = await fetch(this.#URLBuilder(URL, params), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }
}
