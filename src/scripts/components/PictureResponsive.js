import Component from '../lib/Component';

export default class PictureResponsiveComponent extends Component {
  #rendered = false;

  constructor() {
    super();
    this.state = { defaultImage: { src: '', alt: '' }, breakpoints: [] };
  }

  addBreakpoint(breakpoint, type, src) {
    this.state = {
      breakpoints: [...this.state.breakpoints, { breakpoint, type, src }],
    };

    this.update();
  }

  setDefaultImage(src, alt = '') {
    this.state = { defaultImage: { src, alt } };
    this.update();
  }

  render() {
    this.innerHTML = `
      <picture></picture>
    `;

    this.#rendered = true;
  }

  update() {
    if (!this.#rendered) {
      return;
    }

    const picture = this.querySelector('picture');
    picture.innerHTML = '';

    this.state.breakpoints.forEach(({ breakpoint, type, src }) => {
      const sourceElement = document.createElement('source');
      sourceElement.media = `(max-width: ${breakpoint})`;
      sourceElement.srcset = encodeURI(src);
      sourceElement.type = type;

      picture.append(sourceElement);
    });

    const defaultImage = document.createElement('img');
    defaultImage.alt = this.state.defaultImage.alt;
    defaultImage.src = encodeURI(this.state.defaultImage.src);
    picture.append(defaultImage);
  }
}

Component.register('picture-responsive', PictureResponsiveComponent);
