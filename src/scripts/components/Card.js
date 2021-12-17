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
    if (this.data === null) {
      return;
    }

    const message = this.data.description.length > MAX_CHAR
      ? `${this.data.description.slice(0, MAX_CHAR - 3)}...`
      : this.data.description;

    this.innerHTML = `
    <div class="card">
        <img class="banner" src="${encodeURI(this.data.pictureId)}" alt="">
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

            <p class="description">
              ${message}
            </p>

            <button class="btn detail">
                Lihat Detail
            </button>
        </div>
    </div>
    `;

    this.setElementValue('h3', this.data.name);
    this.setElementValue('.resto-location', this.data.city);
    this.setElementValue('.resto-rating', this.data.rating);
  }
}

Component.register('card-element', RestaurantCard);
