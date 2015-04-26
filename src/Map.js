/**
 * Map
 * @constructor
 */
var Map = function()
{
    PIXI.Container.call(this);

    this.layers = {};

    this.tilesets = [];
};

Map.prototype = Object.create(PIXI.Container.prototype);

Map.prototype.getLayerByName = function(name)
{
    return this.layers[name];
};

module.exports = Map;