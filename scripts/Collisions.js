function Collisions() {
    this.INTERSECTED = null;
    this.LINK = null
}
Collisions.prototype.intersects = function(e, t, n, r) {
    var i = new THREE.Projector;
    var s = new THREE.Vector3(t, n, .5);
    i.unprojectVector(s, e);
    var o = new THREE.Ray(e.position, s.sub(e.position).normalize());
    var u = this.getIntersection(o, r);
    return u
};
Collisions.prototype.getIntersection = function(e, t) {
    var n = 99999999;
    var r = null;
    var i = 50;
    var s = 50;
    var o = 0;
    var u = [];
    for (var a = 0; a < t.geometry.vertices.length; a++) {
        var f = t.geometry.vertices[a];
        if (e.direction.x !== 0 && e.direction.y !== 0 && e.direction.z !== 0) {
            var l = (f.x - e.origin.x) / e.direction.x;
            if (l < 0) continue;
            var c = (f.y - e.origin.y) / e.direction.y;
            if (Math.abs(c - l) > s) continue;
            var h = (f.z - e.origin.z) / e.direction.z;
            if (Math.abs(h - l) > s) continue;
            if (n > l) {
                n = l;
                u.push(a);
                if (u.length > 6) {
                    u.shift()
                }
            }
        }
    }
    return u
};
Collisions.prototype.intersects2 = function(e, t, n, r) {
    vector = new THREE.Vector3(t, n, 1e-6);
    var i = 1e3;
    var s = new THREE.Projector;
    var o = new THREE.Raycaster;
    s.unprojectVector(vector, e);
    o.ray.set(e.position, vector.sub(e.position).normalize());
    intersects = o.intersectObject(r);
    if (intersects.length > 0) {
        for (var u = 0; u < intersects.length; u++) {
            if (intersects[u].distanceToRay < i) {
                i = intersects[u].distanceToRay;
                if (this.INTERSECTED != intersects[u].index) {
                    this.INTERSECTED = intersects[u].index
                }
            }
        }
    } else if (this.INTERSECTED !== null) {
        this.INTERSECTED = null
    }
    return this.INTERSECTED
};
Collisions.prototype.intersectsLink = function(e, t, n, r) {
    vector = new THREE.Vector3(t, n, 1e-6);
    var i = 1e3;
    var s = new THREE.Projector;
    var o = new THREE.Raycaster;
    s.unprojectVector(vector, e);
    o.ray.set(e.position, vector.sub(e.position).normalize());
    var u;
    intersects = o.intersectObjects(r.children);
    if (intersects.length > 0) {
        for (var a = 0; a < intersects.length; a++) {
            dist = Math.sqrt(intersects[a].point.x * intersects[a].point.x + intersects[a].point.y * intersects[a].point.y);
            if (dist < i) {
                i = dist;
                if (this.LINK != intersects[a].object.id) {
                    this.LINK = intersects[a].object.id
                }
            }
        }
    } else if (this.LINK !== null) {
        this.LINK = null
    }
    return this.LINK
};
Collisions.prototype.suggestionCoords = function(e, t) {
    var n = null;
    var r = [];
    for (i in t) {
        n = new THREE.Vector3(t[i]["x"], t[i]["y"], t[i]["z"]);
        screenCoord = this.toScreenXY(n, e, $("#suggestion" + i));
        r.push({
            x: screenCoord["x"],
            y: screenCoord["y"],
            id: t[i]["id"]
        })
    }
    return r
};
Collisions.prototype.toScreenXY = function(e, t, n) {
    var r = e.clone();
    projScreenMat = new THREE.Matrix4;
    projScreenMat.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse);
    r.applyProjection(projScreenMat);
    return {
        x: r.x * window.innerWidth / 2 + window.innerWidth / 2 + 15,
        y: -r.y * window.innerHeight / 2 + window.innerHeight / 2 - 12
    }
};
Collisions.prototype.findOffset = function(e) {
    var t = new Object;
    t.left = t.top = 0;
    if (e.offsetParent) {
        do {
            t.left += e.offsetLeft;
            t.top += e.offsetTop
        } while (e = e.offsetParent)
    }
    return t
}