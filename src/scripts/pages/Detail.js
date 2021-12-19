import NotFoundError from '../api/NotFoundError';
import RestaurantModel from '../api/RestaurantModel';
import BannerComponent from '../components/Banner';
import LoadingComponent from '../components/Loading';
import RestaurantDetailDescription from '../components/RestaurantDetail';
import Component from '../lib/Component';

export default class RestaurantDetailPage extends Component {
  async #fetchData() {
    try {
      this.state = { isLoading: true };
      const data = await RestaurantModel.getRestaurantDetail(this.props.id);
      this.state = data;
      this.state = { isLoading: false, isLoaded: true };
    } catch (err) {
      if (err instanceof NotFoundError) {
        window.location.replace('#/notfound');
      }
    }
  }

  async render() {
    await this.#fetchData();
  }

  async update() {
    this.innerHTML = '';

    if (this.state.isLoading) {
      this.append(new LoadingComponent());
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
    };

    const detailDescription = new RestaurantDetailDescription();
    detailDescription.props = this.state;

    this.append(banner);
    this.append(detailDescription);
  }
}

Component.register('detail-page', RestaurantDetailPage);
