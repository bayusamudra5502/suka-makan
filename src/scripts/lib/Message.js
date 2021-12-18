import Component from './Component';

export default class Message extends Component {
  async render() {
    this.innerHTML = `
      <div class="message-box">
        <img src="${this.state.image}" alt="${this.state.imageAlt}">
        <p class="message-title">${this.state.title}</p>
        <p class="message-subtitle">${this.state.subTitle}</p>
      </div>
    `;
  }
}
