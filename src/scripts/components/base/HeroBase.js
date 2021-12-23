import Component from '../../lib/Component';
import '../templates/PictureResponsive';

export default class HeroBaseComponent extends Component {
  render() {
    this.innerHTML = `
      <div class="message"></div>
      <picture-responsive></picture-responsive>
      <div class="overlay"></div>
    `;
  }

  afterRender() {
    this.update();
  }

  update() {
    const message = this.querySelector('.message');

    if (!message || !this.props) {
      return;
    }

    const picture = this.querySelector('picture-responsive');
    picture.addBreakpoint('400px', 'image/jpeg', this.props.src.sm);
    picture.addBreakpoint('750px', 'image/jpeg', this.props.src.md);
    picture.setDefaultImage(this.props.src.lg, this.props.alt);

    message.innerHTML = this.props.message;
  }
}
