import heroImage from '@img/heros/hero-image.jpg';
import heroImageMd from '@img/heros/hero-image-medium.jpg';
import heroImageSm from '@img/heros/hero-image-small.jpg';
import Component from '../../lib/Component';
import HeroBaseComponent from '../base/HeroBase';

export default class HeroElement extends HeroBaseComponent {
  render() {
    super.render();
    this.className = 'hero';
    this.props = {
      message: `
      <p class="jumbo">Cari dan temukan</p>
      <p>Restoran yang paling cocok bagi anda</p>
    `,
      src: { lg: heroImage, md: heroImageMd, sm: heroImageSm },
      alt: '',
    };
  }
}

Component.register('hero-element', HeroElement);
