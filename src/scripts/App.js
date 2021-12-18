import Footer from './components/Footer';
import HeaderApp from './components/Header';
import Component from './lib/Component';
import FavoritePage from './pages/Favorite';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import RouterComponent from './routers/Router';

export default class AppContainer extends Component {
  #router;

  constructor(router) {
    super();
    this.#router = router;

    this.#router.setNotFound(NotFoundPage);
    this.#router.addRoute('/', HomePage);
    this.#router.addRoute('/favorite', FavoritePage);
  }

  async render() {
    this.appendChild(new HeaderApp());
    this.appendChild(new RouterComponent(this.#router));
    this.appendChild(new Footer());
  }
}

Component.register('app-container', AppContainer);
