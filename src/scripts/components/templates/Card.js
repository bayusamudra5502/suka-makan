import unlovedImage from '@img/assets/unlove.png';
import lovedImage from '@img/assets/love.png';
import pinImage from '@img/assets/pin.png';
import starImage from '@img/assets/star.png';
import Component from '../../lib/Component';
import LinkComponent from './Link';
import FavoriteModel from '../../api/FavoriteModel';
import Toast from '../../lib/Toast';
import './PictureResponsive';

const MAX_CHAR = 300;

export default class RestaurantCard extends Component {
  #linkComponent;

  constructor() {
    super();

    this.state = { isFavorite: false };
  }

  set data(newData) {
    this.state = { data: newData };
  }

  get data() {
    return this.state?.data ?? null;
  }

  async #toggleFavorite() {
    if (this.state.isFavorite) {
      await FavoriteModel.deleteFavorite(this.data.id);
      Toast.showSuccess('Berhasil menghapus dari daftar favorit');
    } else {
      await FavoriteModel.addFavorite(this.data);
      Toast.showSuccess('Berhasil menambahkan ke daftar favorit');
    }

    this.state = { isFavorite: await FavoriteModel.isFavorite(this.data.id) };
  }

  async render() {
    this.innerHTML = `
    <div class="card">
        <picture-responsive class="banner-card"></picture-responsive>
        <div class="content">
            <h3></h3>         
            <button class="bookmark" title="Tambahkan Favorit">
                <img src="${unlovedImage}" alt="">
            </button>
      

            <!-- Lokasi -->
            <img src="${pinImage}" alt="Lokasi Restoran">
            <p class="resto-location"></p>

            <!-- Rating -->
            <img src="${starImage}" alt="Rating Restoran">
            <p class="resto-rating"></p>

            <p class="description"></p>
        </div>
    </div>
    `;

    this.#linkComponent = (new LinkComponent());
    this.#linkComponent.className = 'btn-detail';
    this.#linkComponent.dataStyle = 'btn';
    this.#linkComponent.dataContent = 'Lihat Detail';

    this.querySelector('.content').appendChild(this.#linkComponent);

    const isFavorite = await FavoriteModel.isFavorite(this.data.id);
    this.state = { isFavorite };
    await this.update();

    this.querySelector('.bookmark').onclick = () => {
      this.#toggleFavorite();
    };
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

    const cardPicture = this.querySelector('.banner-card');

    if (cardPicture) {
      cardPicture.setDefaultImage(this.data.image.sm);
    }

    if (this.#linkComponent) {
      this.#linkComponent.dataHref = `/detail/${this.data.id}`;
    }

    const buttonBookmark = this.querySelector('.bookmark');
    const imgBookmark = this.querySelector('.bookmark img');

    if (!buttonBookmark || !imgBookmark) {
      return;
    }

    if (this.state.isFavorite) {
      buttonBookmark.setAttribute('title', 'Hapus favorit');
      imgBookmark.setAttribute('src', lovedImage);
    } else {
      buttonBookmark.setAttribute('title', 'Tambahkan favorit');
      imgBookmark.setAttribute('src', unlovedImage);
    }
  }
}

Component.register('card-element', RestaurantCard);
