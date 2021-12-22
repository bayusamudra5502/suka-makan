import Component from '../lib/Component';
import RestoAPI from '../api/RestaurantModel';
import RestaurantListContainer from '../components/RestaurantListContainer';
import LoadingComponent from '../components/Loading';
import OfflineMessage from '../components/OfflineMessage';
import '../components/Hero';

export default class HomePage extends Component {
  async render() {
    document.title = 'Halaman Utama - Suka Makan';
    this.innerHTML = `
      <hero-element></hero-element>
      <h2>Daftar Restoran</h2>
      <section class="restaurants"></section>
    `;

    this.update();
  }

  async update() {
    const container = this.querySelector('.restaurants');

    if (container === null) {
      return;
    }

    container.innerHTML = '';
    container.appendChild(new LoadingComponent());

    try {
      const data = await RestoAPI.getRestaurants();
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
