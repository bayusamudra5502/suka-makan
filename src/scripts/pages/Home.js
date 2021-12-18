import heroImage from '@img/heros/hero-image.jpg';
import Component from '../lib/Component';
import RestoAPI from '../api/resto';
import '../components/RestoList';

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
      <resto-list></resto-list>
    `;

    this.update();
  }

  async update() {
    const data = await RestoAPI.get();
    const container = this.querySelector('resto-list');
    container.restaurantList = data;
  }
}

Component.register('home-page', HomePage);
