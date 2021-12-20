import Component from './Component';

export default class ToastBaseComponent extends Component {
  onclose = () => { };

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
