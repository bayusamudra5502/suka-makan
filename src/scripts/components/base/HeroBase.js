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

    const picture = this.querySelector('picture-responsive');
    picture.setAltImage(this.props.alt);
    picture.addBreakpoint('400px', 'image/jpeg', this.props.src.sm, !!this.props.useWebp);
    picture.addBreakpoint('750px', 'image/jpeg', this.props.src.md, !!this.props.useWebp);
    picture.setDefaultImage(this.props.src.lg, !!this.props.useWebp);

    message.innerHTML = this.props.message;
  }
}
