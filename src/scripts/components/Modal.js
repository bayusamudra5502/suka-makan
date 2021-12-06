import Component from "./Component";

export default class RestaurantModal extends Component {
  set data(newData) {
    this.__data = newData;
    this.render();
  }

  closeModal() {
    const overlay = document.querySelector(".box-overlay");
    overlay.classList.add("hide");
    overlay.removeEventListener("click", this.closeModal);

    document.body.querySelector("resto-modal").remove();
  }

  showModal() {
    const overlay = document.querySelector(".box-overlay");
    overlay.classList.remove("hide");
    overlay.addEventListener("click", this.closeModal);
    this.id = "modal";

    document.body.appendChild(this);
    window.location.assign("#modal");
  }

  render() {
    console.dir(this.__data);
    this.innerHTML = `
      <h3>${this.__data.name}</h3>
      <button class="bookmark" title="Tambahkan Bookmark">
          <img src="./images/assets/bookmark.png" alt="">
      </button>
      <button class="close" title="Tutup Modal">
          <img src="./images/assets/x.svg" alt="">
      </button>
      <img class="img-modal" src="${this.__data.pictureId}" alt="Foto Restoran ${this.__data.name}">

      <!-- Lokasi -->
      <img src="./images/assets/pin.png" alt="Lokasi">
      <p>${this.__data.city}</p>

      <!-- Rating -->
      <img src="./images/assets/star.png" alt="Rating">
      <p>${this.__data.rating}</p>

      <h4>Deskripsi</h4>
      <p class="description">
        ${this.__data.description}
      </p>
    `;

    this.querySelector(".close").addEventListener("click", this.closeModal);
  }
}

Component.register("resto-modal", RestaurantModal);
