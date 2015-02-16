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

window.onload = function() {
    function e() {
        function e() {
            var e = window.innerWidth / 2;
            var t = window.innerHeight / 2;
            l.aspect = window.innerWidth / window.innerHeight;
            l.updateProjectionMatrix();
            h.setSize(window.innerWidth, window.innerHeight)
        }

        function t(e) {
            e.preventDefault();
            F = e.clientX / window.innerWidth * 2 - 1;
            I = -(e.clientY / window.innerHeight) * 2 + 1;
            P = F;
            H = I;
            var t;
            var n;
            if (m.getSystem()) {
                if (j === "START") {
                    n = b.intersects(l, F, I, m.getSystem());
                    n = m.getTrueID(n);
                    m.setTargetPosition(e.clientX - window.innerWidth / 2, -e.clientY + window.innerHeight / 2);
                    if (n.length > 0) {
                        y.addSuggestions(n[0], n[1], F, I);
                        wikipediaAPI.fetchFive2(n[0])
                    } else {
                        y.hideSuggestions();
                        m.hideSuggestionSpheres(c);
                        m.resetTargetPosition()
                    }
                } else {
                    t = b.intersects2(l, F, I, m.getSystem())
                }
            }
            if (j !== "TO3D" && j !== "ORBIT" && j !== "CENTER" && j !== "START") {
                if (t) {
                    R = m.getArticleAtX(t);
                    wikipediaAPI.fetchName(R.getId(), R.getCategory());
                    wikipediaAPI.previewLinks(R, R.getId());
                    y.addLabel(F, I, R.getId());
                    m.showLinks(l.position.z, c, R, z, h)
                } else {
                    R = null;
                    y.hideLabel()
                }
            } else if (j === "CENTER" || j === "ORBIT") {
                n = b.intersectsLink(l, F, I, m.getLinksMesh());
                var r = m.identifyLink(n);
                if (r) {
                    U = r;
                    var i = m.getArticle(r);
                    wikipediaAPI.fetchName(r, i.getCategory());
                    y.addLabel(F, I, r);
                    m.setPreviewPosition(l, i.getX(), i.getY(), i.getZ(), j);
                    m.highLightLink(n, i.getCategory())
                } else {
                    U = null;
                    z = null;
                    y.hideLabel()
                }
            }
        }

        function s(e) {
            e.preventDefault();
            $("#searchvalue").blur();
            y.hideSuggestions();
            m.hideSuggestionSpheres(c);
            switch (e.which) {
                case 1:
                    if ($("#showhistory").prop("checked")) m.showHistory(c);
                    if (U) {
                        m.hideLinks(c);
                        _ = 20;
                        z = R.getId();
                        R.cleanse();
                        R = m.getArticle(U);
                        U = null;
                        if (j === "ORBIT") {
                            n(R.getId())
                        } else if (j === "CENTER") {
                            r(R.getId())
                        }
                    } else {
                        m.hideLinks(c);
                        z = null;
                        if (j === "START") {
                            f("MAP");
                            break
                        }
                        if (R) {
                            if (j === "ORBIT") {
                                i("EULER")
                            } else if (j === "CENTER") {
                                i("MAP")
                            } else if (j === "EULER") {
                                n(R.getId())
                            } else if (j !== "ORBIT") {
                                r(R.getId())
                            }
                        }
                    }
                    break;
                case 2:
                    break;
                case 3:
                    break;
                default:
                    break
            }
        }

        function o(e) {
            if (j != "START" && j != "TO3D") {
                var t;
                if (e.wheelDeltaY) t = e.wheelDeltaY * .005;
                else if (e.wheelDelta) t = -e.wheelDelta / 120;
                else t = -e.detail / 10;
                if (j === "MAP" || j === "CENTER") {
                    if (R) {
                        if (C - t * 3 > R.getZ() + 8 && C - t * 3 < D - 200) {
                            C -= t * 3
                        }
                    } else {
                        if (C - t * 3 > -20 && C - t * 3 < D - 200) {
                            C -= t * 3
                        }
                    }
                } else if (j === "ORBIT") {
                    O -= t;
                    if (C + t >= R.getZ() + O / 3) C = R.getZ() + O / 3;
                    else if (C + t <= R.getZ() - O / 3) C = R.getZ() - O / 3;
                    else C += t * (e.clientY - window.innerHeight / 2) / window.innerHeight;
                    C = l.position.z
                } else if (j === "EULER") {
                    l.position.y += t / 2 * Math.cos(l.rotation.y) + t / 2 * (e.clientX - window.innerWidth / 2) / window.innerWidth * Math.sin(l.rotation.y);
                    l.position.x -= t / 2 * Math.sin(l.rotation.y) - t / 2 * (e.clientX - window.innerWidth / 2) / window.innerWidth * Math.cos(l.rotation.y);
                    move = t / 2 * (e.clientY - window.innerHeight / 2) / window.innerHeight;
                    if (l.position.z - move > -40 && l.position.z - move < 40) l.position.z -= move
                } else l.position.z -= t;
                if (j === "MAP") {
                    if (t < 0) t = t / 2;
                    if (C > 20 && C < D - 200) {
                        l.position.x += t * 3 * (e.clientX - window.innerWidth / 2) / (D - C);
                        l.position.y -= t * 3 * (e.clientY - window.innerHeight / 2) / (D - C);
                        l.position.z = C
                    } else if (R)
                        if (l.position.z - R.getZ() > 20 && C < D - 200) {
                            l.position.x += t * 3 * (e.clientX - window.innerWidth / 2) / (D - C);
                            l.position.y -= t * 3 * (e.clientY - window.innerHeight / 2) / (D - C);
                            l.position.z = C
                        }
                }
                y.hideLabel();
                y.hideSuggestions();
                m.hideSuggestionSpheres(c)
            }
        }
        v = new Session;
        wikipediaAPI = new MyWikipediaAPI(p, v.getHistory());
        showCategories = false;
        var u = window.innerWidth,
            a = window.innerHeight;
        var d = 60,
            g = u / a,
            x = .1,
            T = 2e3;
        h = new THREE.WebGLRenderer({
            antialias: true
        });
        h.setClearColor(0, 1);
        l = new THREE.PerspectiveCamera(d, g, x, T);
        window.addEventListener("resize", function() {
            var e = window.innerWidth,
                t = window.innerHeight;
            h.setSize(e, t);
            l.aspect = e / t;
            l.updateProjectionMatrix()
        });
        c = new THREE.Scene;
        c.add(l);
        h.setSize(window.innerWidth, window.innerHeight);
        m = new Galaxy(p);
        m.buildSystem(c);
        y = new UserInterface;
        b = new Collisions;
        var N = new THREE.MeshBasicMaterial({
            color: 0,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        S = new THREE.Mesh(new THREE.SphereGeometry(1100, 16, 16), N);
        c.add(S);
        var k = new THREE.MeshLambertMaterial({
            transparent: true,
            opacity: .8,
            map: THREE.ImageUtils.loadTexture("textures/patronpop3.png"),
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        catmap = new THREE.Mesh(new THREE.PlaneGeometry(830, 830, 1, 1), k);
        E = catmap.clone();
        c.add(E);
        var L = new THREE.MeshLambertMaterial({
            transparent: true,
            opacity: 0,
            map: THREE.ImageUtils.loadTexture("textures/glow.png"),
            side: THREE.BackSide,
            depthWrite: false
        });
        glowmap = new THREE.Mesh(new THREE.CylinderGeometry(600, 600, 900, 16, 1, true), L);
        var A = new THREE.MeshBasicMaterial({
            color: 1052688,
            wireframe: true
        });
        w = new THREE.Mesh(new THREE.SphereGeometry(1e3, 64, 64), A);
        c.add(w);
        c.add(new THREE.AmbientLight(16777215));
        var M = new THREE.MeshBasicMaterial({
            color: 0,
            side: THREE.BackSide
        });
        document.body.appendChild(h.domElement);
        window.addEventListener("resize", e, false);
        h.domElement.addEventListener("mousemove", t);
        h.domElement.addEventListener("mousedown", s);
        h.domElement.addEventListener("mousewheel", o, false);
        h.domElement.addEventListener("onmousewheel", o, false);
        h.domElement.addEventListener("DOMMouseScroll", o, false);
        l.position.z = D;
        j = "START"
    }

    function t() {
        if (v.exists()) {
            var e = v.getPosition();
            var t = v.getRotation();
            l.position.set(e[0], e[1], e[2]);
            l.rotation.set(t[0], t[1], t[2]);
            R = m.getArticle(v.getArticleId());
            if (v.getState() === "MAP") f("START");
            else f(v.getState());
            if (R) {
                if (j === "ORBIT") {
                    n(R.getId())
                } else if (j === "CENTER") {
                    r(R.getId())
                }
            }
        }
    }

    function n(e) {
        k = l.rotation.z;
        y.hideLabel();
        R = m.getArticle(e);
        f("ORBIT");
        wikipediaAPI.loadWikiId(e);
        wikipediaAPI.fetchLinks(R, e, m.getTable());
        m.showLinks(l.position.z, c, R, z, h);
        m.setLockedPosition(e)
    }

    function r(e) {
        if (R) C = Math.max(20, R.getZ()) + 20;
        y.hideLabel();
        R = m.getArticle(e);
        f("CENTER");
        O = 12;
        wikipediaAPI.loadWikiId(e);
        wikipediaAPI.fetchLinks(R, e, m.getTable());
        m.showLinks(l.position.z, c, R, z, h);
        m.setLockedPosition(e)
    }

    function i(e) {
        l.rotation.z = 0;
        m.resetLockedPosition();
        f(e)
    }

    function s() {
        found = m.findNearBy(l, j, c);
        wikipediaAPI.fetchFive(y.addSuggestions2(b.suggestionCoords(l, found), F, I))
    }

    function o() {
        y.hideLabel();
        y.hideSuggestions();
        m.hideSuggestionSpheres(c)
    }

    function u(e) {
        e = e / A;
        var t = (1 + l.position.z / 200 * 5) * 4 * e;
        if (W.pressed("right") || W.pressed("left") || W.pressed("up") || W.pressed("down") || W.pressed("W") || W.pressed("A") || W.pressed("S") || W.pressed("D")) {
            if (A > 1) A -= 2;
            o();
            if (!K) {
                N = true
            }
        } else {
            A = 13;
            if (N) {
                s();
                N = false
            }
        }
        if (j === "MAP") {
            if (W.pressed("up") || W.pressed("W")) l.position.y += t;
            if (W.pressed("down") || W.pressed("S")) l.position.y -= t;
            if (W.pressed("left") || W.pressed("A")) l.position.x -= t;
            if (W.pressed("right") || W.pressed("D")) l.position.x += t
        }
        if (j === "ORBIT" && !K) {
            if (W.pressed("up") || W.pressed("W")) O -= t * 3;
            if (W.pressed("down") || W.pressed("S")) O += t * 3;
            if (W.pressed("left") || W.pressed("A")) M -= t / 5;
            if (W.pressed("right") || W.pressed("D")) M += t / 5
        }
        if (j === "EULER") {
            if (W.pressed("up") || W.pressed("W")) {
                l.position.y += e * 6 * Math.cos(l.rotation.y);
                l.position.x -= e * 6 * Math.sin(l.rotation.y)
            }
            if (W.pressed("down") || W.pressed("S")) {
                l.position.y -= e * 6 * Math.cos(l.rotation.y);
                l.position.x += e * 6 * Math.sin(l.rotation.y)
            }
            if (W.pressed("left") || W.pressed("A")) {
                l.rotation.y += e
            }
            if (W.pressed("right") || W.pressed("D")) {
                l.rotation.y -= e
            }
            if (!y.showUI) {
                if (P < -.95) {
                    o();
                    l.rotation.y += e * 5
                }
                if (P > .95) {
                    o();
                    l.rotation.y -= e * 5
                }
            }
        }
    }

    function a() {
        var e = J.getDelta();
        K = false;
        if (l.position.z > D) l.position.z = D;
        if (j === "START") {
            S.rotation.z += e / 100;
            E.material.opacity = l.position.z / D + .05
        }
        if (j === "TO3D") {
            if (l.position.z >= 0) {
                l.position.z -= D / e / 3e3 * 2;
                l.rotation.x = Math.PI / 2 * (1 - l.position.z / D);
                S.material.opacity = l.position.z / D + .05;
                E.material.opacity = l.position.z / D + .05;
                K = true
            }
            if (l.position.z <= 0 || l.rotation.x >= Math.PI / 2) {
                l.position.z = 0;
                f("EULER")
            }
        }
        if (j === "EULER") {
            if (!$("#searchvalue").is(":focus")) {
                u(e);
                if (W.pressed("2")) {
                    f("MAP")
                }
            }
        }
        if (j === "MAP") {
            if (!$("#searchvalue").is(":focus")) {
                u(e);
                if (W.pressed("3")) {
                    f("TO3D")
                }
            }
            E.material.opacity = l.position.z / D + .05;
            l.rotation.y = 0;
            l.rotation.x = 0
        }
        if (j === "ORBIT") {
            u(e);
            m.animateLockedOn(e);
            if (W.pressed("space") && _ % 20 == 0) {
                _++;
                y.showReleaseEuler()
            } else if (_ % 20 !== 0) {
                $("#release").html("Link " + (_ + 1) + "/" + R.getFriends().length);
                _++;
                if (_ >= R.getFriends().length) _ = 0;
                m.showLinks(l.position.z, c, R, z, Math.floor(_), h)
            } else {
                y.hideRelease()
            }
            var t = Math.sqrt(Math.pow(l.position.x - R.getX(), 2) + Math.pow(l.position.y - R.getY(), 2));
            O = Math.min(O, 60);
            O = Math.max(8, O);
            if (t < 1) t = 1;
            if (t > O * 1.05) {
                K = true;
                t -= t * e
            } else if (t < O * .95) {
                K = true;
                t += t * e
            } else {
                t = O
            }
            if (C > R.getZ() + O / 3) C = R.getZ() + O / 3;
            if (C < R.getZ() - O / 3) C = R.getZ() - O / 3;
            var n = M;
            l.position.x = R.getX() + t * Math.cos(n);
            l.position.y = R.getY() + t * Math.sin(n);
            l.rotation.y = n + Math.PI / 2;
            if (l.position.z <= C + .1) {
                l.position.z += (C - l.position.z) * e * 3
            } else if (l.position.z >= C - .1) {
                l.position.z -= (l.position.z - C) * e
            } else {
                C = l.position.z
            }
        }
        if (j === "CENTER") {
            m.animateLockedOn(e);
            E.material.opacity = l.position.z / D + .05;
            var t = Math.sqrt(Math.pow(l.position.x - R.getX(), 2) + Math.pow(l.position.y - R.getY(), 2));
            if (t > .2) {
                K = true;
                l.position.x += (R.getX() - l.position.x) / 2 * e;
                l.position.y += (R.getY() - l.position.y) / 2 * e
            } else {
                l.position.y = R.getY();
                l.position.x = R.getX()
            }
            if (!$("#searchvalue").is(":focus")) {
                if (W.pressed("space") && _ % 20 == 0) {
                    _++;
                    y.showReleaseMap()
                } else if (_ % 20 !== 0) {
                    $("#release").html("Link " + (_ + 1) + "/" + R.getFriends().length);
                    _++;
                    if (_ >= R.getFriends().length) _ = 0;
                    m.showLinks(l.position.z, c, R, z, Math.floor(_), h)
                } else {
                    y.hideRelease()
                }
            }
        }
        if (j === "CENTER" || j === "MAP") {
            if (l.position.z <= C * .95) {
                l.position.z += (C - l.position.z) * e
            } else if (l.position.z >= C * 1.05) {
                l.position.z -= (l.position.z - C) * e
            } else {
                C = l.position.z
            }
        }
        if (R) y.updateZoom((C - R.getZ()) / (200 - R.getZ()), j);
        else y.updateZoom(C / 200, j);
        m.updateBots();
        if (wikipediaAPI.checkRefresh()) {
            if (R) {
                m.showLinks(l.position.z, c, R, z, _, h)
            }
        }
        if (j === "EULER" || j === "ORBIT") {
            sq = Math.sqrt(l.position.x * l.position.x + l.position.y * l.position.y);
            glowmap.material.opacity = .2 - sq / 400 * .2 + .01;
            var r = Math.atan2(l.position.y, l.position.x) + Math.PI / 2;
            glowmap.rotation.y = r;
            glowmap.rotation.x = l.rotation.x;
            glowmap.rotation.z = l.rotation.z;
            glowmap.position.x = l.position.x;
            glowmap.position.y = l.position.y;
            glowmap.position.z = -l.position.z
        }
        l.position.x = Math.min(l.position.x, 400);
        l.position.y = Math.min(l.position.y, 400);
        l.position.x = Math.max(l.position.x, -400);
        l.position.y = Math.max(l.position.y, -400);
        h.render(c, l);
        requestAnimationFrame(a)
    }

    function f(e) {
        switch (e) {
            case "EULER":
                l.rotation.x = Math.PI / 2;
                c.remove(E);
                y.showZoom();
                c.add(glowmap);
                y.hideRelease();
                O = 12;
                break;
            case "ORBIT":
                c.remove(E);
                y.showZoom();
                y.showReleaseEuler();
                O = 12;
                c.add(glowmap);
                C = R.getZ() + .5;
                l.rotation.x = Math.PI / 2;
                break;
            case "START":
                l.rotation.set(0, 0, 0);
                l.position.set(0, 0, D);
                c.add(E);
                c.remove(glowmap);
                y.hideZoom();
                y.hideRelease();
                break;
            case "TO2D":
                break;
            case "TO3D":
                l.rotation.z = 0;
                l.rotation.y = 0;
                break;
            case "MAP":
                if (j === "START") {
                    var t = m.getTargetPosition();
                    if (t[0] < 4e3) {
                        l.position.x = t[0];
                        l.position.y = t[1]
                    }
                }
                c.remove(glowmap);
                if (C < 60) C = 60;
                y.hideRelease();
                y.showZoom();
                c.add(E);
                break;
            case "CENTER":
                if (j === "ORBIT") {
                    l.position.set(R.getX(), R.getY(), R.getZ())
                }
                C = Math.max(R.getZ(), 20) + 20;
                y.showZoom();
                l.rotation.y = 0;
                l.rotation.x = 0;
                c.remove(glowmap);
                c.add(E);
                y.showReleaseMap();
                break
        }
        _ = 20;
        m.resetPreviewPosition();
        m.resetTargetPosition();
        y.hideLabel();
        y.hideSuggestions();
        m.hideSuggestionSpheres(c);
        j = e;
        y.updateHelp(j);
        v.update(l, wikipediaAPI.getHistory(), j, R)
    }
    var l, c, h;
    var p = 152653;
    var d = false;
    var v, m, g, y, b;
    var w, E, S, x, T, N = false;
    var C = 20,
        k = 0,
        L = 70,
        A = 10,
        O = 10,
        M = 0,
        _ = 20;
    var D = 700;
    var P, H;
    var B = ["START", "TO3D", "EULER", "MAP", "ORBIT", "CENTER", "TO2D"];
    var j;
    var F = 0,
        I = 0,
        q = 30;
    var R;
    var U, z;
    var W = new THREEx.KeyboardState;
    var X = false,
        V;
    var J = new THREE.Clock,
        K = false,
        Q;
    var G;
    e();
    a();
    $("#start").click(function() {
        y.intro();
        t()
    });
    $("#destination,#previousvisits,#searchResults,#suggestion1,#suggestion2,#suggestion3,#suggestion4,#suggestion5,#articleGUI").on("click", ".destlink", function(e) {
        var t = $(this).attr("id");
        var i = t.substring(1, t.length);
        m.setPreviewPosition(l, 0, 0, 0, j);
        switch (j) {
            case "EULER":
                n(i);
                break;
            case "ORBIT":
                n(i);
                break;
            case "START":
                r(i);
                break;
            case "MAP":
                r(i);
                break;
            case "CENTER":
                r(i);
                break
        }
    });
    $("#destination").on("mouseover", ".destlink", function(e) {
        var t = $(this).attr("id");
        var n = t.substring(1, t.length);
        if (j === "CENTER" || j === "ORBIT") m.previewLink(R, c, parseInt(n));
        var r = m.getArticle(n);
        if (r) {
            $(this).css("color", m.categoryHex(r.getCategory()));
            m.setPreviewPosition(l, r.getX(), r.getY(), r.getZ(), j);
            if (j === "CENTER" && !K) {
                C = Math.max(20, R.getZ()) + 40 + Math.sqrt(Math.pow(R.getX() - r.getX(), 2) + Math.pow(R.getY() - r.getY(), 2)) * window.innerWidth / window.innerHeight
            } else if (j === "EULER") {
                k = Math.atan2(r.getY() - l.position.y, r.getX() - l.position.x) + Math.PI
            } else if (j === "ORBIT") {
                k = Math.atan2(r.getY() - R.getY(), r.getX() - R.getX()) + Math.PI
            }
        }
    });
    $("#searchResults").on("mouseover", ".destlink", function(e) {
        var t = $(this).attr("id");
        $(this).addClass("activated");
        var n = t.substring(1, t.length);
        var r = m.getArticle(n);
        if (r) {
            m.setPreviewPosition(l, r.getX(), r.getY(), r.getZ(), j);
            if (j === "CENTER" && !K) {
                C = Math.max(20, R.getZ()) + Math.sqrt(Math.pow(R.getX() - r.getX(), 2) + Math.pow(R.getX() - r.getX(), 2)) + 20
            } else if (j === "EULER") {
                k = Math.atan2(r.getY() - l.position.y, r.getX() - l.position.x) + Math.PI
            } else if (j === "ORBIT") {
                k = Math.atan2(r.getY() - R.getY(), r.getX() - R.getX()) + Math.PI
            }
        }
    });
    $("#wikipediaBox").on("click", "#reloadPage", function() {
        wikipediaAPI.loadWikiId($("#reloadPage").prop("reloadtarget"))
    });
    $("#searchvalue").keyup(function(e) {
        wikipediaAPI.searchArticle($(this).val(), m.getTable())
    });
    $("#zoomIn").click(function() {
        if (j === "MAP") {
            if (C > 40) C -= 40
        }
        if (j === "CENTER") {
            if (C > 40 + R.getZ()) C -= 40
        }
        if (j === "EULER") {
            if (l.position.z < 40) l.position.z += 2
        }
        if (j === "ORBIT") {
            if (l.position.z < 40 + R.getZ()) l.position.z += 2
        }
    });
    $("#zoomOut").click(function() {
        if (j === "MAP") {
            if (C < 200) C += 40
        }
        if (j === "CENTER") {
            if (C < 200 + R.getZ()) C += 40
        }
        if (j === "EULER") {
            if (l.position.z > -20) l.position.z -= 2
        }
        if (j === "ORBIT") {
            if (l.position.z > -20 + R.getZ()) l.position.z -= 2
        }
    });
    $("#fly").click(function() {
        if (j === "CENTER") {
            n(R.getId())
        } else {
            f("TO3D")
        }
        return false
    });
    $("#map").click(function() {
        m.resetTargetPosition();
        if (j === "ORBIT") {
            r(R.getId())
        } else {
            f("MAP")
        }
        return false
    });
    $("#galaxy").click(function() {
        l.position.set(0, 0, D);
        f("START");
        c.add(S);
        c.add(E);
        return false
    });
    $("#showhistory").on("change", function() {
        if (this.checked) {
            m.showHistory(c)
        } else {
            m.hideHistory(c, h)
        }
    });
    $("#searchResults").on("click", ".addArticle", function() {
        var e = $(this).attr("id");
        newarticles = [];
        $.getJSON("http://en.wikipedia.org/w/api.php?action=query&generator=links&pageids=" + e + "&gpllimit=max&format=json&callback=?", function(t) {
            $(".addArticle").html("Adding...");
            $.each(t.query.pages, function(e, t) {
                newarticles.push(t["pageid"])
            });
            m.addArticle(e, newarticles);
            $("#searchResults").html('<a class="destlink" id="f' + e + '" href="#">Go to ' + "" + "now </a><br/>")
        })
    })
}