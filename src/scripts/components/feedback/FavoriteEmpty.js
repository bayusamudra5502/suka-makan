import favoriteEmpty from '@img/assets/empty.png';
import Component from '../../lib/Component';
import Message from '../templates/Message';

export default class FavoriteEmpty extends Message {
  constructor() {
    super();

    this.state = {
      image: favoriteEmpty,
      imageAlt: 'Kosong',
      title: 'Oops..',
      subTitle: 'Nampaknya belum ada yang difavoritkan saat ini',
    };
  }
}

Component.register('favorite-empty', FavoriteEmpty);
