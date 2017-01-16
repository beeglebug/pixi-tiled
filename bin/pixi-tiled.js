(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var tiledMapParser = require('./src/tiledMapParser');

// attach the parser to the global pixi scope
PIXI.loaders.Loader.addPixiMiddleware(tiledMapParser);
PIXI.loader.use(tiledMapParser());

module.exports = {

    tiledMapParser : tiledMapParser,
    Tileset : require('./src/Tileset'),
    TiledMap : require('./src/TiledMap'),
    Layer : require('./src/Layer'),
    Tile : require('./src/Tile')
};
},{"./src/Layer":5,"./src/Tile":6,"./src/TiledMap":7,"./src/Tileset":8,"./src/tiledMapParser":9}],2:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],3:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":4}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
/**
 * Tile
 * @constructor
 */
var Tile = function(gid, texture)
{
    PIXI.Sprite.call(this, texture);

    this.gid = gid;

    // tiled always anchors sprites bottom left
    this.anchor.set(0,1);
};

Tile.prototype = Object.create(PIXI.Sprite.prototype);

module.exports = Tile;
},{}],7:[function(require,module,exports){
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
    if(this.layers[name] !== undefined) {
        return this.layers[name];
    }

    return null;
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
},{}],8:[function(require,module,exports){
var util = require('./util');

/**
 * Tileset
 * @constructor
 */
var Tileset = function (data, texture) {

    this.baseTexture = texture;
    this.textures = [];

    this.name = data.name;
    this.firstGID = data.firstgid;
    this.imageHeight = data.imageheight;
    this.imageWidth = data.imagewidth;
    this.tileHeight = data.tileheight;
    this.tileWidth = data.tilewidth;
    this.margin = data.margin;
    this.spacing = data.spacing;
    // @todo data.properties?

    var x, y;

    // warn when sizing is mismatched
    if(
        (this.imageWidth - (2*this.margin)) % (this.tileWidth + this.spacing) !== this.spacing ||
        (this.imageHeight - (2*this.margin)) % (this.tileHeight + this.spacing) !== this.spacing
    ) {
        util.warn('pixi-tiled: tileset image dimensions do not match tileset data');
    }

    // create textures (invalid until baseTexture loaded)
    for (y = this.margin; y < this.imageHeight; y += this.tileHeight + this.spacing) {

        for (x = this.margin; x < this.imageWidth; x += this.tileWidth + this.spacing) {

            this.textures.push(
                new PIXI.Texture(this.baseTexture)
            );
        }
    }

    this.tiles = {};
};

/**
 * update the frames of the textures
 */
Tileset.prototype.updateTextures = function () {

    var texture, frame, x, y, i = 0;

    for (y = this.margin; y < this.imageHeight; y += this.tileHeight + this.spacing) {

        for (x = this.margin; x < this.imageWidth; x += this.tileWidth + this.spacing) {

            texture = this.textures[i];
            frame = texture.frame;

            frame.width = this.tileWidth;
            frame.height = this.tileHeight;
            frame.x = x;
            frame.y = y;

            // trim to fit to avoid errors
            // only caused by mismatched images/data
            if(frame.x + frame.width > this.baseTexture.width) {
                frame.width = (this.baseTexture.width - frame.x);
            }

            if(frame.y + frame.height > this.baseTexture.height) {
                frame.height = (this.baseTexture.height - frame.y);
            }

            // force UV update
            texture.frame = frame;

            i++;
        }
    }
};

module.exports = Tileset;

},{"./util":10}],9:[function(require,module,exports){
var TiledMap = require('./TiledMap');
var Tileset = require('./Tileset');
var Layer = require('./Layer');
var Tile = require('./Tile');
var path = require('path');
var util = require('./util');

module.exports = function() {

    /**
     * find the texture for a given tile from the array of tilesets
     */
    function findTilesetAndTexture(gid, tilesets)
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

		  return {"tileset": tileset, "texture":tileset.textures[ix]};
    }

	 /**
	  * Computes the x coordinate by considering all possible configuration options of tiled
	  * render order: right-down
	  * */
	 function computeXCoordinate(i, j, tilewidth, orientation, staggerindex)
	 {

	 		orientation = typeof orientation !== 'undefined' ? orientation : 'orthogonal';
	 		staggerindex = typeof staggerindex !== 'undefined' ? staggerindex : 'odd';
	 		var x;

			x = i * tilewidth;

			if ( 'staggered' === orientation ){

				if ( 'odd' === staggerindex ){

					x += (j % 2 != 0) ? tilewidth / 2 : 0;
					
				} else {

					x += (j % 2 == 0) ? tilewidth / 2 : 0;

				}
			}

			return x;
	 }

	 /**
	  * Computes the y coordinate by considering all possible configuration options of tiled
	  * render order: right-down
	  * */
	 function computeYCoordinate(j, tileheight_map, tileheight_tile, orientation)
	 {
	 		orientation = typeof orientation !== 'undefined' ? orientation : 'orthogonal';

			var y;

			if ( 'staggered' === orientation ){

				y = j * (tileheight_map / 2) - (tileheight_tile - tileheight_map);

			} else {

				y = j * tileheight_map;

			}

            // move each tile down to accomodate the bottom left tile anchor
            // this keeps the map itself top left anchored at 0,0
            y += tileheight_map;

			return y;
	 }

     function base64ToGids(src) {
         while (src.length % 4 != 0) {
            src = subject + "=";
         }
         var bytes = require('base64-js').toByteArray(src);
         var length = bytes.length;
         var gids = []

         for (var i =0; i< length; i+= 4) {
             var val = 0;

             if (i + 2 < length)
                 val = bytes[i+ 2] << 16;

             if (i + 1 < length)
                 val |= bytes[i + 1] << 8;

             val |= bytes[i];

             if (i+ 3 < length)
                 val = val + (bytes[i + 3] << 24 >>> 0);

             gids.push(val & 0x80000000 ? (0xffffffff - val + 1) * -1 : val)
         }

         return gids
     }

    return function (resource, next) {

        // early exit if it is not the right type
        if (!resource.data || !resource.isJson || !resource.data.layers || !resource.data.tilesets) {
            return next();
        }

        // tileset image paths are relative so we need the root path
        var root = path.dirname(resource.url);

        var data = resource.data;

        var map = new TiledMap(data);

        var toLoad = 0;

        data.tilesets.forEach(function (tilesetData) {

            toLoad++;

            var src = path.join(root, tilesetData.image);

            var baseTexture = PIXI.BaseTexture.fromImage(src);

            var tileset = new Tileset(tilesetData, baseTexture);

            // update the textures once the base texture has loaded
            baseTexture.once('loaded', function () {
                toLoad--;
                tileset.updateTextures();
                if (toLoad <= 0) {
                    next();
                }
            });

            map.tilesets.push(tileset);

            var id, i, p, tile, shapeData, shapes, shape, points;

            for(id in tilesetData.tiles) {

                tile = tilesetData.tiles[id];

                for(i = 0; i < tile.objectgroup.objects.length; i++) {

                    shapeData = tile.objectgroup.objects[0];

                    shapes = [];

                    if (shapeData.polygon) {

                        points = [];

                        for (p = 0; p < shapeData.polygon.length; p++) {
                            points.push(shapeData.polygon[p].x + shapeData.x);
                            points.push(shapeData.polygon[p].y + shapeData.y);
                        }

                        shape = new PIXI.Polygon(points);

                    } else if (shapeData.ellipse) {

                        shape = new PIXI.Circle(shapeData.x, shapeData.y, shapeData.height / 2);

                    } else {

                        shape = new PIXI.Rectangle(shapeData.x, shapeData.y, shapeData.width, shapeData.height);

                    }

                    shapes.push(shape);
                }

                // object data id is 1 lower than gid for some reason
                tileset.tiles[+id + 1] = {
                    collision: shapes
                };
            }
        });

        data.layers.forEach(function (layerData) {

            var layer = new Layer(layerData.name, layerData.opacity);

            switch(layerData.type) {

                case 'imagelayer':
                    var mapTexture = PIXI.Sprite.fromImage(layerData.image);
                    layer.addChild(mapTexture);
                    break;
                case 'objectlayer':
                    return util.warn('pixi-tiled: object layers currently unsupported');
                case 'tilelayer':

                    if(layerData.compression) {
                        return util.warn('pixi-tiled: compressed layer data currently unsupported');
                    }

					// decode base64 if it is encoded
					if('base64' === layerData.encoding){
                        layerData.data = base64ToGids(layerData.data);
					}

					// generate tiles for the layer
					var x, y, i, gid, texture, tile;

					for ( y = 0; y < layerData.height; y++ ) {

						 for ( x = 0; x < layerData.width; x++ ) {

							  i = x + (y * layerData.width);

							  gid = layerData.data[i];

							  // 0 is a gap
							  if ( gid !== 0 ) {

									tilesetAndTexture = findTilesetAndTexture(gid, map.tilesets);
									texture = tilesetAndTexture.texture;

									tile = new Tile(gid, texture);

									tile.x = computeXCoordinate(x, y, data.tilewidth, data.orientation, data.staggerindex);
									tile.y = computeYCoordinate(y, data.tileheight, tilesetAndTexture.tileset.imageHeight, data.orientation);

									layer.addChild(tile);
							  }
						 }
					}
				}

            // add to map
            map.layers[layer.name] = layer;
            map.addChild(layer);
        });

        resource.tiledMap = map;
    };
};

},{"./Layer":5,"./Tile":6,"./TiledMap":7,"./Tileset":8,"./util":10,"base64-js":2,"path":3}],10:[function(require,module,exports){
(function (global){
var console;

if (typeof global !== "undefined" && global.console) {
    console = global.console;
} else if (typeof window !== "undefined" && window.console) {
    console = window.console;
} else {
    console = {
        warn : function(){}
    };
}

module.exports = {

    warn : function(message) {

        return console.warn(message);
    }
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
