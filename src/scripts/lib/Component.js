export default class Component extends HTMLElement {
  #props;

  set props(newProps) {
    this.#props = { ...this.#props, ...newProps };
    this.render();
  }

  get props() {
    return this.#props;
  }

  setElementValue(selector, value) {
    const element = this.querySelector(selector);
    element.innerText = value;
  }

  async attributeChangedCallback() {
    await this.render();
  }

  async connectedCallback() {
    await this.render();
  }

  async render() {
    throw new Error('Render is not yet implemented');
  }

  static register(elementName, elementClass) {
    customElements.define(elementName, elementClass);
  }
}
