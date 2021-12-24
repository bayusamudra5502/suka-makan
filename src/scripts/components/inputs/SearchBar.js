import searchIcon from '@img/assets/search.svg';
import Component from '../../lib/Component';

export default class SearchBar extends Component {
  constructor() {
    super();
    this.refs = { submitHandler: () => { } };
  }

  set onsearch(handler) {
    this.refs = { submitHandler: handler };
  }

  get onsearch() {
    return this.refs.submitHandler;
  }

  render() {
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

  afterRender() {
    this.querySelector('form').onsubmit = (e) => {
      e.preventDefault();
      this.refs.submitHandler(e.target[0].value);
    };
  }
}

Component.register('search-bar', SearchBar);
