import Component from '../../lib/Component';

export default class ReviewItem extends Component {
  render() {
    this.className = 'review-item';
    this.innerHTML = `
      <p class="name"></p>
      <p class="date"></p>
      <p class="review"></p>
    `;
  }

  afterRender() {
    this.update();
  }

  update() {
    if (!this.props) {
      return;
    }

    this.setElementValue('.name', this.props.name);
    this.setElementValue('.date', this.props.date);
    this.setElementValue('.review', this.props.review);
  }
}

Component.register('review-item', ReviewItem);
