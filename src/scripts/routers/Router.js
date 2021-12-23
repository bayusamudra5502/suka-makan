import Component from '../lib/Component';

export default class RouterComponent extends Component {
  #route;

  constructor(routerDict) {
    super();
    this.#route = routerDict;

    window.addEventListener('pagechange', (e) => {
      window.history.pushState(null, '', `/?${e.detail.to}`);
      this.update();
    });
  }

  render() {
    this.innerHTML = `
      <main id="content"></main>
    `;
  }

  afterRender() {
    this.update();
  }

  update() {
    const container = this.querySelector('#content');
    container.innerHTML = '';

    const currentPath = window.location.search.slice(1);
    const { data: props, page: Page } = this.#route.getRoute(currentPath);

    const obj = new Page();
    obj.props = props;

    container.appendChild(obj);
  }
}

Component.register('router-component', RouterComponent);
