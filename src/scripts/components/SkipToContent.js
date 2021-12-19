import Component from '../lib/Component';

export default class SkipToContent extends Component {
  async render() {
    this.innerHTML = `
      <a class="skip" href="#content">
          Lewati ke konten
      </a>
    `;
  }
}

Component.register('skip-content', SkipToContent);
