export default class RouteDictionary {
  #notFoundPage;

  #routeDictionary = [];

  constructor() {
    this.#notFoundPage = null;
  }

  setNotFound(component) {
    this.#notFoundPage = component;
  }

  addRoute(routePath, constructor) {
    this.#routeDictionary.push([routePath, constructor]);
  }

  getRoute(hashPath) {
    const routeToken = (hashPath === '' || hashPath[0] !== '/'
      ? '/' : hashPath).slice(1).split('/');
    const notFound = this.#notFoundPage;

    return this.#routeDictionary.reduce((lastResult, currentPath) => {
      const currentToken = currentPath[0].slice(1).split('/');

      if (routeToken.length > currentToken.length) {
        return lastResult;
      }

      const resultPage = routeToken.reduce((lastPageObject, token, idx) => {
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
          page: notFound,
        };
      }, {
        page: currentPath[1],
        data: {},
      });

      if (resultPage.page !== notFound) {
        return resultPage;
      }

      return lastResult;
    }, {
      page: notFound,
      data: {},
    });
  }
}
