export default class RouteDictionary {
  #notFoundPage;

  #routeDictionary = [];

  constructor(notFoundPage = null) {
    this.#notFoundPage = notFoundPage;
  }

  addRoute(routePath, constructor) {
    this.#routeDictionary.push([routePath, constructor]);
  }

  getRoute(hashPath) {
    const routeToken = (hashPath === '' || hashPath[0] !== '/'
      ? '/' : hashPath).slice(1).split('/');

    return this.#routeDictionary.reduce((lastResult, currentPath) => {
      const currentToken = currentPath[0].split('/');

      if (routeToken.length > currentToken.length) {
        return lastResult;
      }

      return routeToken.reduce((lastPageObject, token, idx) => {
        if (token === currentToken[idx]) {
          return lastPageObject;
        } if (token[0] === ':') {
          return {
            ...lastPageObject,
            data: {
              [token[0].slice(1)]: currentToken[idx],
            },
          };
        }

        return {
          ...lastPageObject,
          page: this.#notFoundPage,
        };
      }, {
        page: currentPath[1],
        data: {},
      });
    }, {
      page: this.#notFoundPage,
      data: {},
    });
  }
}
