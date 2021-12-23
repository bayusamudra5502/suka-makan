import Component from '../../lib/Component';

export default class PictureResponsiveComponent extends Component {
  #rendered = false;

  constructor(isLazyLoading = true) {
    super();
    this.state = {
      defaultImage: { src: '', alt: '' },
      breakpoints: [],
      isLazyLoading,
      imgClassName: '',
    };
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

  setAltImage(alt) {
    this.state = { alt };
    this.update();
  }

  setImageClass(className) {
    this.state = { imgClassName: className };
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
      sourceElement.type = type;

      if (this.state.isLazyLoading) {
        sourceElement.setAttribute('data-srcset', encodeURI(src));
      } else {
        sourceElement.srcset = encodeURI(src);
      }

      picture.append(sourceElement);
    });

    const defaultImage = document.createElement('img');
    defaultImage.alt = this.state.defaultImage.alt;
    defaultImage.className = this.state.imgClassName;

    if (this.state.isLazyLoading) {
      defaultImage.setAttribute('data-src', encodeURI(this.state.defaultImage.src));
      defaultImage.classList.add('lazyload');
    } else {
      defaultImage.src = encodeURI(this.state.defaultImage.src);
    }
    picture.append(defaultImage);
  }
}

Component.register('picture-responsive', PictureResponsiveComponent);
