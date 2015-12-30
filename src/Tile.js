/**
 * Tile
 * @constructor
 */
var Tile = function(gid, texture)
{
    PIXI.Sprite.call(this, texture);

    this.gid = gid;

    // tiled always anchors sprites bottom left
    this.anchor.set(0,1);
};

Tile.prototype = Object.create(PIXI.Sprite.prototype);

module.exports = Tile;