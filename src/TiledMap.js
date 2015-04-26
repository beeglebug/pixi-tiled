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
    var tiles = [];

    this.children.forEach(function(layer) {
        tiles = tiles.concat(layer.getTilesByGid(gids));
    });

    return tiles;
};

module.exports = TiledMap;