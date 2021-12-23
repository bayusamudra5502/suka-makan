import Component from '../../lib/Component';

export default class ToastContainer extends Component {
  #toastConstructor;

  constructor(toastConstructor) {
    super();
    this.#toastConstructor = toastConstructor;
  }

  render() {
    this.className = 'toast-container';
  }

  #showToast(object, delay) {
    const toastObject = object;

    this.appendChild(toastObject);
    setTimeout(() => {
      toastObject.show();
      toastObject.onclose = () => {
        this.removeChild(toastObject);
      };

      if (delay !== null) {
        setTimeout(() => {
          toastObject.hide();
        }, delay + 500);
      }
    }, 0);
  }

  addSuccessToast(message, delay = 2000) {
    const newToast = new this.#toastConstructor();
    newToast.setAsSuccess();
    newToast.setMessage(message);

    this.addCustomToast(newToast, delay);
  }

  addErrorToast(message, delay = 2000) {
    const newToast = new this.#toastConstructor();
    newToast.setAsError();
    newToast.setMessage(message);

    this.addCustomToast(newToast, delay);
  }

  addCustomToast(toastObject, delay = null) {
    this.#showToast(toastObject, delay);
  }
}

Component.register('toast-container', ToastContainer);
