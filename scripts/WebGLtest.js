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

function WebGLtest() {
    try {
        return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl")
    } catch (e) {
        return false
    }
}
if (!WebGLtest()) {
    console.log("NO WEBGL");
    $("#logotitle").fadeOut();
    $(".overlay").fadeIn();
    $("#noWebGL").fadeIn();
    $("#noWebGL").html("<center>Houston we have a problem. <br/><br/>This application relies on Javascript and webGL to function properly, it seems your browser is outdated and/or doesn't support WebGL.</br></br>For amazing 3D experiences, find out how to get WebGL over at <a href='http://get.webgl.org' class='warninglink'>http://get.webgl.org</a><br/><p>In the meantime, you can check out this youtube teaser:</p>" + '<iframe width="560" height="315" src="//www.youtube.com/embed/8G8d-umcvfg" frameborder="0" allowfullscreen></iframe></center>')
} else {
    console.log("WEBGL ENABLED")
}