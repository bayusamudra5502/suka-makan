import Component from '../lib/Component';

export default class ToastContainer extends Component {
  #toastConstructor;

  constructor(toastConstructor) {
    super();
    this.#toastConstructor = toastConstructor;
  }

  render() {
    this.className = 'toast-container';
  }

  #showToast(toastObject, delay) {
    this.appendChild(toastObject);
    setTimeout(() => {
      toastObject.show();

      setTimeout(() => {
        toastObject.hide();

        setTimeout(() => {
          this.removeChild(toastObject);
        }, 350);
      }, delay + 500);
    }, 0);
  }

  addSuccessToast(message, delay = 2000) {
    const newToast = new this.#toastConstructor();
    newToast.setAsSuccess();
    newToast.setMessage(message);

    this.#showToast(newToast, delay);
  }

  addErrorToast(message, delay = 2000) {
    const newToast = new this.#toastConstructor();
    newToast.setAsError();
    newToast.setMessage(message);

    this.#showToast(newToast, delay);
  }
}

Component.register('toast-container', ToastContainer);
