var Map = require('./Map');
var Tileset = require('./Tileset');
var Layer = require('./Layer');
var path = require('path');

module.exports = function() {

    return function (resource, next) {

        // early exit if it is not the right type
        if (!resource.data.layers || !resource.data.tilesets) {
            return next();
        }

        // tileset image paths are relative so we need the root path
        var root = path.dirname(resource.url);

        var data = resource.data;

        var map = new Map(data);

        var toLoad = 0;

        data.tilesets.forEach(function (tilesetData) {

            toLoad++;

            var src = path.join(root, tilesetData.image);

            var baseTexture = PIXI.BaseTexture.fromImage(src);

            var tileset = new Tileset(tilesetData, baseTexture);

            // update the textures once the base texture has loaded
            baseTexture.once('loaded', function () {
                toLoad--;
                tileset.updateTextures();
                if (toLoad <= 0) {
                    next();
                }
            });

            map.tilesets.push(tileset);
        });

        data.layers.forEach(function (layerData) {

            var layer = new Layer(layerData, map.tilesets, data.tilewidth, data.tileheight);

            map.layers[layer.name] = layer;

            map.addChild(layer);
        });

        resource.tiledMap = map;
    };
};