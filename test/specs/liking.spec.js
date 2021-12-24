import FavoriteModel from '../../src/scripts/api/FavoriteModel';
import ToastContainer from '../../src/scripts/components/container/ToastContainer';
import FavoriteButton from '../../src/scripts/components/inputs/FavoriteButton';
import ToastComponent from '../../src/scripts/components/toast/ToastComponent';
import Toast from '../../src/scripts/lib/Toast';

const DUMMY_DATA = {
  id: 1,
  name: 'Testing Title',
  description: 'Description Title',
  image: {
    sm: 'https://example.com/image-small.png',
    md: 'https://example.com/image-medium.png',
    lg: 'https://example.com/image-large.png',
  },
  rating: 10,
};

describe('Make a movie as a favorite', () => {
  const model = FavoriteModel;

  beforeEach((done) => {
    document.body.innerHTML = '';
    Toast.register(new ToastContainer(ToastComponent));
    const button = new FavoriteButton(model);
    button.buttonImage = {
      favoriteIcon: '',
      notFavoriteIcon: '',
    };

    button.data = DUMMY_DATA;
    button.isFavorite = false;
    document.body.appendChild(button);

    FavoriteModel.clearFavorite().then(() => {
      done();
    });
  });

  it('should be able to insert only a movie to database', (done) => {
    spyOn(model, 'addFavorite').and.callThrough();

    const button = document.body.querySelector('button');

    button.click();

    expect(model.addFavorite).toHaveBeenCalledOnceWith(DUMMY_DATA);
    model.getFavorites().then((result) => {
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(DUMMY_DATA);
      done();
    }).catch(done.fail);
  });
});
