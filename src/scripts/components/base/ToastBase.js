import Component from '../../lib/Component';

export default class ToastBaseComponent extends Component {
  constructor() {
    super();
    this.onclose = () => { };
  }

  render() {
    this.classList.add('toast');
  }

  show() {
    this.classList.add('show');
  }

  hide() {
    this.classList.remove('show');

    setTimeout(() => {
      this.onclose();
    }, 350);
  }
}
