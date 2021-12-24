import Component from '../lib/Component';
import RestoAPI from '../api/RestaurantModel';
import RestaurantListContainer from '../components/sections/RestaurantListContainer';
import LoadingComponent from '../components/feedback/Loading';
import OfflineMessage from '../components/feedback/OfflineMessage';
import '../components/hero/Hero';

export default class HomePage extends Component {
  #restaurantModel;

  constructor(restaurantModel = RestoAPI) {
    super();
    this.#restaurantModel = restaurantModel;
  }

  render() {
    document.title = 'Halaman Utama - Suka Makan';
    this.innerHTML = `
      <hero-element></hero-element>
      <h2>Daftar Restoran</h2>
      <section class="restaurants"></section>
    `;
  }

  afterRender() {
    this.update();
  }

  async update() {
    const container = this.querySelector('.restaurants');

    container.innerHTML = '';
    container.appendChild(new LoadingComponent());

    try {
      const data = await this.#restaurantModel.getRestaurants();
      container.innerHTML = '';

      const restaurantList = new RestaurantListContainer();
      restaurantList.restaurantList = data;
      container.appendChild(restaurantList);
    } catch (err) {
      container.innerHTML = '';
      container.appendChild(new OfflineMessage());
    }
  }
}

Component.register('home-page', HomePage);
