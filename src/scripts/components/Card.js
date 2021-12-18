import bookmarkImage from '@img/assets/bookmark.png';
import pinImage from '@img/assets/pin.png';
import starImage from '@img/assets/star.png';
import Component from '../lib/Component';

const MAX_CHAR = 300;

export default class RestaurantCard extends Component {
  set data(newData) {
    this.props = { data: newData };
  }

  get data() {
    return this.props?.data ?? null;
  }

  async render() {
    this.innerHTML = `
    <div class="card">
        <img class="banner" alt="">
        <div class="content">
            <h3></h3>
            <button class="bookmark" 
              aria-label="Simpan sebagai bookmark" title="Tambahkan Bookmark">
                <img src="${bookmarkImage}" alt="Simpan Bookmark">
            </button>

            <!-- Lokasi -->
            <img src="${pinImage}" alt="Lokasi Restoran">
            <p class="resto-location"></p>

            <!-- Rating -->
            <img src="${starImage}" alt="Rating Restoran">
            <p class="resto-rating"></p>

            <p class="description"></p>

            <button class="btn detail">
                Lihat Detail
            </button>
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
    this.setAttributeValueURI('.banner', 'src', this.data.pictureId);
  }
}

Component.register('card-element', RestaurantCard);
