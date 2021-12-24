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

describe('Making a movie is not favorite', () => {
  beforeEach(async () => {
    Toast.register(new ToastContainer(ToastComponent));
    const favoriteButton = new FavoriteButton(FavoriteModel);
    favoriteButton.buttonImage = {
      favoriteIcon: '',
      notFavoriteIcon: '',
    };

    favoriteButton.data = DUMMY_DATA;
    favoriteButton.isFavorite = true;
    document.body.appendChild(favoriteButton);

    await FavoriteModel.clearFavorite();
  });

  afterEach((done) => {
    document.body.innerHTML = '';
    done();
  });

  it('should able to remove the movie from favorite', async () => {
    await FavoriteModel.addFavorite(DUMMY_DATA);
    spyOn(Toast, 'showSuccess').and.callThrough();
    spyOn(FavoriteModel, 'addFavorite').and.callThrough();

    const button = document.body.querySelector('button');
    button.click();

    const result = await FavoriteModel.getFavorites();

    expect(Toast.showSuccess).toHaveBeenCalledTimes(1);
    expect(result.length).toBe(0);
  });

  it('should not throw an error and give feedback as success when id is not available', async () => {
    spyOn(Toast, 'showSuccess').and.callThrough();

    const button = document.body.querySelector('button');
    button.click();

    const result = await FavoriteModel.getFavorites();

    expect(Toast.showSuccess).toHaveBeenCalledTimes(1);
    expect(result.length).toBe(0);
  });

  it('should able to remove movie with identical id but data in the database and input different', async () => {
    spyOn(Toast, 'showSuccess').and.callThrough();

    document.body.querySelector('favorite-button').data = {
      id: 1,
      name: 'Different Data',
    };

    const button = document.body.querySelector('button');
    button.click();

    const result = await FavoriteModel.getFavorites();

    expect(Toast.showSuccess).toHaveBeenCalledTimes(1);
    expect(result.length).toBe(0);
  });
});
