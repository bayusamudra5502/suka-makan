import Component from '../lib/Component';

export default class RouterComponent extends Component {
  #route;

  constructor(routerDict) {
    super();
    this.#route = routerDict;
  }

  async render() {
    this.innerHTML = `
      <main id="content"></main>
    `;

    const currentPath = window.location.hash.slice(1);
    const { data: props, page: Page } = this.#route.getRoute(currentPath);

    const obj = new Page();
    obj.props = props;

    this.querySelector('#content').appendChild(obj);
  }
}

Component.register('router-component', RouterComponent);
