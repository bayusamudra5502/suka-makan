import Component from '../../lib/Component';
import ReviewItem from '../templates/ReviewItem';

export default class ReviewContainer extends Component {
  constructor(reviewItem = ReviewItem) {
    super();

    this.refs = { ReviewItem: reviewItem };
  }

  render() {
    this.className = 'review-container';
  }

  afterRender() {
    this.update();
  }

  update() {
    this.innerHTML = '';
    this.props.data?.forEach((review) => {
      const newReview = new this.refs.ReviewItem();
      newReview.props = review;

      this.append(newReview);
    });
  }
}

Component.register('review-container', ReviewContainer);
