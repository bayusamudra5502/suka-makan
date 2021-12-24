import FavoriteModel from '../../api/FavoriteModel';
import Component from '../../lib/Component';
import Toast from '../../lib/Toast';

export default class FavoriteButton extends Component {
  constructor(favoriteModel = FavoriteModel, toastModel = Toast) {
    super();

    this.refs = { FavoriteModel: favoriteModel, ToastModel: toastModel };

    this.state = {
      isFavorite: false,
    };
  }

  set buttonImage({ favoriteIcon, notFavoriteIcon }) {
    this.state = { favoriteIcon, notFavoriteIcon };
  }

  get buttonFavoriteImage() {
    return this.state.favoriteIcon || this.getAttribute('data-img-fav');
  }

  get buttonNotFavoriteImage() {
    return this.state.notFavoriteIcon || this.getAttribute('data-img-notfav');
  }

  set buttonClass(className) {
    this.state = { buttonClass: className };
  }

  get buttonClass() {
    return this.state.buttonClass || this.getAttribute('data-btn-class');
  }

  set data(data) {
    this.state = { data };
  }

  get data() {
    return this.state.data;
  }

  set isFavorite(favoriteState) {
    this.state = { isFavorite: favoriteState };
  }

  get isFavorite() {
    return this.state.isFavorite;
  }

  async #toggleFavorite() {
    if (this.isFavorite) {
      await this.refs.FavoriteModel.deleteFavorite(this.data.id);
      this.refs.ToastModel.showSuccess('Berhasil menghapus dari daftar favorit');
      this.state = { isFavorite: false };
    } else {
      await this.refs.FavoriteModel.addFavorite(this.data);
      this.refs.ToastModel.showSuccess('Berhasil menambahkan ke daftar favorit');
      this.state = { isFavorite: true };
    }
  }

  render() {
    this.innerHTML = `
      <button title="Tambahkan Favorit">
        <img src="" alt="">
      </button>
    `;
  }

  afterRender() {
    const buttonBookmark = this.querySelector('button');
    const newClass = this.buttonClass?.split(' ');

    if (newClass) {
      buttonBookmark.classList.add(newClass);
    }

    buttonBookmark.onclick = () => {
      this.#toggleFavorite();
    };

    this.update();
  }

  isSrcAvailable() {
    return this.buttonFavoriteImage && this.buttonNotFavoriteImage;
  }

  update() {
    const buttonBookmark = this.querySelector('button');

    if (this.state.isFavorite) {
      if (this.isSrcAvailable()) {
        this.setAttributeValueURI('img', 'src', this.buttonFavoriteImage);
      }

      buttonBookmark.setAttribute('title', 'Hapus favorit');
    } else {
      if (this.isSrcAvailable()) {
        this.setAttributeValueURI('img', 'src', this.buttonNotFavoriteImage);
      }

      buttonBookmark.setAttribute('title', 'Tambahkan favorit');
    }
  }
}

Component.register('favorite-button', FavoriteButton);
