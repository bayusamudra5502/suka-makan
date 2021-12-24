import pinImage from '@img/assets/pin.png';
import Component from '../../lib/Component';
import HeroBaseComponent from '../base/HeroBase';

export default class BannerHero extends HeroBaseComponent {
  render() {
    this.className = 'banner';

    this.props = {
      message: `
      <p class="jumbo resto-name"></p>
      <div class="location">
        <img class="pin" src="${pinImage}" alt="Lokasi" />
        <p class="resto-location"></p>
      </div>
    `,
    };
  }

  afterRender() {
    super.render();
  }
}

Component.register('banner-hero', BannerHero);
