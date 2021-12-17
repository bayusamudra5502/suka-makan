export default class Component extends HTMLElement {
  #style;

  set style(cssValue) {
    this.#style = cssValue;
    this.render();
  }

  get style() {
    return this.#style;
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    throw new Error('Render is not yet implemented');
  }

  static register(elementName, elementClass) {
    customElements.define(elementName, elementClass);
  }
}
