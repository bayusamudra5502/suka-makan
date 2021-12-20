import offlineImg from '@img/assets/offline.png';
import Component from '../lib/Component';
import Message from '../lib/Message';

export default class OfflineMessage extends Message {
  constructor() {
    super();

    this.state = {
      image: offlineImg,
      imageAlt: 'Tidak Ada Jaringan',
      title: 'Sepertinya kamu sedang offline',
      subTitle: 'Kami tidak bisa menghubungi server saat ini',
    };
  }
}

Component.register('offline-message', OfflineMessage);
