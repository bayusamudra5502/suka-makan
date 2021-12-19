export default class Toast {
  static #toastObject = null;

  static register(toastContainer) {
    if (this.#toastObject !== null) {
      document.body.removeChild(this.#toastObject);
    }

    this.#toastObject = toastContainer;
    document.body.appendChild(this.#toastObject);
  }

  static showSuccess(message, delay = 2000) {
    this.#toastObject.addSuccessToast(message, delay);
  }

  static showError(message, delay) {
    this.#toastObject.addErrorToast(message, delay);
  }
}
