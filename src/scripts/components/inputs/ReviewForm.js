import RestaurantModel from '../../api/RestaurantModel';
import Component from '../../lib/Component';
import Toast from '../../lib/Toast';

export default class ReviewForm extends Component {
  constructor() {
    super();
    this.onaddeddocument = () => { };
  }

  render() {
    this.innerHTML = `
      <form>
        <input required name="name" placeholder="Nama Pengulas">
        <textarea required name="review" placeholder="Ulasan"></textarea>
        <button class="btn submit">Submit</button>
      </form>
    `;

    this.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.#submit({
        name: e.target[0].value,
        review: e.target[1].value,
      });
    });
  }

  update() {
    const submitButton = this.querySelector('form button');

    if (this.state.isLoading) {
      submitButton.setAttribute('disabled', 'disabled');
      submitButton.innerHTML = 'Loading...';
      return;
    }

    if (submitButton.hasAttribute('disabled')) {
      submitButton.removeAttribute('disabled');
    }

    submitButton.innerHTML = 'Submit';
  }

  async #submit(data) {
    const payload = { ...data, id: this.props.id };
    this.state = { isLoading: true };

    try {
      const result = await RestaurantModel.postReview(payload.id, payload.name, payload.review);

      if (!result.error) {
        Toast.showSuccess('Berhasil menambahkan komentar');
        this.onaddeddocument(result.customerReviews);

        this.querySelector('form').reset();
      } else {
        throw new Error('Gagal menambahkan komentar');
      }
    } catch (e) {
      Toast.showError('Gagal menambahkan review');
    }

    this.state = { isLoading: false };
  }
}

Component.register('review-form', ReviewForm);
