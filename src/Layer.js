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

Layer.prototype.getTilesByGid = function(gids)
{
    if(!Array.isArray(gids)) {
        gids = [gids];
    }

    return this.children.filter(function(tile) {
        return gids.indexOf(tile.gid) > -1;
    });
};

module.exports = Layer;