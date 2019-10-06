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

        let fromURL = baseURL + fileName;
        let toURL = baseURL + newFilename;

        // Create another version of each asset with the hash in the filename.
        this.emitFile({
          type: 'asset',
          fileName: newFilename,
          source: assetInfo.code,
        });

        // Map `main-nomap` to `main-map` for Import Maps feature detection.
        if (assetInfo.name === 'main-map') {
          fromURL = `${baseURL}main-nomap.mjs`;
          toURL = `${baseURL}main-map-${revision}.mjs`;
        }
        if (assetInfo.name !== 'main-nomap') {
          importmap.imports[fromURL] = toURL;
        }
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
  input: [
    './common/src/main-map.mjs',
    './common/src/main-nomap.mjs',
  ],
  output: {
    dir: './public/import-maps-native',
    format: 'es',
    entryFileNames: '[name].mjs',
    chunkFileNames: '[name].mjs',
    sourcemap: true,
  },
  plugins: [
    importmapPlugin(),
  ],
};
