import searchMessage from '@img/assets/search-message.png';
import Component from '../../lib/Component';
import Message from '../templates/Message';

export default class SearchMessage extends Message {
  constructor() {
    super();

    this.state = {
      image: searchMessage,
      imageAlt: 'Pencarian',
      title: 'Masukan Kata Kunci',
      subTitle: 'Untuk memulai pencarian',
    };
  }
}

Component.register('search-message', SearchMessage);
