var mock = require('./mock');
var expect = require('chai').expect;
var describe = require('mocha').describe;
var it = require('mocha').it;

var PIXI = require('pixi.js');
var pixiTiled = require('../index.js');

var parser = pixiTiled.tiledMapParser();

// fake it because we don't actually load the file
var resource = {
    isJson: true,
    data: require('./data/map.js'),
    url: './data/map.js'
};

var next = function () {};

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
            'test layer 0',
            'test layer 1',
            'test layer 2',
            'test layer 4',
            'test layer 3'
        ]);

        var layer = resource.tiledMap.getLayerByName('test layer 1');

        expect(layer).to.be.an.instanceOf(pixiTiled.Layer);
    });

    it('should parent layers', function () {

        var children = resource.tiledMap.children;

        expect(children).to.be.an('array');
        expect(children).to.have.length(5);
    });

    it('should create tiles', function () {

        var layer0 = resource.tiledMap.getLayerByName('test layer 0');
        var layer1 = resource.tiledMap.getLayerByName('test layer 1');
        var layer2 = resource.tiledMap.getLayerByName('test layer 2');
        var layer3 = resource.tiledMap.getLayerByName('test layer 3');
        var layer4 = resource.tiledMap.getLayerByName('test layer 4');

        expect(layer0.children).to.be.an('array');
        expect(layer0.children).to.have.length(1);

        expect(layer1.children).to.be.an('array');
        expect(layer1.children).to.have.length(0);

        expect(layer2.children).to.be.an('array');
        expect(layer2.children).to.have.length(9);

        expect(layer3.children).to.be.an('array');
        expect(layer3.children).to.have.length(0);

        expect(layer4.children).to.be.an('array');
        expect(layer4.children).to.have.length(7);

        var tile1 = layer2.children[0];
        var tile2 = layer2.children[4];

        expect(tile1).to.be.an.instanceOf(pixiTiled.Tile);
        expect(tile1.gid).to.equal(1);
        expect(tile2.gid).to.equal(2);

    });

    it('should decode base64 encrypted data', function() {

        var layer = resource.tiledMap.getLayerByName('test layer 4');

        expect(layer.children).to.satisfy(function(tiles) {
            return tiles.every(function(tile) {
                return tile instanceof pixiTiled.Tile;
            });
        });
    });



    
    it('should skip compressed layers', function () {

        var layer = resource.tiledMap.getLayerByName('compressed layer');

        expect(layer).to.be.null;
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
