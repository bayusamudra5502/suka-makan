import Component from '../../lib/Component';

export default class SkeletonComponent extends Component {
  #shadowElement;

  constructor() {
    super();
    this.props = { loading: true };

    this.#shadowElement = this.attachShadow({ mode: 'open' });
  }

  render() {
    this.#shadowElement.innerHTML = `
      <style>
        .skeleton-container {
          position: relative;
          width: 100%:
          height: 100%;
        }
      </style>
      <div class="skeleton-container">      
        <slot></slot>
        <slot name="skeleton"></slot>
      </div>
    `;

    this.#shadowElement.style = `
      position: relative;
    `;
  }

  afterRender() {
    this.update();
  }

  update() {
    const skeleton = this.querySelector('.skeleton');
    if (!this.props.loading) {
      skeleton.classList.remove('loading');
      return;
    }

    skeleton.classList.add('loading');
  }
}

Component.register('skeleton-container', SkeletonComponent);
