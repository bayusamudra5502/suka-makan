import heroImage from '@img/heros/hero-image.jpg';
import Component from '../lib/Component';
import RestoAPI from '../api/RestaurantModel';
import RestaurantListContainer from '../components/RestaurantListContainer';
import LoadingComponent from '../components/Loading';

export default class HomePage extends Component {
  async render() {
    this.innerHTML = `
      <section class="hero">
          <div class="message">
              <p class="jumbo">Cari dan temukan</p>
              <p>Restoran yang paling cocok bagi anda</p>
          </div>
          <img src="${heroImage}" alt="">
          <div class="overlay"></div>
      </section>
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

    const data = await RestoAPI.getRestaurants();
    container.innerHTML = '';

    const restaurantList = new RestaurantListContainer();
    restaurantList.restaurantList = data;
    container.appendChild(restaurantList);
  }
}

Component.register('home-page', HomePage);
