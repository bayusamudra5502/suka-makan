import Component from '../lib/Component';
import ToastBaseComponent from '../lib/ToastBase';

export default class ToastComponent extends ToastBaseComponent {
  #message;

  onclose = () => { };

  render() {
    super.render();
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
