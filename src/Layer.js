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

Layer.prototype.getTilesByGid = function(gid)
{
    return this.children.filter(function(tile) {
        return tile.gid == gid;
    });
};

module.exports = Layer;