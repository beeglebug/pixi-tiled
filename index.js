var tiledMapParser = require('./src/tiledMapParser');

// attach the parser to the global pixi scope
PIXI.loaders.Loader.addPixiMiddleware(tiledMapParser);
PIXI.loader.use(tiledMapParser());

module.exports = {

    tiledMapParser : tiledMapParser,
    Tileset : require('./src/Tileset'),
    TiledMap : require('./src/TiledMap'),
    Layer : require('./src/Layer')

};