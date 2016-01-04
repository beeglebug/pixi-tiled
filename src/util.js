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