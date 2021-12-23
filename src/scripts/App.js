import Footer from './components/layout/Footer';
import HeaderApp from './components/layout/Header';
import Component from './lib/Component';
import RestaurantDetail from './pages/Detail';
import FavoritePage from './pages/Favorite';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import SearchPage from './pages/Search';
import RouterComponent from './routers/Router';

export default class AppContainer extends Component {
  #router;

  constructor(router) {
    super();
    this.#router = router;

    this.#router.setNotFound(NotFoundPage);
    this.#router.addRoute('/', HomePage);
    this.#router.addRoute('/favorite', FavoritePage);
    this.#router.addRoute('/search', SearchPage);
    this.#router.addRoute('/detail/:id', RestaurantDetail);
  }

  render() {
    this.appendChild(new HeaderApp());
    this.appendChild(new RouterComponent(this.#router));
    this.appendChild(new Footer());
  }
}

Component.register('app-container', AppContainer);
