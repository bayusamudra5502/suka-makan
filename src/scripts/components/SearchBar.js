import searchIcon from '@img/assets/search.svg';
import Component from '../lib/Component';

export default class SearchBar extends Component {
  async render() {
    this.innerHTML = `
      <section id="search" class="search-container">      
        <form class="search-bar">
            <input name="keyword" placeholder="Cari Restoran">
            <button aria-label="Memulai Pencarian">
                <img src="${searchIcon}" alt="Cari">
            </button>
        </form>
      </section>
    `;
  }
}

Component.register('search-bar', SearchBar);
