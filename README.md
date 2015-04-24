# pixi-tiled

Import [Tiled](http://www.mapeditor.org/) maps into pixi v3.

## installation

```
npm install pixi-tiled
```

## usage

```
var PIXI = require('pixi.js');
var pixiTiled = require('pixi-tiled');

var loader = new PIXI.loaders.Loader();

loader.use(pixiTiled.tiledMapParser);

loader.add('map.json', function(res) {

    var map = res.tiledMap;
    
});

loader.load();
```