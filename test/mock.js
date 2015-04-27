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