import Component from '../lib/Component';

export default class ToastComponent extends Component {
  #message;

  render() {
    this.className = 'toast hide';
    this.innerText = this.#message;
  }

  setAsSuccess() {
    this.classList.add('success');
  }

  setAsError() {
    this.classList.add('error');
  }

  setMessage(message) {
    this.#message = message;
  }
}

Component.register('toast-component', ToastComponent);
