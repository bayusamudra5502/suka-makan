import heroImage from '@img/heros/hero-image.jpg';
import Component from '../lib/Component';
import HeroBaseComponent from './HeroBase';

export default class HeroElement extends HeroBaseComponent {
  render() {
    super.render();
    this.className = 'hero';
    this.props = {
      message: `
      <p class="jumbo">Cari dan temukan</p>
      <p>Restoran yang paling cocok bagi anda</p>
    `,
      src: heroImage,
    };
  }
}

Component.register('hero-element', HeroElement);
