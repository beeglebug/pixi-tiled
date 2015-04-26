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

module.exports = TiledMap;