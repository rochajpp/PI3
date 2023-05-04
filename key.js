const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let key = "";
for(var i = 0; i < 22; i++){
    key = key + chars.charAt(Math.floor(Math.random() * chars.length));
}

module.exports = key;