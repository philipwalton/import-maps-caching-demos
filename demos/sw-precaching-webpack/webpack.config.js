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

const path = require('upath');
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './common/src/main.mjs',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../public/sw-precaching-webpack'),
  },
  plugins: [
    // See the docs for config options details:
    // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    new GenerateSW({
      // Options for the demo.
      clientsClaim: true,
      skipWaiting: true,
      inlineWorkboxRuntime: true,

      // Additional option unrelated to the demo, but used to follow good
      // service worker performance best practices. See:
      // https://developers.google.com/web/updates/2017/02/navigation-preload
      navigationPreload: true,
      runtimeCaching: [{
        urlPattern: '/sw-precaching-webpack/',
        handler: 'NetworkFirst',
        options: {
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      }],
    }),
  ],
  devtool: 'source-map',
};
