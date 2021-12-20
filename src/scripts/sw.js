import 'regenerator-runtime';

import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim, setCacheNameDetails } from 'workbox-core';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { createHandlerBoundToURL } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';

import * as strategies from 'workbox-strategies';

import config from '../config.json';

const VERSION = '1.0.0';

setCacheNameDetails({
  prefix: 'suka-makan',
  suffix: `v${VERSION}`
});

precacheAndRoute(self.__WB_MANIFEST);
clientsClaim();

const handler = createHandlerBoundToURL('/index.html');
registerRoute(new NavigationRoute(handler, {
  blacklist: [
    '/static/'
  ]
}))

registerRoute(
  new RegExp('^/static/'),
  new strategies.CacheFirst()
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new strategies.StaleWhileRevalidate({
    cacheName: `google-font-v${VERSION}`
  })
)

registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new strategies.CacheFirst({
    cacheName: `google-font-v${VERSION}`,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'script' ||
    request.destination === 'style',
  new strategies.StaleWhileRevalidate({
    cacheName: `suka-makan-third-v${VERSION}`
  })
);

registerRoute(
  ({ url }) => url.origin === config.endpoint
    && new RegExp('^/search').test(url.pathname),
  new strategies.NetworkOnly()
)

registerRoute(
  ({ url }) => url.origin === config.endpoint
    && new RegExp('^/image').test(url.pathname),
  new strategies.StaleWhileRevalidate({
    cacheName: `suka-makan-endpoint-v${VERSION}`,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
        maxEntries: 100
      })
    ]
  })
)

registerRoute(
  ({ url }) => url.origin === config.endpoint,
  new strategies.NetworkFirst({
    cacheName: `suka-makan-endpoint-v${VERSION}`,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
        maxEntries: 1000
      })
    ]
  })
)

/* Handler saat ada update */
addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});