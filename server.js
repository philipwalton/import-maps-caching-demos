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

const express = require('express');
const fs = require('fs-extra');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

nunjucks.configure({
  noCache: process.env.NODE_ENV !== 'production',
});

const app = express();

app.use(morgan('dev'));

// Add far-future expiry headers to revisioned assets.
// Note: this needs to be done before adding `express.static` below.
app.get(/-[0-9a-f]{10}.mjs/, (req, res, next) => {
  res.set('Cache-Control', 'max-age=31536000');
  next();
});

// Add a static file server for everything in the public directory.
app.use(express.static('public'));

// Respond to the root URL with a rendered templated
// (including data to render the import map).
app.get('/', (req, res) => {
  res.send(nunjucks.render(`demos/index.html`));
});

// Respond to the root URL with a rendered templated
// (including data to render the import map).
app.get('/:demo/', (req, res, next) => {
  const demo = req.params.demo;

  if (req.accepts('html') && fs.existsSync(`demos/${demo}`)) {
    let importmap;
    if (fs.existsSync(`public/${demo}/importmap.json`)) {
      importmap = fs.readFileSync(`public/${demo}/importmap.json`, 'utf-8');
    }

    res.send(nunjucks.render(`demos/${demo}/index.html`, {importmap}));
  } else {
    next();
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running:\nhttp://localhost:${listener.address().port}`);
});
