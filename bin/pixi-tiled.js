(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {

    tiledParser : require('./src/tiledParser'),
    Tileset : require('./src/Tileset'),
    Map : require('./src/Map'),
    Layer : require('./src/Layer'),
    Tile : require('./src/Tile')

};
},{"./src/Layer":2,"./src/Map":3,"./src/Tile":4,"./src/Tileset":5,"./src/tiledParser":6}],2:[function(require,module,exports){
/**
 * Layer
 * @constructor
 */
var Layer = function() {

};

module.exports = Layer;
},{}],3:[function(require,module,exports){
/**
 * Map
 * @constructor
 */
var Map = function() {

};

module.exports = Map;
},{}],4:[function(require,module,exports){
/**
 * Tile
 * @constructor
 */
var Tile = function() {

};

module.exports = Tile;
},{}],5:[function(require,module,exports){
/**
 * Tileset
 * @constructor
 */
var Tileset = function() {

};

module.exports = Tileset;
},{}],6:[function(require,module,exports){
module.exports = function ()
{
    return function (resource, next)
    {
        // do parsing

        next();
    };
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9MYXllci5qcyIsInNyYy9NYXAuanMiLCJzcmMvVGlsZS5qcyIsInNyYy9UaWxlc2V0LmpzIiwic3JjL3RpbGVkUGFyc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICB0aWxlZFBhcnNlciA6IHJlcXVpcmUoJy4vc3JjL3RpbGVkUGFyc2VyJyksXG4gICAgVGlsZXNldCA6IHJlcXVpcmUoJy4vc3JjL1RpbGVzZXQnKSxcbiAgICBNYXAgOiByZXF1aXJlKCcuL3NyYy9NYXAnKSxcbiAgICBMYXllciA6IHJlcXVpcmUoJy4vc3JjL0xheWVyJyksXG4gICAgVGlsZSA6IHJlcXVpcmUoJy4vc3JjL1RpbGUnKVxuXG59OyIsIi8qKlxuICogTGF5ZXJcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgTGF5ZXIgPSBmdW5jdGlvbigpIHtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMYXllcjsiLCIvKipcbiAqIE1hcFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZhciBNYXAgPSBmdW5jdGlvbigpIHtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXA7IiwiLyoqXG4gKiBUaWxlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmFyIFRpbGUgPSBmdW5jdGlvbigpIHtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaWxlOyIsIi8qKlxuICogVGlsZXNldFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZhciBUaWxlc2V0ID0gZnVuY3Rpb24oKSB7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZXNldDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpXG57XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNvdXJjZSwgbmV4dClcbiAgICB7XG4gICAgICAgIC8vIGRvIHBhcnNpbmdcblxuICAgICAgICBuZXh0KCk7XG4gICAgfTtcbn07Il19
