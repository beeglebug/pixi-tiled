/**
 * Tile
 * @constructor
 */
var Tile = function(gid, texture)
{
    PIXI.Sprite.call(this, texture);

    this.gid = gid;
};

Tile.prototype = Object.create(PIXI.Sprite.prototype);

module.exports = Tile;