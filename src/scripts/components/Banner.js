import pinImage from '@img/assets/pin.png';
import imgUnloved from '@img/assets/unloved-circle.png';
import imgLoved from '@img/assets/loved-circle.png';
import Component from '../lib/Component';

export default class BannerComponent extends Component {
  onfavoritetoggle = () => { };

  async render() {
    this.innerHTML = `
    <section class="banner">
        <div class="message">
            <p class="jumbo resto-name"></p>
            <div class="location">
              <img class="pin" src="${pinImage}" alt="Lokasi" />
              <p class="resto-location"></p>
            </div>
        </div>
        <img class="banner-image" src="" alt="">
        <div class="overlay"></div>
    </section>
    <div class="favorite-container">
      <button class="favorite-btn" title="Tambahkan ke daftar favorit">
        <img src="${imgUnloved}" alt=""> 
      </button>
    </div>
    `;

    this.querySelector('button').onclick = this.onfavoritetoggle;

    await this.update();
  }

  async update() {
    this.setElementValue('.resto-name', this.props.name);
    this.setElementValue('.resto-location', this.props.location);
    this.setAttributeValueURI('.banner-image', 'src', this.props.image);

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
