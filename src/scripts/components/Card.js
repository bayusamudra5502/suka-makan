import unlovedImage from '@img/assets/unlove.png';
import lovedImage from '@img/assets/love.png';
import pinImage from '@img/assets/pin.png';
import starImage from '@img/assets/star.png';
import Component from '../lib/Component';

const MAX_CHAR = 300;

export default class RestaurantCard extends Component {
  set data(newData) {
    this.state = { data: newData };
  }

  get data() {
    return this.state?.data ?? null;
  }

  async render() {
    const isFavoriteResto = this.data.isFavorite !== undefined || this.data.isFavorite;

    this.innerHTML = `
    <div class="card">
        <img class="banner-card" alt="">
        <div class="content">
            <h3></h3>
            ${!isFavoriteResto ? `
              <button class="bookmark" 
                aria-label="Tambahkan Favorite" title="Tambahkan Favorit">
                  <img src="${unlovedImage}" alt="">
              </button>
            ` : `
              <button class="bookmark" 
                aria-label="Hapus Favorite" title="Hapu Favorit">
                  <img src="${lovedImage}" alt="">
              </button>
            `}

            <!-- Lokasi -->
            <img src="${pinImage}" alt="Lokasi Restoran">
            <p class="resto-location"></p>

            <!-- Rating -->
            <img src="${starImage}" alt="Rating Restoran">
            <p class="resto-rating"></p>

            <p class="description"></p>

            <a class="btn detail" href="">
                Lihat Detail
            </a>
        </div>
    </div>
    `;

    await this.update();
  }

  async update() {
    if (this.data === null) {
      return;
    }

    const message = this.data.description.length > MAX_CHAR
      ? `${this.data.description.slice(0, MAX_CHAR - 3)}...`
      : this.data.description;

    this.setElementValue('h3', this.data.name);
    this.setElementValue('.resto-location', this.data.city);
    this.setElementValue('.resto-rating', this.data.rating);
    this.setElementValue('.description', message);
    this.setAttributeValueURI('.banner-card', 'src', this.data.image.md);
    this.setAttributeValueURI('.btn.detail', 'href', `#/detail/${this.data.id}`);
  }
}

Component.register('card-element', RestaurantCard);
