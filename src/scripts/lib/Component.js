export default class Component extends HTMLElement {
  #props = {};

  #state = {};

  set props(newProps) {
    this.#props = { ...this.#props, ...newProps };
    this.update();
  }

  get props() {
    return this.#props;
  }

  set state(newState) {
    this.#state = { ...this.#state, ...newState };
    this.update();
  }

  get state() {
    return this.#state;
  }

  setElementValue(selector, value) {
    const element = this.querySelector(selector);

    if (element !== null) {
      element.innerText = value;
    }
  }

  setAttributeValueURI(selector, attributeName, value) {
    const element = this.querySelector(selector);

    if (element !== null) {
      element.setAttribute(attributeName, encodeURI(value));
    }
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

  async update() {
    await this.render();
  }

  static register(elementName, elementClass) {
    customElements.define(elementName, elementClass);
  }
}
