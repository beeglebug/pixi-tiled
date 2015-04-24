var PIXI = require('pixi.js');

/**
 * Layer
 * @constructor
 */
var Layer = function(layerData, tilesets, tileWidth, tileHeight)
{
    PIXI.Container.call(this);

    this.data = layerData.data;

    this.alpha = layerData.opacity;

    this.generateSprites(layerData.width, layerData.height, tileWidth, tileHeight, tilesets);
};

Layer.prototype = Object.create(PIXI.Container.prototype);

/**
 * generate the map tiles
 */
Layer.prototype.generateSprites = function(width, height, tileWidth, tileHeight, tilesets)
{
    var x, y, i, id, texture, sprite;

    for ( y = 0; y < height; y++ ) {

        for ( x = 0; x < width; x++ ) {

            i = x + (y * width);

            id = this.data[i];

            // 0 sprite is a gap
            if ( id !== 0 ) {

                texture = this.findTexture(id, tilesets);

                sprite = new PIXI.Sprite(texture);

                sprite.x = x * tileWidth;
                sprite.y = y * tileHeight;

                this.addChild(sprite);
            }
        }
    }
};

Layer.prototype.findTexture = function(id, tilesets)
{
    var tileset, i, ix;

    for ( i = tilesets.length - 1; i >= 0; i-- ) {
        tileset = tilesets[i];
        if(tileset.firstGID <= id) { break; }
    }

    ix = id - tileset.firstGID;

    return tileset.textures[ix];
};

module.exports = Layer;