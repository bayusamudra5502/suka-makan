import searchEmpty from '@img/assets/empty.png';
import Component from '../lib/Component';
import Message from '../lib/Message';

export default class SearchEmpty extends Message {
  constructor() {
    super();

    this.state = {
      image: searchEmpty,
      imageAlt: 'Kosong',
      title: 'Yah..',
      subTitle: 'Tidak ada hasil yang ditemukan',
    };
  }
}

Component.register('search-empty', SearchEmpty);
