import error404 from '@img/assets/404.svg';
import Component from '../lib/Component';
import Message from '../lib/Message';

export default class NotFoundPage extends Message {
  constructor() {
    super();
    document.title = 'Not Found - Suka Makan';

    this.state = {
      image: error404,
      imageAlt: 'Kosong',
      title: 'Oops.. Sepertinya kamu nyasar',
      subTitle: 'Halaman yang kamu tuju, tidak ditemukan',
    };
  }
}

Component.register('not-found-page', NotFoundPage);
