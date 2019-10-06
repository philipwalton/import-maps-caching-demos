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

const fs = require('fs-extra');
const revHash = require('rev-hash');

/**
 * A Rollup plugin to generate a manifest of chunk names to their filenames
 * (including their content hash). This manifest is then used by the template
 * to point to the currect URL.
 * @return {Object}
 */
function importmapPlugin(baseURL = './') {
  const importmap = {imports: {}};
  return {
    name: 'importmap',
    generateBundle(options, bundle) {
      for (const [fileName, assetInfo] of Object.entries(bundle)) {
        const revision = revHash(assetInfo.code);
        const newFilename = `${assetInfo.name}-${revision}.mjs`;

        const fromURL = baseURL + fileName;
        const toURL = baseURL + newFilename;
        importmap.imports[fromURL] = toURL;
        assetInfo.fileName = newFilename;
      }

      this.emitFile({
        type: 'asset',
        fileName: 'importmap.json',
        source: JSON.stringify(importmap, null, 2),
      });
    },
  };
}

module.exports = {
  input: './common/src/main.mjs',
  output: {
    dir: './public/import-maps-systemjs',
    format: 'system',
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
    sourcemap: true,
  },
  plugins: [
    importmapPlugin(),
  ],
};
