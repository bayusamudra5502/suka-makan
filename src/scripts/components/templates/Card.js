import unlovedImage from '@img/assets/unlove.png';
import lovedImage from '@img/assets/love.png';
import pinImage from '@img/assets/pin.png';
import starImage from '@img/assets/star.png';
import Component from '../../lib/Component';
import LinkComponent from './Link';
import FavoriteModel from '../../api/FavoriteModel';

import '../inputs/FavoriteButton';
import './PictureResponsive';

const MAX_CHAR = 300;

export default class RestaurantCard extends Component {
  #favoriteModel;

  constructor(favoriteModel = FavoriteModel) {
    super();

    this.state = { isFavorite: false };
    this.#favoriteModel = favoriteModel;
  }

  set data(newData) {
    this.state = { data: newData };
  }

  get data() {
    return this.state?.data ?? null;
  }

  render() {
    this.innerHTML = `
      <div class="card">
        <div class="banner-card-container">
          <picture-responsive class="banner-card"></picture-responsive>
        </div>
        <div class="content">
            <h3></h3>         
            <favorite-button 
              data-img-fav="${lovedImage}" 
              data-img-notfav="${unlovedImage}"
              data-btn-class="bookmark">
            </favorite-button>
      
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
  }

  async afterRender() {
    const favoriteButton = this.querySelector('favorite-button');
    favoriteButton.data = this.data;

    const linkComponent = (new LinkComponent());
    linkComponent.className = 'btn-detail';
    linkComponent.dataStyle = 'btn';
    linkComponent.dataContent = 'Lihat Detail';
    linkComponent.dataHref = `/detail/${this.data.id}`;

    this.querySelector('.content').appendChild(linkComponent);

    const isFavorite = await this.#favoriteModel.isFavorite(this.data.id);
    this.state = { isFavorite };
    this.update();

    const message = this.data.description.length > MAX_CHAR
      ? `${this.data.description.slice(0, MAX_CHAR - 3)}...`
      : this.data.description;

    this.setElementValue('h3', this.data.name);
    this.setElementValue('.resto-location', this.data.city);
    this.setElementValue('.resto-rating', this.data.rating);
    this.setElementValue('.description', message);

    const cardPicture = this.querySelector('.banner-card');
    cardPicture.setDefaultImage(this.data.image.sm);
    cardPicture.setAltImage(`Restoran ${this.data.name}`);
    cardPicture.addEventListener('loaded', () => {
      const skeleton = this.querySelector('.banner-card-container');
      skeleton.props = { loading: false };
    });

    this.update();
  }

  update() {
    const favoriteButton = this.querySelector('favorite-button');
    favoriteButton.isFavorite = this.state.isFavorite;
  }
}

Component.register('card-element', RestaurantCard);
