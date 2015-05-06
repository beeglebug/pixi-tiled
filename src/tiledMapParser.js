var TiledMap = require('./TiledMap');
var Tileset = require('./Tileset');
var Layer = require('./Layer');
var Tile = require('./Tile');
var path = require('path');

module.exports = function() {

    /**
     * find the texture for a given tile from the array of tilesets
     */
    function findTexture(gid, tilesets)
    {
        var tileset, i, ix;

        // go backwards through the tilesets
        // find the first tileset with the firstGID lower that the one we want
        for ( i = tilesets.length - 1; i >= 0; i-- ) {
            tileset = tilesets[i];
            if(tileset.firstGID <= gid) { break; }
        }

        // calculate the internal position within the tileset
        ix = gid - tileset.firstGID;

        return tileset.textures[ix];
    }

    return function (resource, next) {

        // early exit if it is not the right type
        if (!resource.data || !resource.isJson || !resource.data.layers || !resource.data.tilesets) {
            return next();
        }

        // tileset image paths are relative so we need the root path
        var root = path.dirname(resource.url);

        var data = resource.data;

        var map = new TiledMap(data);

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

            var layer = new Layer(layerData.name, layerData.opacity);

            // generate tiles for the layer
            var x, y, i, gid, texture, tile;

            for ( y = 0; y < layerData.height; y++ ) {

                for ( x = 0; x < layerData.width; x++ ) {

                    i = x + (y * layerData.width);

                    gid = layerData.data[i];

                    // 0 is a gap
                    if ( gid !== 0 ) {

                        texture = findTexture(gid, map.tilesets);

                        tile = new Tile(gid, texture);

                        tile.x = x * data.tilewidth;
                        tile.y = y * data.tileheight;

                        layer.addChild(tile);
                    }
                }
            }

            // add to map
            map.layers[layer.name] = layer;

            map.addChild(layer);
        });

        resource.tiledMap = map;
    };
};