export default class Component extends HTMLElement {
  set style(cssValue) {
    this.__style = cssValue;
    this.render();
  }

  get style() {
    return this.__style;
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {}

  static register(elementName, elementClass) {
    customElements.define(elementName, elementClass);
  }
}
