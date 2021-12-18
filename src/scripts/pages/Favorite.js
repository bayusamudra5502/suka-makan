import Component from '../lib/Component';

export default class FavoritePage extends Component {
  async render() {
    this.innerHTML = '<h1>Halaman Favorit</h1>';
  }
}

Component.register('favorite-page', FavoritePage);
