import RestaurantModel from '../api/RestaurantModel';
import LoadingComponent from '../components/Loading';
import RestaurantListContainer from '../components/RestoList';
import SearchBar from '../components/SearchBar';
import SearchMessage from '../components/SearchMessage';
import Component from '../lib/Component';

export default class SearchPage extends Component {
  constructor() {
    super();

    this.state = { keyword: '', isLoading: false };
  }

  async render() {
    this.innerHTML = `
      <h2>Pencarian</h2>
    `;
    const searchbar = new SearchBar();

    searchbar.onsearch = (keyword) => {
      this.state = { keyword };
      this.#getSearchResult();
    };

    this.append(searchbar);

    const result = document.createElement('div');
    result.className = 'search-result';
    this.append(result);

    this.update();
  }

  async #getSearchResult() {
    const container = new RestaurantListContainer();

    this.state = { isLoading: true };

    if (this.state.keyword !== '') {
      const searchResult = await RestaurantModel.searchRestaurant(this.state.keyword);
      container.restaurantList = searchResult;
    }

    this.state = { isLoading: false };

    const result = this.querySelector('.search-result');
    result.innerHTML = '';

    if (this.state.keyword === '') {
      result.append(new SearchMessage());
    } else {
      result.append(container);
    }
  }

  async update() {
    const result = this.querySelector('.search-result');

    if (result === null) {
      return;
    }

    result.innerHTML = '';

    if (this.state.isLoading) {
      result.append(new LoadingComponent());
      return;
    }

    if (this.state.keyword === '') {
      result.append(new SearchMessage());
    }
  }
}

Component.register('search-page', SearchPage);
