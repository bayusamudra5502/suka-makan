import searchIcon from '@img/assets/search.svg';
import Component from '../../lib/Component';

export default class SearchBar extends Component {
  #submitHandler;

  constructor() {
    super();
    this.#submitHandler = () => { };
  }

  set onsearch(handler) {
    this.#submitHandler = handler;
  }

  get onsearch() {
    return this.#submitHandler;
  }

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

  async afterRender() {
    this.querySelector('form').onsubmit = (e) => {
      e.preventDefault();
      this.#submitHandler(e.target[0].value);
    };
  }
}

Component.register('search-bar', SearchBar);
