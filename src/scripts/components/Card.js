import Component from "./Component";
import RestaurantModal from "./Modal";

const MAX_CHAR = 300;

export default class RestaurantCard extends Component {
  set data(newData) {
    this.__data = newData;
    this.render();
  }

  showModal(data) {
    const modal = new RestaurantModal();

    modal.data = data;
    modal.showModal();
  }

  render() {
    const message =
      this.__data.description.length > MAX_CHAR
        ? this.__data.description.slice(0, MAX_CHAR - 3) + "..."
        : this.__data.description;

    this.innerHTML = `
    <div class="card">
        <img class="banner" src="${this.__data.pictureId}" alt="Gambar Restoran ${this.__data.name}">
        <div class="content">
            <h3>${this.__data.name}</h3>
            <button class="bookmark" aria-label="Simpan sebagai bookmark" title="Tambahkan Bookmark">
                <img src="./images/assets/bookmark.png" alt="Simpan Bookmark">
            </button>

            <!-- Lokasi -->
            <img src="./images/assets/pin.png" alt="Lokasi Restoran">
            <p>${this.__data.city}</p>

            <!-- Rating -->
            <img src="./images/assets/star.png" alt="Rating Restoran">
            <p>${this.__data.rating}</p>

            <p class="description">
              ${message}
            </p>

            <button class="btn detail">
                Lihat Detail
            </button>
        </div>
    </div>

    `;

    this.querySelector(".btn").addEventListener("click", () =>
      this.showModal(this.__data)
    );
  }
}

Component.register("card-element", RestaurantCard);
