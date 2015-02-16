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

function Session() {
    var e = JSON.parse(window.localStorage.getItem("session"));
    if (e) {
        this.history = e["history"];
        this.position = e["position"];
        this.rotation = e["rotation"];
        this.previousState = e["previousState"];
        this.selectedArticle = e["selectedArticle"]
    } else {
        this.history = null;
        this.position = null;
        this.rotation = null;
        this.previousState = null;
        this.selectedArticle = null
    }
}
Session.prototype.update = function(e, t, n, r) {
    this.position = [e.position.x, e.position.y, e.position.z];
    this.rotation = [e.rotation.x, e.rotation.y, e.rotation.z];
    this.history = t;
    this.previousState = n;
    if (r) this.selectedArticle = r.getId();
    var i = "";
    i += JSON.stringify(this);
    window.localStorage.setItem("session", i)
};
Session.prototype.exists = function() {
    if (window.localStorage.getItem("session")) {
        return true
    } else {
        return false
    }
};
Session.prototype.getHistory = function() {
    return this.history
};
Session.prototype.getPosition = function() {
    return this.position
};
Session.prototype.getState = function() {
    return this.previousState
};
Session.prototype.getRotation = function() {
    return this.rotation
};
Session.prototype.getArticleId = function() {
    return this.selectedArticle
}