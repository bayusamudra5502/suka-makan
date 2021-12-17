import Component from './Component';

export default class RestaurantModal extends Component {
  #data;

  get data() {
    return this.#data;
  }

  set data(newData) {
    this.#data = newData;
    this.render();
  }

  closeModal() {
    const overlay = document.querySelector('.box-overlay');
    overlay.classList.add('hide');
    overlay.removeEventListener('click', this.closeModal);

    document.body.querySelector('resto-modal').remove();
  }

  showModal() {
    const overlay = document.querySelector('.box-overlay');
    overlay.classList.remove('hide');
    overlay.addEventListener('click', this.closeModal);
    this.id = 'modal';

    document.body.appendChild(this);
    window.location.assign('#modal');
  }

  render() {
    this.innerHTML = `
      <h3>${this.data.name}</h3>
      <button class="bookmark" title="Tambahkan Bookmark">
          <img src="./images/assets/bookmark.png" alt="">
      </button>
      <button class="close" title="Tutup Modal">
          <img src="./images/assets/x.svg" alt="">
      </button>
      <img class="img-modal" 
        src="${this.data.pictureId}" alt="">

      <!-- Lokasi -->
      <img src="./images/assets/pin.png" alt="Lokasi">
      <p>${this.data.city}</p>

      <!-- Rating -->
      <img src="./images/assets/star.png" alt="Rating">
      <p>${this.data.rating}</p>

      <h4>Deskripsi</h4>
      <p class="description">
        ${this.data.description}
      </p>
    `;

    this.querySelector('.close').addEventListener('click', this.closeModal);
  }
}

Component.register('resto-modal', RestaurantModal);
