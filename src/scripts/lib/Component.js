export default class Component extends HTMLElement {
  #props = {};

  #isRendered = false;

  #state = {};

  set props(newProps) {
    this.#props = { ...this.#props, ...newProps };

    if (this.#isRendered) { this.update(); }
  }

  get props() {
    return this.#props;
  }

  set state(newState) {
    this.#state = { ...this.#state, ...newState };

    if (this.#isRendered) { this.update(); }
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

  insertListElement(containerSelector, arrayData, handlerFunction) {
    const container = this.querySelector(containerSelector);

    arrayData.forEach((element) => {
      const listElement = document.createElement('li');
      listElement.innerText = handlerFunction(element);
      container.append(
        listElement,
      );
    });
  }

  async attributeChangedCallback() {
    await this.update();
  }

  async connectedCallback() {
    await this.render();
    this.#isRendered = true;
    await this.afterRender();
  }

  get isRendered() {
    return this.#isRendered;
  }

  static register(elementName, elementClass) {
    customElements.define(elementName, elementClass);
  }
}

Component.prototype.afterRender = async () => { };
Component.prototype.update = async () => { };
