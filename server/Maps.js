module.exports = Maps;

function Maps (directory) {
    this.directory  = directory;
    this.maps       = {};
}

Maps.prototype.get = function (name, callback) {
    name = name.toLowerCase();
    
    if(typeof(this.maps[name]) === "object") {
        callback(this.maps[name]);
        return;
    }

    // load and store the map info
    tmx.parseFile(this.directory + name + ".tmx", function(err, map) {
        if (err) {
            callback(false);
            return;
        }
        
        this.maps[name] = map;
        
        callback(map);
        return;
    });
}