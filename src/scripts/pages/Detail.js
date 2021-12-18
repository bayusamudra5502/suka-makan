import Component from '../lib/Component';

export default class RestaurantDetail extends Component {
  render() {
    this.innerHTML = `<h1>Resto Detail id ${this.props.id}</h1>`;
  }
}

Component.register('detail-page', RestaurantDetail);
