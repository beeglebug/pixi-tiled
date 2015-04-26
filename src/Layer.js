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

/**
 * find the texture for a given tile from the array of tilesets
 */
Layer.prototype.findTexture = function(id, tilesets)
{
    var tileset, i, ix;

    // go backwards through the tilesets
    // find the first tileset with the firstGID lower that the one we want
    for ( i = tilesets.length - 1; i >= 0; i-- ) {
        tileset = tilesets[i];
        if(tileset.firstGID <= id) { break; }
    }

    // calculate the internal position within the tileset
    ix = id - tileset.firstGID;

    return tileset.textures[ix];
};

module.exports = Layer;