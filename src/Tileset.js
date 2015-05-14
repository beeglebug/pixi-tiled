/**
 * Tileset
 * @constructor
 */
var Tileset = function(data, texture) {

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

    // create textures (invalid until baseTexture loaded)
	for ( y = this.margin; y < this.imageHeight; y += this.tileHeight + this.spacing ) {

        for ( x = this.margin; x < this.imageWidth; x += this.tileWidth + this.spacing ) {

            this.textures.push(
                new PIXI.Texture( this.baseTexture )
            );
        }
    }
};

/**
 * update the frames of the textures
 */
Tileset.prototype.updateTextures = function() {

    var texture, frame, x, y, i = 0;

	for ( y = this.margin; y < this.imageHeight; y += this.tileHeight + this.spacing ) {

		for ( x = this.margin; x < this.imageWidth; x += this.tileWidth + this.spacing ) {

            texture = this.textures[i];
            frame = texture.frame;

            frame.width = this.tileWidth;
            frame.height = this.tileHeight;
            frame.x = x;
            frame.y = y;

            // force UV update
            texture.frame = frame;

            i++;
        }
    }
};

module.exports = Tileset;
