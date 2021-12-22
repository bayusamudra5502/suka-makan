import Component from '../lib/Component';

export default class HeroBaseComponent extends Component {
  render() {
    this.innerHTML = `
      <div class="message"></div>
      <img src="" alt="">
      <div class="overlay"></div>
    `;
  }

  update() {
    const message = this.querySelector('.message');

    if (!message || !this.props) {
      return;
    }

    this.setAttributeValueURI('img', 'src', this.props.src);
    message.innerHTML = this.props.message;
  }
}
