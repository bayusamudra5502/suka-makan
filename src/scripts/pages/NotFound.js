import Component from '../lib/Component';

export default class NotFoundPage extends Component {
  async render() {
    this.innerHTML = '<h1>Not Found :(</h1>';
  }
}

Component.register('not-found-page', NotFoundPage);
