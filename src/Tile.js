/**
 * Tile
 * @constructor
 */
var Tile = function(gid, tilesets)
{
    this.gid = gid;

    var texture = this.findTexture(gid, tilesets);

    PIXI.Sprite.call(this, texture);
};

Tile.prototype = Object.create(PIXI.Sprite.prototype);

/**
 * find the texture for a given tile from the array of tilesets
 */
Tile.prototype.findTexture = function(gid, tilesets)
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
};


module.exports = Tile;