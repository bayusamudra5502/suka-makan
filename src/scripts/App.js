import Footer from './components/Footer';
import HeaderApp from './components/Header';
import Component from './lib/Component';
import HomePage from './pages/Home';
import RouterComponent from './routers/Router';

export default class AppContainer extends Component {
  #router;

  constructor(router) {
    super();
    this.#router = router;

    this.#router.addRoute('/', HomePage);
  }

  async render() {
    this.appendChild(new HeaderApp());
    this.appendChild(new RouterComponent(this.#router));
    this.appendChild(new Footer());
  }
}

Component.register('app-container', AppContainer);
