import imgUnloved from '@img/assets/unloved-circle.png';
import imgLoved from '@img/assets/loved-circle.png';
import Component from '../../lib/Component';
import '../hero/BannerHero';
import '../inputs/FavoriteButton';

export default class BannerComponent extends Component {
  render() {
    this.innerHTML = `
    <banner-hero></banner-hero>
    <div class="favorite-container">
      <favorite-button
        data-btn-class="favorite-btn"
        data-img-fav="${imgLoved}"
        data-img-notfav="${imgUnloved}">
      </favorite-button>
    </div>
    `;
  }

  afterRender() {
    const bannerImage = this.querySelector('.banner');
    bannerImage.props = { src: this.props.image, alt: `Restoran ${this.props.name}` };
    this.setElementValue('.resto-name', this.props.name);
    this.setElementValue('.resto-location', this.props.location);

    const favoriteButton = this.querySelector('favorite-button');
    favoriteButton.data = this.props;
    favoriteButton.isFavorite = this.props.isFavorite;
  }
}

Component.register('banner-component', BannerComponent);
