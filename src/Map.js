var PIXI = require('pixi.js');

/**
 * Map
 * @constructor
 */
var Map = function() {

    PIXI.Container.call(this);

    this.tilesets = [];

};

Map.prototype = Object.create(PIXI.Container.prototype);

module.exports = Map;