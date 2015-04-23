module.exports = function (resource, next)
{
    // bail out early
    if(!resource.layers || !resource.tilesets) {
        next();
    }

    console.log('looks like we got a tiled map');

    next();
};