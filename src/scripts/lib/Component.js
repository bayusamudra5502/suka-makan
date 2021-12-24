export default class Component extends HTMLElement {
  constructor() {
    super();

    this.localData = {
      props: {},
      state: {},
      refs: {},
      isRendered: false,
    };
  }

  set props(newProps) {
    this.localData.props = { ...this.localData.props, ...newProps };

    if (this.isRendered) { this.update(); }
  }

  get props() {
    return this.localData.props;
  }

  set state(newState) {
    this.localData.state = { ...this.localData.state, ...newState };

    if (this.isRendered) { this.update(); }
  }

  get state() {
    return this.localData.state;
  }

  set refs(newRefs) {
    this.localData.refs = { ...this.localData.refs, ...newRefs };
  }

  get refs() {
    return this.localData.refs;
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
    this.localData.isRendered = true;
    await this.afterRender();
  }

  get isRendered() {
    return this.localData.isRendered;
  }

  static register(elementName, elementClass) {
    customElements.define(elementName, elementClass);
  }
}

Component.prototype.afterRender = async () => { };
Component.prototype.update = async () => { };
