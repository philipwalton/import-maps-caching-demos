# Import Maps Caching Demos

Demos showing how to use [Import Maps](https://github.com/WICG/import-maps) (and similar technologies) to avoid the problems described in the article [Cascading Cache Invalidation](https://philipwalton.com/articles/cascading-cache-invalidation/).

🚀&nbsp;&nbsp;**[View demos on Glitch](https://import-maps-caching-demos.glitch.me/)**&nbsp;&nbsp;👉

## Building and running the app locally

To run the app locally, [clone](https://help.github.com/en/articles/cloning-a-repository) this repo and `npm install` all dependencies, then run the following command:

```sh
npm start
```

Or to build the app without running it, run:

```sh
npm run build
```

### Validating changes

To validate that source changes don't cause cascading cache invalidations, make a change to the source modules and rebuild the demos:

```sh
npm run build
```

After a rebuild, you can reload each demo and see which assets are served from cache and which assets are re-requested.
