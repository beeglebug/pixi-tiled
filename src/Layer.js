var Tile = require('./Tile');

/**
 * Layer
 * @constructor
 */
var Layer = function(layerData, tilesets, tileWidth, tileHeight)
{
    PIXI.Container.call(this);

    this.name = layerData.name;

    this.data = layerData.data;

    this.alpha = layerData.opacity;

    this.generateTiles(layerData.width, layerData.height, tileWidth, tileHeight, tilesets);
};

Layer.prototype = Object.create(PIXI.Container.prototype);

/**
 * generate the map tiles
 */
Layer.prototype.generateTiles = function(width, height, tileWidth, tileHeight, tilesets)
{
    var x, y, i, gid, texture, tile;

    for ( y = 0; y < height; y++ ) {

        for ( x = 0; x < width; x++ ) {

            i = x + (y * width);

            gid = this.data[i];

            // 0 is a gap
            if ( gid !== 0 ) {

                tile = new Tile(gid, tilesets);

                tile.x = x * tileWidth;
                tile.y = y * tileHeight;

                this.addChild(tile);
            }
        }
    }
};

Layer.prototype.getTilesById = function(id)
{

};

module.exports = Layer;