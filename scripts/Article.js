function Article(e, t, n, r, i) {
    this.id = e;
    this.friends = [];
    if (!t) {
        for (var s = 0; s < Math.random() * 6; s++) {
            this.friends.push(Math.floor(Math.random() * r))
        }
    }
    var o = this.initPosition(e, t, n);
    var t = o[0];
    var n = o[1];
    var u = o[2];
    this.x = t;
    this.y = n;
    this.z = u;
    this.c = i
}

function rgbToHex(e, t, n) {
    return toHex(e) + toHex(t) + toHex(n)
}

function toHex(e) {
    e = parseInt(e, 10);
    if (isNaN(e)) return "00";
    e = Math.max(0, Math.min(e, 255));
    return "0123456789ABCDEF".charAt((e - e % 16) / 16) + "0123456789ABCDEF".charAt(e % 16)
}
Article.prototype.getX = function() {
    return this.x
};
Article.prototype.getY = function() {
    return this.y
};
Article.prototype.getZ = function() {
    return this.z
};
Article.prototype.setX = function(e) {
    this.x = e
};
Article.prototype.setY = function(e) {
    this.y = e
};
Article.prototype.setZ = function(e) {
    this.z = e
};
Article.prototype.setCategory = function(e) {
    this.c = e
};
Article.prototype.getCategory = function() {
    return this.c
};
Article.prototype.setColor = function(e) {
    this.color = e
};
Article.prototype.getColor = function() {
    return this.color
};
Article.prototype.getId = function() {
    return this.id
};
Article.prototype.getFriends = function() {
    return this.friends
};
Article.prototype.addFriend = function(e) {
    var t = false;
    $.each(this.friends, function(n, r) {
        if (r === e) t = true
    });
    if (!t) this.friends.push(e)
};
Article.prototype.addFriends = function(e) {
    for (var t = 0; t < e.length; t++) this.addFriend(e[t])
};
Article.prototype.getFriend = function(e) {
    return this.friends[e]
};
Article.prototype.cleanse = function() {
    this.friends.length = 0
};
Article.prototype.initPosition = function(e, t, n) {
    var r = t,
        i = n,
        s;
    var o = Math.sqrt(t * t + n * n);
    s = 30 * (.1 + e % 9) * (1 - Math.random() * 2) * (.1 + Math.random() / (10 + o) * 10);
    var u = o / 400 + Math.abs(s) / 800 + Math.PI / 2;
    r = t * Math.cos(u) - n * Math.sin(u);
    i = t * Math.sin(u) + n * Math.cos(u);
    return [r, i, s]
}