import Component from '../../lib/Component';

export default class Message extends Component {
  render() {
    this.className = 'message-box';
    this.innerHTML = `
      <img src="${this.state.image}" alt="${this.state.imageAlt}">
      <p class="message-title">${this.state.title}</p>
      <div class="message-subtitle">${this.state.subTitle}</div>
    `;
  }

  afterRender() {
    this.update();
  }

  update() {
    const imgElement = this.querySelector('img');

    imgElement.src = this.state.image;
    imgElement.alt = this.state.imageAlt;

    this.querySelector('.message-title').innerHTML = this.state.title;
    this.querySelector('.message-subtitle').innerHTML = this.state.subTitle;
  }
}
