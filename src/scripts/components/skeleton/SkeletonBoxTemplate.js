import Component from '../../lib/Component';

export default class SkeletonBoxTemplate extends Component {
  render() {
    this.classList.add('template');
  }
}

Component.register('skeleton-template-box', SkeletonBoxTemplate);
