import Component from '../../lib/Component';

export default class Footer extends Component {
  render() {
    this.innerHTML = '<footer>Copyright Suka Makan © 2021</footer>';
  }
}

Component.register('footer-app', Footer);
