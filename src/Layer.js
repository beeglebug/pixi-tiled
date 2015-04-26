/**
 * Layer
 * @constructor
 */
var Layer = function(name, alpha)
{
    PIXI.Container.call(this);

    this.name = name;

    this.alpha = alpha;
};

Layer.prototype = Object.create(PIXI.Container.prototype);

Layer.prototype.getTilesById = function(id)
{

};

module.exports = Layer;