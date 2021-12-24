import FavoriteModel from '../api/FavoriteModel';
import FavoriteEmpty from '../components/feedback/FavoriteEmpty';
import LoadingComponent from '../components/feedback/Loading';
import RestaurantListContainer from '../components/sections/RestaurantListContainer';
import Component from '../lib/Component';

export default class FavoritePage extends Component {
  #favoriteModel;

  constructor(favoriteModel = FavoriteModel) {
    super();
    this.#favoriteModel = favoriteModel;
  }

  async render() {
    document.title = 'Favorit - Suka Makan';

    this.innerHTML = `
        <h2>Halaman Favorit</h2>
        <div class="favorite-page-container"></div>
    `;

    this.state = { isLoading: true };
    await this.#fetchData();
    this.state = { isLoading: false, isReady: true };
  }

  async #fetchData() {
    this.state.favorites = await this.#favoriteModel.getFavorites();
  }

  afterRender() {
    this.update();
  }

  update() {
    if (!this.state) {
      return;
    }

    const container = this.querySelector('.favorite-page-container');

    if (!container) {
      return;
    }

    container.innerHTML = '';

    if (this.state.isLoading) {
      container.append(new LoadingComponent());
      return;
    }

    if (!this.state.isReady || !this.state.favorites) {
      return;
    }

    if (this.state.favorites.length === 0) {
      container.append(new FavoriteEmpty());
      return;
    }

    const CardContainer = new RestaurantListContainer();
    CardContainer.restaurantList = this.state.favorites;

    container.appendChild(CardContainer);
  }
}

Component.register('favorite-page', FavoritePage);
