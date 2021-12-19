import Component from '../lib/Component';

export default class ToastComponent extends Component {
  #message;

  render() {
    this.classList.add('toast');
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

  show() {
    this.classList.add('show');
  }

  hide() {
    this.classList.remove('show');
  }
}

Component.register('toast-component', ToastComponent);
