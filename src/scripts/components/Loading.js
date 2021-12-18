import cookwareImg from '@img/assets/cookware.png';
import Component from '../lib/Component';
import Message from '../lib/Message';

export default class LoadingComponent extends Message {
  constructor() {
    super();

    this.state = {
      image: cookwareImg,
      imageAlt: 'Loading',
      title: 'Memuat Data...',
      subTitle: 'Tunggu sebentar ya, kita sedang meracik semuanya',
    };
  }
}

Component.register('loading-component', LoadingComponent);
