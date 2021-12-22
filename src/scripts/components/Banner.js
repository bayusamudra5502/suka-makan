import imgUnloved from '@img/assets/unloved-circle.png';
import imgLoved from '@img/assets/loved-circle.png';
import Component from '../lib/Component';
import './BannerHero';

export default class BannerComponent extends Component {
  constructor() {
    super();
    this.onfavoritetoggle = () => { };
  }

  async render() {
    this.innerHTML = `
    <banner-hero></banner-hero>
    <div class="favorite-container">
      <button class="favorite-btn" title="Tambahkan ke daftar favorit">
        <img src="${imgUnloved}" alt=""> 
      </button>
    </div>
    `;

    this.querySelector('button').onclick = this.onfavoritetoggle;

    const bannerImage = this.querySelector('.banner');
    bannerImage.props = { src: this.props.image };
    this.setElementValue('.resto-name', this.props.name);
    this.setElementValue('.resto-location', this.props.location);

    await this.update();
  }

  async update() {
    const buttonFavorite = this.querySelector('button');
    const imageBtnFavorite = this.querySelector('button img');

    if (!buttonFavorite || !imageBtnFavorite) {
      return;
    }

    if (this.props.isFavorite) {
      imageBtnFavorite.src = imgLoved;
      buttonFavorite.setAttribute('title', 'Hapus dari daftar favorit');
    } else {
      imageBtnFavorite.src = imgUnloved;
      buttonFavorite.setAttribute('title', 'Tambahkan ke daftar favorit');
    }
  }
}

Component.register('banner-component', BannerComponent);
