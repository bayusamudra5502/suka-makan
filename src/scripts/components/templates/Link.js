import Component from '../../lib/Component';

export default class LinkComponent extends Component {
  static redirect(to) {
    const triggerRedirect = new CustomEvent('pagechange', {
      detail: { to },
    });

    window.dispatchEvent(triggerRedirect);
  }

  set dataStyle(newClass) {
    this.state = { className: newClass };
  }

  get dataStyle() {
    return this.state.className || this.getAttribute('data-style');
  }

  set dataHref(to) {
    this.state = { location: to };
  }

  get dataHref() {
    return this.state.location || this.getAttribute('data-href');
  }

  set dataContent(content) {
    this.state = { content };
  }

  get dataContent() {
    return this.state.content || this.getAttribute('data-content');
  }

  render() {
    this.innerHTML = `
      <a class="" href=""></a>
    `;
  }

  afterRender() {
    this.update();
  }

  update() {
    const linkElement = this.querySelector('a');
    linkElement.onclick = (e) => {
      e.preventDefault();
      LinkComponent.redirect(this.dataHref);
    };

    linkElement.className = this.dataStyle;
    linkElement.href = `/?${this.dataHref}`;
    linkElement.innerHTML = this.dataContent;
  }

  async;
}

Component.register('link-component', LinkComponent);
