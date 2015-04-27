// mocks to allow PIXI to boot
global.document = {
    createElement: function() {
        return {
            getContext: function() {
                return {
                    drawImage: function() {},
                    getImageData: function() { return { data : [] }; }
                };
            }
        };
    }
};
global.Image = function(){};
global.window = {};

var PIXI = require('pixi.js');
var pixiTiled = require('../index.js');
var expect = require('chai').expect;
var describe = require('mocha').describe;
var it = require('mocha').it;

describe('TiledMap', function() {

    var map = new pixiTiled.TiledMap();

    it('should have the right properties', function() {
        expect(map.layers).to.be.an('object');
        expect(map.tilesets).to.be.an('array');
        expect(map.tilesets).to.have.length(0);
    });
});