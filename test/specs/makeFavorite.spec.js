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

describe('Making a restaurant as a favorite', () => {
  beforeEach(async () => {
    Toast.register(new ToastContainer(ToastComponent));
    const favoriteButton = new FavoriteButton(FavoriteModel);
    favoriteButton.buttonImage = {
      favoriteIcon: '',
      notFavoriteIcon: '',
    };

    favoriteButton.data = DUMMY_DATA;
    favoriteButton.isFavorite = false;
    document.body.appendChild(favoriteButton);

    await FavoriteModel.clearFavorite();
  });

  afterEach((done) => {
    document.body.innerHTML = '';
    done();
  });

  it('should be able to insert a restaurant to database', async () => {
    spyOn(FavoriteModel, 'addFavorite').and.callThrough();
    spyOn(Toast, 'showSuccess').and.callThrough();

    const button = document.body.querySelector('button');

    button.click();

    expect(FavoriteModel.addFavorite).toHaveBeenCalledOnceWith(DUMMY_DATA);
    const result = await FavoriteModel.getFavorites();

    expect(result.length).toBe(1);
    expect(Toast.showSuccess).toHaveBeenCalledTimes(1);
    expect(result[0]).toEqual(DUMMY_DATA);
  });

  it('should able to replace new restaurant data when same id exist', async () => {
    FavoriteModel.addFavorite({
      id: 1,
      name: 'Same data',
    });

    spyOn(FavoriteModel, 'addFavorite').and.callThrough();
    spyOn(Toast, 'showSuccess').and.callThrough();

    const button = document.body.querySelector('button');
    button.click();

    expect(FavoriteModel.addFavorite).toHaveBeenCalledTimes(1);
    expect(FavoriteModel.addFavorite).toHaveBeenCalledWith(DUMMY_DATA);

    const result = await FavoriteModel.getFavorites();

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(DUMMY_DATA);
  });

  it('should able to insert new restaurant when database not empty and id is not in database', async () => {
    FavoriteModel.addFavorite({
      id: 0,
      name: 'Same data',
    });

    FavoriteModel.addFavorite({
      id: 2,
      name: 'Other Data data',
    });

    spyOn(FavoriteModel, 'addFavorite').and.callThrough();
    const button = document.body.querySelector('button');
    button.click();

    expect(FavoriteModel.addFavorite).toHaveBeenCalledTimes(1);
    expect(FavoriteModel.addFavorite).toHaveBeenCalledWith(DUMMY_DATA);

    const result = await FavoriteModel.getFavorites();

    expect(result.length).toBe(3);
    expect(result[1]).toEqual(DUMMY_DATA);
  });

  it('should able to insert new restaurant when same id in database not longer available', async () => {
    await FavoriteModel.addFavorite({
      id: 1,
      name: 'Kumbang The Warrior',
    });

    const button = document.body.querySelector('button');
    button.click();

    let result = await FavoriteModel.getFavorites();

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(DUMMY_DATA);

    await FavoriteModel.deleteFavorite(1);
    result = await FavoriteModel.getFavorites();

    expect(result.length).toBe(0);
    document.querySelector('favorite-button').isFavorite = false;
    button.click();

    result = await FavoriteModel.getFavorites();

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(DUMMY_DATA);
  });
});
