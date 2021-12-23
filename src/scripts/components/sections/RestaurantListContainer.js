import Component from '../../lib/Component';
import RestaurantCard from '../templates/Card';

export default class RestaurantListContainer extends Component {
  set restaurantList(data) {
    this.props = { data };
  }

  get restaurantList() {
    return this.props?.data ?? null;
  }

  async render() {
    this.innerHTML = `
      <section class="result" id="result">
      </section>
    `;
  }

  async afterRender() {
    if (this.restaurantList === null) {
      return;
    }

    const container = this.querySelector('.result');

    this.restaurantList.forEach((data) => {
      const card = new RestaurantCard();
      card.data = data;

      container.appendChild(card);
    });
  }
}

Component.register('resto-list', RestaurantListContainer);
