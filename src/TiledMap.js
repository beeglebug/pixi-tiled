/**
 * Map
 * @constructor
 */
var TiledMap = function()
{
    PIXI.Container.call(this);

    this.layers = {};

    this.tilesets = [];
};

TiledMap.prototype = Object.create(PIXI.Container.prototype);

TiledMap.prototype.getLayerByName = function(name)
{
    return this.layers[name];
};

TiledMap.prototype.getTilesByGid = function(gids)
{
    if(!Array.isArray(gids)) {
        gids = [gids];
    }

    var tiles = [];

    this.children.forEach(function(layer) {
        tiles = tiles.concat(layer.children.filter(function(tile) {
            return gids.indexOf(tile.gid) > -1;
        }));
    });

    return tiles;
};

module.exports = TiledMap;