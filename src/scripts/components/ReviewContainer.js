import Component from '../lib/Component';
import ReviewItem from './ReviewItem';

export default class ReviewContainer extends Component {
  async render() {
    this.className = 'review-container';
  }

  async update() {
    this.innerHTML = '';
    this.props.data.forEach((review) => {
      const newReview = new ReviewItem();
      newReview.props = review;

      this.append(newReview);
    });
  }
}

Component.register('review-container', ReviewContainer);
