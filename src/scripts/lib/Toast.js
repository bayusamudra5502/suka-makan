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
    if (!this.#toastObject) {
      throw new Error('Toast not yet registered');
    }

    this.#toastObject.addSuccessToast(message, delay);
  }

  static showError(message, delay) {
    if (!this.#toastObject) {
      throw new Error('Toast not yet registered');
    }

    this.#toastObject.addErrorToast(message, delay);
  }
}
