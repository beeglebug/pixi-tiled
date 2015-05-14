var mock = require('./mock');
var expect = require('chai').expect;
var describe = require('mocha').describe;
var it = require('mocha').it;

var PIXI = require('pixi.js');
var pixiTiled = require('../index.js');

var parser = pixiTiled.tiledMapParser();

var resource = {
    data: require('./data/map.js')
};

var next = function () {};

// fake it because we don't actually load the file
resource.isJson = true;
parser(resource, next);

describe('parser', function() {

    it('should parse a map file', function () {

        expect(resource.tiledMap).to.exist;
        expect(resource.tiledMap).to.be.an.instanceOf(pixiTiled.TiledMap);
    });

    it('should create tilesets', function () {

        var tilesets = resource.tiledMap.tilesets;
        var tileset = tilesets[0];

        expect(tilesets).to.be.an('array');
        expect(tilesets).to.have.length(1);
        expect(tileset).to.be.an.instanceOf(pixiTiled.Tileset);
    });

    it('should create layers', function () {

        var layers = resource.tiledMap.layers;

        expect(layers).to.be.an('object');
        expect(layers).to.have.all.keys([
            'test layer 1',
            'test layer 2'
        ]);

        var layer = resource.tiledMap.getLayerByName('test layer 1');

        expect(layer).to.be.an.instanceOf(pixiTiled.Layer);
    });

    it('should parent layers', function () {

        var children = resource.tiledMap.children;

        expect(children).to.be.an('array');
        expect(children).to.have.length(2);
    });

    it('should create tiles', function () {

        var layer1 = resource.tiledMap.getLayerByName('test layer 1');
        var layer2 = resource.tiledMap.getLayerByName('test layer 2');

        expect(layer1.children).to.be.an('array');
        expect(layer1.children).to.have.length(0);

        expect(layer2.children).to.be.an('array');
        expect(layer2.children).to.have.length(9);

        var tile1 = layer2.children[0];
        var tile2 = layer2.children[4];

        expect(tile1).to.be.an.instanceOf(pixiTiled.Tile);
        expect(tile1.gid).to.equal(1);
        expect(tile2.gid).to.equal(2);

    });
});

describe('tileset', function() {

    it('should load collision shapes', function() {

        var tilesets = resource.tiledMap.tilesets;
        var tileset = tilesets[0];

        expect(tileset.tiles).to.be.an('object');
        expect(tileset.tiles).to.have.all.keys(["1","2","3"]);
        expect(tileset.tiles[1].collision).to.be.an('array');

        expect(tileset.tiles[1].collision).to.have.length(1);
        expect(tileset.tiles[2].collision).to.have.length(1);
        expect(tileset.tiles[3].collision).to.have.length(1);

        expect(tileset.tiles[1].collision[0]).to.be.instanceOf(PIXI.Polygon);
        expect(tileset.tiles[2].collision[0]).to.be.instanceOf(PIXI.Circle);
        expect(tileset.tiles[3].collision[0]).to.be.instanceOf(PIXI.Rectangle);

        expect(tileset.tiles[1].collision[0].points).to.have.length(6);
        expect(tileset.tiles[2].collision[0].radius).to.equal(4);
        expect(tileset.tiles[3].collision[0].width).to.equal(8);
        expect(tileset.tiles[3].collision[0].height).to.equal(8);
    });
});