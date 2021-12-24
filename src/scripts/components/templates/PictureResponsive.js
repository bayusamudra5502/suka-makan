import Component from '../../lib/Component';

export default class PictureResponsiveComponent extends Component {
  constructor(isLazyLoading = true) {
    super();
    this.state = {
      defaultImage: { src: '', alt: '' },
      breakpoints: [],
      isLazyLoading,
      imgClassName: '',
      imageLoaded: () => { },
    };
  }

  addBreakpoint(breakpoint, type, src, includeWebp = false) {
    if (includeWebp) {
      this.addBreakpoint(breakpoint, 'image/webp', `${src}.webp`);
    }

    this.state = {
      breakpoints: [...this.state.breakpoints, { breakpoint, type, src }],
    };

    return this;
  }

  setDefaultImage(src, includeWebp = false) {
    this.state = { defaultImage: { ...this.state.defaultImage, src, includeWebp } };

    return this;
  }

  setAltImage(alt) {
    this.state = { defaultImage: { ...this.state.defaultImage, alt } };

    return this;
  }

  setImageClass(className) {
    this.state = { imgClassName: className };
    return this;
  }

  render() {
    this.innerHTML = `
      <picture></picture>
    `;
  }

  afterRender() {
    this.update();
  }

  update() {
    const picture = this.querySelector('picture');
    picture.innerHTML = '';

    const imageBreakpoints = this.state.breakpoints;

    if (this.state.defaultImage.includeWebp) {
      imageBreakpoints.push({
        type: 'image/webp',
        src: `${this.state.defaultImage.src}.webp`,
        isDefault: true,
      });
    }

    imageBreakpoints.forEach(({
      breakpoint, type, src, isDefault = false,
    }) => {
      const sourceElement = document.createElement('source');

      if (!isDefault) {
        sourceElement.media = `(max-width: ${breakpoint})`;
      }

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

    defaultImage.addEventListener('lazyloaded', () => {
      this.dispatchEvent(new Event('loaded'));
    });

    picture.append(defaultImage);
  }
}

Component.register('picture-responsive', PictureResponsiveComponent);
