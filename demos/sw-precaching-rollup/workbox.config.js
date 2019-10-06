/*
 Copyright 2019 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// See the docs for config options details:
// https://developers.google.com/web/tools/workbox/modules/workbox-cli#configuration
module.exports = {
  // Main options to set up precaching of JavaScript modules
  globDirectory: 'public/sw-precaching-rollup',
  globPatterns: ['**/*.mjs'],
  swDest: 'public/sw-precaching-rollup/sw.js',

  // Switch this to production for deploying for real.
  // Set to 'development' for demonstration purposes.
  mode: 'development',

  // Additional option unrelated to the demo, but used to follow good
  // service worker performance best practices. See:
  // https://developers.google.com/web/updates/2017/02/navigation-preload
  clientsClaim: true,
  skipWaiting: true,
  inlineWorkboxRuntime: true,
  navigationPreload: true,
  runtimeCaching: [{
    urlPattern: '/sw-precaching-rollup/',
    handler: 'NetworkFirst',
    options: {
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  }],
};
