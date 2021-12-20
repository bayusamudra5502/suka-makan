import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';

import { Workbox } from 'workbox-window';

import AppContainer from './App';
import SkipToContent from './components/SkipToContent';
import ToastComponent from './components/ToastComponent';
import ToastContainer from './components/ToastContainer';
import RouteDictionary from './lib/RouteDictionary';
import Toast from './lib/Toast';
import UpdateToast from './components/UpdateToast';

const RouterDictObj = new RouteDictionary();

document.body.appendChild(new SkipToContent());
document.body.appendChild(new AppContainer(RouterDictObj));

const overlay = document.createElement('div');
overlay.className = 'overlay box-overlay hide';
document.body.appendChild(overlay);

Toast.register(new ToastContainer(ToastComponent));

if ('serviceWorker' in navigator) {
  const sw = new Workbox('/service-worker.js');

  sw.addEventListener('waiting', () => {
    Toast.showCustomToast(new UpdateToast({
      onAccepted() {
        sw.addEventListener('controlling', () => {
          window.location.reload();
        });

        sw.messageSkipWaiting();
      },
    }));
  });

  sw.register();
}
