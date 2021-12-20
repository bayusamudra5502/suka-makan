import FavoriteModel from '../api/FavoriteModel';
import NotFoundError from '../api/NotFoundError';
import RestaurantModel from '../api/RestaurantModel';
import BannerComponent from '../components/Banner';
import LinkComponent from '../components/Link';
import LoadingComponent from '../components/Loading';
import OfflineMessage from '../components/OfflineMessage';
import RestaurantDetailDescription from '../components/RestaurantDetail';
import Component from '../lib/Component';
import Toast from '../lib/Toast';

export default class RestaurantDetailPage extends Component {
  async #fetchData() {
    try {
      this.state = { isLoading: true };
      const data = await RestaurantModel.getRestaurantDetail(this.props.id);
      this.state = data;
      this.state = { isFavorite: await FavoriteModel.isFavorite(this.props.id) };
      this.state = { isLoading: false, isLoaded: true };
    } catch (err) {
      if (err instanceof NotFoundError) {
        LinkComponent.redirect('/notfound');
        return;
      }

      this.state = { isLoading: false, isOffline: true };
    }
  }

  async #toggleFavorite() {
    if (this.state.isFavorite) {
      await FavoriteModel.deleteFavorite(this.props.id);
      Toast.showSuccess('Berhasil menghapus dari daftar favorit');
    } else {
      await FavoriteModel.addFavorite(this.state);
      Toast.showSuccess('Berhasil menambahkan ke daftar favorit');
    }

    this.state = { isFavorite: await FavoriteModel.isFavorite(this.props.id) };
  }

  async render() {
    await this.#fetchData();
    document.title = `${this.state.name} - Suka Makan`;
  }

  async update() {
    this.innerHTML = '';

    if (this.state.isLoading) {
      this.append(new LoadingComponent());
      return;
    }

    if (this.state.isOffline) {
      this.append(new OfflineMessage());
      return;
    }

    if (!this.state.isLoaded) {
      return;
    }

    const banner = new BannerComponent();
    banner.props = {
      name: this.state.name,
      image: this.state.image.lg,
      location: this.state.city,
      isFavorite: this.state.isFavorite,
    };

    banner.onfavoritetoggle = () => {
      this.#toggleFavorite();
    };

    const detailDescription = new RestaurantDetailDescription();
    detailDescription.props = this.state;

    this.append(banner);
    this.append(detailDescription);
  }
}

Component.register('detail-page', RestaurantDetailPage);
