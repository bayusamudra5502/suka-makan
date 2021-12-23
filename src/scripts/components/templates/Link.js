import Component from '../../lib/Component';

export default class LinkComponent extends Component {
  static redirect(to) {
    const triggerRedirect = new CustomEvent('pagechange', {
      detail: { to },
    });

    window.dispatchEvent(triggerRedirect);
  }

  #className;

  #location;

  #innerHTML;

  set dataStyle(newClass) {
    this.#className = newClass;
    this.update();
  }

  get dataStyle() {
    return this.#className || this.getAttribute('data-style');
  }

  set dataHref(to) {
    this.#location = to;
    this.update();
  }

  get dataHref() {
    return this.#location || this.getAttribute('data-href');
  }

  set dataContent(content) {
    this.#innerHTML = content;
    this.update();
  }

  get dataContent() {
    return this.#innerHTML || this.getAttribute('data-content');
  }

  async render() {
    this.innerHTML = `
      <a class="${this.dataStyle}" 
        href="/?${this.dataHref}">
        ${this.dataContent}
      </a>
    `;

    this.querySelector('a').onclick = (e) => {
      e.preventDefault();
      LinkComponent.redirect(this.dataHref);
    };
  }

  async;
}

Component.register('link-component', LinkComponent);
