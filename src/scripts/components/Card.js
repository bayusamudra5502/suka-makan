import Component from './Component';

const MAX_CHAR = 300;

export default class RestaurantCard extends Component {
  #data;

  set data(newData) {
    this.#data = newData;
    this.render();
  }

  get data() {
    return this.#data;
  }

  render() {
    const message = this.data.description.length > MAX_CHAR
      ? `${this.data.description.slice(0, MAX_CHAR - 3)}...`
      : this.data.description;

    this.innerHTML = `
    <div class="card">
        <img class="banner" src="${this.data.pictureId}" alt="">
        <div class="content">
            <h3>${this.data.name}</h3>
            <button class="bookmark" 
              aria-label="Simpan sebagai bookmark" title="Tambahkan Bookmark">
                <img src="./images/assets/bookmark.png" alt="Simpan Bookmark">
            </button>

            <!-- Lokasi -->
            <img src="./images/assets/pin.png" alt="Lokasi Restoran">
            <p>${this.data.city}</p>

            <!-- Rating -->
            <img src="./images/assets/star.png" alt="Rating Restoran">
            <p>${this.data.rating}</p>

            <p class="description">
              ${message}
            </p>

            <button class="btn detail">
                Lihat Detail
            </button>
        </div>
    </div>

    `;
  }
}

Component.register('card-element', RestaurantCard);
