/*
WikiGalaxy: a WebGL visualization of Wikipedia
Copyright (C) 2014 Owen Cornec

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function OrbitControl(e, t, n) {
    this.orbitercount = 0;
    var r = [];
    this.orbitClock = new THREE.Clock(true);
    var i;
    var s = new THREE.Geometry;
    var o, u, a;
    var f = new Array;
    for (var l = 0; l < t; l++) {
        a = Math.floor(Math.random() * n);
        if (e[a]) {
            u = new Orbiter(e[a], a);
            r.push(u);
            o = new THREE.Vector3(u.getX(), u.getY(), u.getZ());
            s.vertices.push(o);
            this.orbitercount++
        }
    }
    console.log(this.orbitercount + " bots added");
    var c = new THREE.PointCloudMaterial({
        color: 16777215,
        size: .7,
        map: THREE.ImageUtils.loadTexture("textures/dotbot.png"),
        blending: THREE.AdditiveBlending
    });
    c.alphaTest = .7;
    this.orbiters = r;
    var h = new THREE.PointCloud(s, c);
    this.orbiterSystem = h
}

function Orbiter(e, t) {
    this.speed = (1 - Math.random() * 2) * Math.sqrt(Math.abs(t) % 10 / 4) / 3;
    this.angle = 0;
    this.centerID = t;
    this.freeFloater = false;
    if (Math.random() > .9) this.freeFloater = true;
    if (e) {
        this.x = e.getX();
        this.y = e.getY() + .5 + Math.abs(t) % 10 / 50;
        this.z = e.getZ()
    } else {
        this.x = 0;
        this.y = 0;
        this.z = 0
    }
}
OrbitControl.prototype.getMesh = function() {
    return this.orbiterSystem
};
OrbitControl.prototype.updateAll = function(e) {
    var t = [0, 0, 0];
    var n;
    var r = this.orbitClock.getDelta();
    for (var i = 0; i < this.orbitercount; i++) {
        n = this.orbiters[i];
        t = n.getMotion(n.getID(), e[n.getID()], r);
        this.orbiterSystem.geometry.vertices[i].set(t[0], t[1], t[2])
    }
    this.orbiterSystem.geometry.verticesNeedUpdate = true
};
OrbitControl.prototype.makeColor = function(e) {
    function t(e, t, r) {
        return n(e) + n(t) + n(r)
    }

    function n(e) {
        e = parseInt(e, 10);
        if (isNaN(e)) return "00";
        e = Math.max(0, Math.min(e, 255));
        return "0123456789ABCDEF".charAt((e - e % 16) / 16) + "0123456789ABCDEF".charAt(e % 16)
    }
    var r = .047;
    var i = 160 + e;
    return "#" + t(Math.sin(r * i + 0) * 127 + 180, Math.sin(r * i + 2) * 127 + 180, Math.sin(r * i + 4) * 127 + 180)
};
Orbiter.prototype.getID = function() {
    return this.centerID
};
Orbiter.prototype.getX = function() {
    return this.x
};
Orbiter.prototype.getY = function() {
    return this.y
};
Orbiter.prototype.getZ = function() {
    return this.z
};
Orbiter.prototype.getMotion = function(e, t, n) {
    var r, i, s;
    var o = this.speed / 3;
    this.angle = -n * this.speed;
    if (e % 2 === 0) o = -o;
    if (this.freeFloater) {
        r = this.x + o;
        if (r > 400) r = -400;
        if (r < -400) r = 400;
        if (e % 3 === 0) i = this.y + o;
        else i = this.y - o;
        if (i > 400) i = -400;
        if (i < -400) i = 400;
        s = t.getZ()
    } else {
        r = t.getX() + (this.x - t.getX()) * Math.cos(this.angle) - (this.y - t.getY()) * Math.sin(this.angle);
        i = t.getY() + (this.x - t.getX()) * Math.sin(this.angle) + (this.y - t.getY()) * Math.cos(this.angle);
        s = t.getZ()
    }
    this.x = r;
    this.y = i;
    this.z = s;
    return [r, i, s]
}