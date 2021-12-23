import starImage from '@img/assets/star.png';
import Component from '../../lib/Component';
import '../inputs/ReviewForm';
import '../container/ReviewContainer';
import '../templates/PictureResponsive';

export default class RestaurantDetailDescription extends Component {
  async render() {
    this.innerHTML = `
      <section class="detail">
        <section class="description">
          <h2>Deskripsi</h2>
          <p></p>
        </section>
        <section class="address">
          <h2>Alamat</h2>
          <p></p>
        </section>
        <section class="type">
          <h2>Kategori</h2>
          <ul></ul>
        </section>
        <section class="menus">
          <h2>Menu Restoran</h2>
          <h3>Makanan</h3>
          <ul class="food-list"></ul>
          <h3>Minuman</h3>
          <ul class="drink-list"></ul>
        </section>
        <section class="image-resto">
          <h2>Foto Restoran</h2>
          <div class="img-container">
            <picture-responsive></picture-responsive>
          </div>
        </section>
        <section class="rating">
          <h2>Rating</h2>
          <div class="rating-value">
            <img src="${starImage}" alt="Nilai Rating">
            <p></p>
          </div>
        </section>
        <section class="review">
          <h2>Ulasan</h2>
          <h3>Tulis Ulasan</h3>
          <div class="review-writer">
            <review-form></review-form>
          </div>
          <h3>Ulasan Pengunjung</h3>
          <div class="reviews">
            <review-container></review-container>
          </div>
        </section>
      </section>
    `;
  }

  async afterRender() {
    this.setElementValue('.description p', this.props.description);
    this.setElementValue(
      '.address p',
      `${this.props.address}, Kota ${this.props.city}`,
    );
    this.setElementValue('.rating-value p', this.props.rating);

    this.insertListElement('.type ul', this.props.categories, ({ name }) => name);
    this.insertListElement('.menus .food-list', this.props.menus.foods, ({ name }) => name);
    this.insertListElement('.menus .drink-list', this.props.menus.drinks, ({ name }) => name);

    const form = this.querySelector('review-form');
    const reviewContainer = this.querySelector('review-container');
    form.props = { id: this.props.id };

    form.onaddeddocument = (data) => {
      reviewContainer.props = { data };
    };

    reviewContainer.props = { data: this.props.customerReviews };

    this.querySelector('picture-responsive')
      .setAltImage(`Restoran ${this.props.name}`)
      .setDefaultImage(this.props.image.md)
      .addBreakpoint('400px', 'image/jpg', this.props.image.sm);
  }
}

Component.register('resto-detail-desc', RestaurantDetailDescription);
