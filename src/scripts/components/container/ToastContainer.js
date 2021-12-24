import Component from '../../lib/Component';
import ToastUtil from '../../lib/util/Toast';

export default class ToastContainer extends Component {
  constructor(toastConstructor) {
    super();
    this.refs = { toastConstructor };
  }

  render() {
    this.className = 'toast-container';
  }

  showToast(object, delay) {
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
    const newToast = ToastUtil.toastBuilder({
      ToastConstructor: this.refs.toastConstructor,
      message,
      type: 'success',
    });

    this.addCustomToast(newToast, delay);
  }

  addErrorToast(message, delay = 2000) {
    const newToast = ToastUtil.toastBuilder({
      ToastConstructor: this.refs.toastConstructor,
      message,
      type: 'error',
    });

    this.addCustomToast(newToast, delay);
  }

  addCustomToast(toastObject, delay = null) {
    this.showToast(toastObject, delay);
  }
}

Component.register('toast-container', ToastContainer);
