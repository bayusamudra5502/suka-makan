export default class Toast {
  static #toastObject;

  static register(toastObject) {
    this.#toastObject = toastObject;
  }

  static showSuccess() {

  }

  static showError() {

  }
}
