import RestaurantModel from '../api/RestaurantModel';
import LoadingComponent from '../components/feedback/Loading';
import OfflineMessage from '../components/feedback/OfflineMessage';
import RestaurantListContainer from '../components/sections/RestaurantListContainer';
import SearchBar from '../components/inputs/SearchBar';
import SearchEmpty from '../components/feedback/SearchEmpty';
import SearchMessage from '../components/feedback/SearchMessage';
import Component from '../lib/Component';

export default class SearchPage extends Component {
  constructor() {
    super();

    this.state = { keyword: '', isLoading: false };
  }

  render() {
    document.title = 'Pencarian - Suka Makan';

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
  }

  afterRender() {
    this.update();
  }

  async #getSearchResult() {
    try {
      this.state = { isLoading: true };

      const searchResult = this.state.keyword !== '' ? await RestaurantModel.searchRestaurant(this.state.keyword) : [];

      this.state = { isLoading: false };

      const result = this.querySelector('.search-result');
      result.innerHTML = '';

      if (this.state.keyword === '') {
        result.append(new SearchMessage());
      } else if (searchResult.length > 0) {
        const container = new RestaurantListContainer();
        container.restaurantList = searchResult;
        result.append(container);
      } else {
        result.append(new SearchEmpty());
      }
    } catch (err) {
      this.state = { isLoading: false, isOffline: true };
    }
  }

  update() {
    const result = this.querySelector('.search-result');

    if (result === null) {
      return;
    }

    result.innerHTML = '';

    if (this.state.isLoading) {
      result.append(new LoadingComponent());
      return;
    }

    if (this.state.isOffline) {
      result.append(new OfflineMessage());
      return;
    }

    if (this.state.keyword === '') {
      result.append(new SearchMessage());
    }
  }
}

Component.register('search-page', SearchPage);
