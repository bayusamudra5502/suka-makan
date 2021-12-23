import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import { Workbox } from 'workbox-window';

import AppContainer from './App';
import SkipToContent from './components/sections/SkipToContent';
import ToastComponent from './components/toast/ToastComponent';
import ToastContainer from './components/container/ToastContainer';
import RouteDictionary from './lib/RouteDictionary';
import Toast from './lib/Toast';
import UpdateToast from './components/toast/UpdateToast';

function loadContent() {
  const RouterDictObj = new RouteDictionary();

  document.body.appendChild(new SkipToContent());
  document.body.appendChild(new AppContainer(RouterDictObj));

  const overlay = document.createElement('div');
  overlay.className = 'overlay box-overlay hide';
  document.body.appendChild(overlay);
}

function notificationRegister() {
  Toast.register(new ToastContainer(ToastComponent));
}

function swRegister() {
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
}

loadContent();
notificationRegister();
swRegister();
