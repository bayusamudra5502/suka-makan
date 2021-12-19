import pinImage from '@img/assets/pin.png';
import Component from '../lib/Component';

export default class BannerComponent extends Component {
  async render() {
    this.innerHTML = `
    <section class="banner">
        <div class="message">
            <p class="jumbo resto-name"></p>
            <div class="location">
              <img class="pin" src="${pinImage}" alt="Lokasi" />
              <p class="resto-location"></p>
            </div>
            <div class="favorite">
              Fav
            </div>
        </div>
        <img class="banner-image" src="" alt="">
        <div class="overlay"></div>
    </section>
    `;

    this.setElementValue('.resto-name', this.props.name);
    this.setElementValue('.resto-location', this.props.location);
    this.setAttributeValueURI('.banner-image', 'src', this.props.image);
  }
}

Component.register('banner-component', BannerComponent);
