import FavoriteModel from '../api/FavoriteModel';
import NotFoundError from '../api/NotFoundError';
import RestaurantModel from '../api/RestaurantModel';
import BannerComponent from '../components/sections/Banner';
import LinkComponent from '../components/templates/Link';
import LoadingComponent from '../components/feedback/Loading';
import OfflineMessage from '../components/feedback/OfflineMessage';
import RestaurantDetailDescription from '../components/sections/RestaurantDetail';
import Component from '../lib/Component';

export default class RestaurantDetailPage extends Component {
  #restaurantModel;

  #favoriteModel;

  constructor(restaurantModel = RestaurantModel, favoriteModel = FavoriteModel) {
    super();
    this.#restaurantModel = restaurantModel;
    this.#favoriteModel = favoriteModel;
  }

  async #fetchData() {
    try {
      this.state = { isLoading: true };
      const data = await this.#restaurantModel.getRestaurantDetail(this.props.id);
      this.state = data;
      this.state = { isFavorite: await this.#favoriteModel.isFavorite(this.props.id) };
      this.state = { isLoading: false, isLoaded: true };
    } catch (err) {
      if (err instanceof NotFoundError) {
        LinkComponent.redirect('/notfound');
        return;
      }

      this.state = { isLoading: false, isOffline: true };
    }
  }

  async render() {
    await this.#fetchData();
  }

  async update() {
    if (this.state.isLoading && !this.state.isLoaded) {
      this.innerHTML = '';
      this.append(new LoadingComponent());
      return;
    }

    if (this.state.isOffline) {
      document.title = 'Offline - Suka Makan';
      this.innerHTML = '';
      this.append(new OfflineMessage());
      return;
    }

    if (!this.state.isLoaded) {
      return;
    }

    const bannerComponent = document.querySelector('banner-component');
    bannerComponent.props = this.state;
  }

  async afterRender() {
    if (this.state.isLoaded) {
      document.title = `${this.state.name} - Suka Makan`;
    }

    this.innerHTML = '';

    const banner = new BannerComponent();
    banner.props = {
      name: this.state.name,
      image: this.state.image,
      location: this.state.city,
    };

    const detailDescription = new RestaurantDetailDescription();
    detailDescription.props = this.state;

    this.append(banner);
    this.append(detailDescription);

    this.update();
  }
}

Component.register('detail-page', RestaurantDetailPage);
