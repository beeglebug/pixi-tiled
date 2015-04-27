# pixi-tiled [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Import [Tiled](http://www.mapeditor.org/) maps into pixi v3.

Uses the new loader middleware to intercept Tiled json maps and parse them into renderable objects.

The resulting Map object is an extension of PIXI.Container, with children representing each of the Tiled map layers.

## installation

```sh
npm install pixi-tiled
```

## usage

```js
var PIXI = require('pixi.js');
var pixiTiled = require('pixi-tiled');

/**
 * Simply load a Tiled map in json format
 * The map data will be loaded, parsed and a renderable Map object made available on res.tiledMap
 */
PIXI.loader.add('map.json', function(res)
{
    var map = res.tiledMap;
});

PIXI.loader.load();
```

[npm-url]: https://npmjs.org/package/pixi-tiled
[npm-image]: http://img.shields.io/npm/v/pixi-tiled.svg?style=flat

[travis-url]: http://travis-ci.org/beeglebug/pixi-tiled
[travis-image]: http://img.shields.io/travis/beeglebug/pixi-tiled/master.svg?style=flat
