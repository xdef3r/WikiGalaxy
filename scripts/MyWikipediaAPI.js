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

function MyWikipediaAPI(e, t) {
    this.limit = e;
    if (t) this.visits = t;
    else this.visits = [];
    this.needsRefresh = false;
    this.currentID = 0;
    this.currentPointer = 0;
    this.fullScreen = false;
    this.opened = false;
    this.currentGET = null;
    this.currentSearch = null;
    Mythis = this;
    this.favorites = [82780, 736, 5314, 5142, 10489, 30307, 26823, 974, 3356, 11968];
    $("#wikipediaBox").on("click", "#expandarticle", function() {
        var e = Mythis.opened;
        if (!e) {
            Mythis.expandArticle()
        } else {
            Mythis.closeArticle()
        }
    });
    $("#close").click(function() {
        Mythis.closeArticle();
        return false
    });
    this.loadExample();
    this.updateVisits();
    this.updateScroll("history")
}
MyWikipediaAPI.prototype.getHistory = function() {
    return this.visits
};
MyWikipediaAPI.prototype.updateScroll = function(e) {
    switch (e) {
        case "links":
            $("#destination").slimScroll({
                size: "10px",
                position: "right",
                color: "#ffffff",
                borderRadius: "0",
                height: "auto"
            });
            break;
        case "history":
            $("#previousvisits").slimScroll({
                size: "10px",
                position: "right",
                color: "#ffffff",
                borderRadius: "0",
                height: "auto"
            });
            break;
        case "fullscreen":
            $("#fullScreenContent").slimScroll({
                size: "10px",
                position: "right",
                color: "#ffffff",
                borderRadius: "0",
                height: "auto",
                width: "auto"
            });
            break;
        case "wikipediaBox":
            $("#wikiInfo").slimScroll({
                size: "10px",
                position: "left",
                color: "#ffffff",
                borderRadius: "0",
                height: "auto"
            });
            break
    }
};
MyWikipediaAPI.prototype.expandArticle = function() {
    this.loadFullScreen(this.currentID);
    $("#fullScreenArticle").fadeIn(300);
    $("#close").fadeIn(300);
    $("#overlayer").fadeOut(300);
    this.opened = true
};
MyWikipediaAPI.prototype.closeArticle = function() {
    $("#fullScreenContent").empty();
    $("#fullScreenArticle").fadeOut(300);
    $("#overlayer").fadeIn(300);
    $("#close").fadeOut(300);
    $("#helpbox").fadeOut(300);
    $("#aboutbox").fadeOut(300);
    $(".overlay").fadeOut(300);
    this.opened = false
};
MyWikipediaAPI.prototype.loadExample2 = function() {
    var e = this.favorites[Math.round(Math.random() * (this.favorites.length - 1))];
    myThis = this;
    $.getJSON("http://en.wikipedia.org/w/api.php?action=parse&pageid=" + e + "&prop=text&format=json&callback=?", function(e) {
        $("#wikiInfo").empty();
        $("#wikiInfo").html(e.parse.text["*"] + "<br/>");
        $("#wikiInfo").find("a:not(.references a)").attr("href", function() {
            return $(this).attr("href")
        });
        $("#wikiInfo").find("*").css({
            "background-color": "transparent",
            color: "#FFFFFF"
        });
        $("#wikiInfo").find("a").removeAttr("href");
        var t = e.parse.title;
        $("#wikiheader").html('<a id="expandarticle" href="#">View ' + e.parse.title + " fullscreen</a>")
    })
};
MyWikipediaAPI.prototype.loadExample = function() {
    $("#wikiInfo").html("<h1>Welcome.</h1><br/><p style='padding-right:10px'>WikiGalaxy is a 3D web experiment that visualizes Wikipedia as a galactic web of information. With it I aim to show the world the beauty and variety of knowledge that is available at our fingertips.<br/> I used 100,000 of 2014's most popular articles, all clustered with hyperlinks. In this world Wikipedia articles are stars, interests are nebulas and you are on a journey through knowledge.</p>");
    $("#wikiheader").empty()
};
MyWikipediaAPI.prototype.searchArticle = function(e, t) {
    myThis = this;
    if (this.currentSearch) this.currentSearch.abort();
    tab = e.split(" ");
    for (var n = 0; n < tab.length; n++) {
        temp = tab[n];
        tab[n] = temp.charAt(0).toUpperCase() + temp.slice(1)
    }
    name2 = tab.join(" ");
    if (name2.length > 0) {
        this.currentSearch = $.getJSON("http://en.wikipedia.org/w/api.php?action=query&format=json&titles=" + name2 + "&redirects&callback=?", function(n) {
            var r = "";
            $("#searchResults").empty();
            jQuery.each(n.query.pages, function(n, i) {
                if (typeof i.pageid == "undefined") {
                    r = "<span class='deadlink'>No results found for : " + e + "</span>"
                } else {
                    if (t[i.pageid]) r += 'Article Found:<br/><a class="destlink" id="f' + i.pageid + '" href="#">' + i.title + "</a><br/>";
                    else r += "Article not added yet:<br/><a class='addArticle' id=" + i.pageid + '>Add "' + i.title + '" to the galaxy</a>'
                }
            });
            $("#searchResults").html(r)
        })
    }
};
MyWikipediaAPI.prototype.fetchName = function(e, t) {
    var n = ["Culture", "Belief", "Technology and applied sciences", "Society", "Health", "Language", "Business", "Arts", "History and events", "Agriculture", "People", "Politics", "Science", "Geography and places", "Education", "Sports", "Philosophy", "Law", "Environment", "Mathematics", "Computing", "Unknown"];
    var r = ["Culture", "Culture", "Science", "Society", "Science", "Culture", "Society", "Culture", "History", "Society", "People", "Society", "Science", "Geography", "Society", "Culture", "Culture", "Society", "Society", "Science", "Science", "Unknown", "Unknown"];
    var i = ["#f90058", "#f90058", "#07d6a1", "#bf8bff", "#07d6a1", "#f90058", "#bf8bff", "#f90058", "#ff9a00", "#bf8bff", "#ffff66", "#bf8bff", "#07d6a1", "#0292ef", "#bf8bff", "#f90058", "#f90058", "#bf8bff", "#bf8bff", "#07d6a1", "#07d6a1", "#CCC", "#CCC"];
    myThis = this;
    if (this.currentPointer !== e) {
        this.currentPointer = e;
        if (t < 22) $("#pointer").html("... (<i><span style='color:" + i[t] + "'>" + r[t] + "</span></i>)");
        else $("#pointer").html("...");
        this.currentGET = $.getJSON("http://en.wikipedia.org/w/api.php?action=query&pageids=" + e + "&prop=info&format=json&callback=?", function(n) {
            var s = n.query.pages[e].title;
            if (s !== undefined) {
                if (t < 22) $("#pointer").html(s + " (<i><span style='color:" + i[t] + "'>" + r[t] + "</span></i>)");
                else $("#pointer").html(s)
            } else {
                $("#articlename").html("Redirect:" + e);
                $("#pointer").html("Redirect:" + e)
            }
        }).error(function() {
            $("#pointer").html("connexion error")
        })
    }
};
MyWikipediaAPI.prototype.fetchFive = function(e) {
    if (e.length > 0) {
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = n + 1;
            $("#suggestion" + r).empty();
            t += e[n] + "|"
        }
        t = t.substring(0, t.length);
        $.getJSON("http://en.wikipedia.org/w/api.php?action=query&pageids=" + t + "&prop=info&format=json&callback=?", function(t) {
            var n = t.query.pages;
            if (n) {
                for (var r = 0; r < e.length; r++) {
                    var i = t.query.pages[e[r]].title;
                    var s = r + 1;
                    if (i !== undefined) {
                        $("#suggestion" + s).html('<a class="destlink" id="d' + e[r] + '" href="#">' + i + "</a>")
                    } else {
                        $("#suggestion" + s).html("not found")
                    }
                }
            }
        })
    }
};
MyWikipediaAPI.prototype.fetchFive2 = function(e) {
    var t = "";
    for (var n = 0; n < e.length; n++) {
        var r = n + 1;
        $("#suggestion" + r).empty();
        t += e[n] + "|"
    }
    t = t.substring(0, t.length);
    $.getJSON("http://en.wikipedia.org/w/api.php?action=query&pageids=" + t + "&prop=info&format=json&callback=?", function(t) {
        if (typeof t.query.pages != undefined) {
            for (var n = 0; n < e.length; n++) {
                var r = t.query.pages[e[n]].title;
                var i = n + 1;
                if (r !== undefined) {
                    $("#suggestion" + i).html("<span class='suggestionblank'>" + r + "</span>")
                } else {
                    $("#suggestion" + i).html("not found")
                }
            }
        }
    })
};
MyWikipediaAPI.prototype.fetchSelectedName = function(e) {
    myThis = this;
    $.getJSON("http://en.wikipedia.org/w/api.php?action=query&pageids=" + e + "&prop=info&format=json&callback=?", function(t) {
        var n = t.query.pages[e].title;
        if (n !== undefined) {
            myThis.visits.push({
                name: n,
                id: e
            });
            $("#wikiheader").html("<a id='reloadPage'>Click to load: " + n + "</a>");
            $("#wikiInfo").empty();
            $("#reloadPage").prop("reloadtarget", e);
            $("#wikipediaBox").css({
                "border-right": "12px solid rgba(252,255,255,1)"
            });
            myThis.updateVisits();
            myThis.updateArticleName(n, e)
        } else {
            $("#articlename").html("Redirect:" + e)
        }
    })
};
MyWikipediaAPI.prototype.IDtoName = function(e) {
    $.getJSON("http://en.wikipedia.org/w/api.php?action=query&pageids=" + e + "&prop=info&format=json&callback=?", function(t) {
        var n = t.query.pages[e].pageid;
        if (n !== undefined) {
            return n
        } else {
            return "unknown name"
        }
    })
};
MyWikipediaAPI.prototype.NameToID = function(e) {
    $.getJSON("http://en.wikipedia.org/w/api.php?action=query&format=json&titles=" + e + "&callback=?", function(e) {
        jQuery.each(e.query.pages, function(e, t) {
            id = t.pageid
        });
        return id
    })
};
MyWikipediaAPI.prototype.fetchLinks = function(e, t, n) {
    myThis = this;
    var r = document.getElementById("destination");
    r.scrollTop = r.scrollHeight;
    $.getJSON("http://en.wikipedia.org/w/api.php?action=query&generator=links&pageids=" + t + "&gpllimit=max&format=json&callback=?", function(r) {
        if (r) {
            var i = r.query.pages;
            var s = "";
            var o = 0;
            var u = [],
                a = [],
                f = [],
                l = [],
                c = [],
                h = [],
                p = [];
            var d = n[t];
            var v = 5,
                m = 20,
                g = 60,
                y = 160;
            var b, w, E, S, x;
            var T = 0;
            b = d.getX();
            w = d.getY();
            $.each(i, function(e, r) {
                if (n[r["pageid"]] && r["pageid"] != t) {
                    E = n[r["pageid"]].getX();
                    S = n[r["pageid"]].getY();
                    x = r["title"];
                    T = Math.sqrt(Math.pow(b - E, 2) + Math.pow(w - S, 2));
                    switch (true) {
                        case T < v:
                            a.push({
                                id: r["pageid"],
                                name: x
                            });
                            break;
                        case T > v && T < m:
                            f.push({
                                id: r["pageid"],
                                name: x
                            });
                            break;
                        case T > m && T < g:
                            l.push({
                                id: r["pageid"],
                                name: x
                            });
                            break;
                        case T > g && T < y:
                            c.push({
                                id: r["pageid"],
                                name: x
                            });
                            break;
                        default:
                            h.push({
                                id: r["pageid"],
                                name: x
                            });
                            break
                    }
                }
            });
            if (a.length > 0) p.push({
                id: -1,
                name: 1
            });
            p = p.concat(a);
            if (f.length > 0) p.push({
                id: -1,
                name: 2
            });
            p = p.concat(f);
            if (l.length > 0) p.push({
                id: -1,
                name: 3
            });
            p = p.concat(l);
            if (c.length > 0) p.push({
                id: -1,
                name: 4
            });
            p = p.concat(c);
            if (h.length > 0) p.push({
                id: -1,
                name: 5
            });
            p = p.concat(h);
            $.each(p, function(e, t) {
                if (t["id"] > 0) {
                    s += '<a class="destlink" id="d' + t["id"] + '" href="#">' + t["name"] + "</a>";
                    s += "<span class='linkSeparator2'></span>";
                    o++;
                    u.push(t["id"]);
                    $("#d" + t["id"]).addClass("activated")
                } else {
                    switch (t["name"]) {
                        case 1:
                            s += "<span class='linkSeparator'>closely related</span>";
                            break;
                        case 2:
                            s += "<span class='linkSeparator'>highly related</span>";
                            break;
                        case 3:
                            s += "<span class='linkSeparator'>related</span>";
                            break;
                        case 4:
                            s += "<span class='linkSeparator'>somewhat related</span>";
                            break;
                        default:
                            s += "<span class='linkSeparator'>distant</span>";
                            break
                    }
                }
            });
            if (o === 0) {
                var N = myThis.visits[myThis.visits.length - 1];
                s += "No links available.<br/>";
                s += '<a class="destlink" id="d' + N["id"] + '" href="#">Return to ' + N["name"] + "</a>"
            }
            e.addFriends(u);
            myThis.needsRefresh = true;
            $("#destination").html(s).scrollTop(0);
            $("#linksheader").html("Article links: " + o);
            myThis.updateScroll("links")
        } else {
            $("#linksheader").html("No links available")
        }
    })
};
MyWikipediaAPI.prototype.previewLinks = function(e, t) {
    myThis = this;
    $.getJSON("http://en.wikipedia.org/w/api.php?action=query&generator=links&pageids=" + t + "&gpllimit=5&format=json&callback=?", function(t) {
        if (t) {
            var n = t.query.pages;
            var r = [];
            jQuery.each(n, function(e, t) {
                if (e < myThis.limit && e > 0) {
                    r.push(e)
                }
            });
            e.addFriends(r);
            this.needsRefresh = true
        }
    })
};
MyWikipediaAPI.prototype.loadWikiId = function(e) {
    if (e !== this.currentID) {
        $("#articlename").html("Loading #" + e);
        $("#articleGUI").empty();
        $("#wikiInfo").empty();
        $("#wikiInfo").html("loading page...");
        if ($("#wikipediaBox").hasClass("visible")) {
            myThis = this;
            $.getJSON("http://en.wikipedia.org/w/api.php?action=parse&pageid=" + e + "&prop=text&section=0&format=json&callback=?", function(t) {
                if (t) {
                    myThis.currentID = e;
                    $("#wikiInfo").html(t.parse.text["*"] + "<br/>");
                    $("#wikiInfo").find("a:not(.references a)").attr("href", function() {
                        return $(this).attr("href")
                    });
                    $("#wikiInfo").find("*").css({
                        "background-color": "rgba(8,8,8,0)",
                        color: "#FFFFFF"
                    });
                    $("#wikiInfo").find("a").removeAttr("href");
                    myThis.visits.push({
                        name: t.parse.title,
                        id: e
                    });
                    var n = t.parse.title;
                    myThis.updateArticleName(n, e);
                    $("#wikiheader").html('<a id="expandarticle" href="#">View complete article here</a>');
                    myThis.updateVisits();
                    myThis.updateScroll("wikipediaBox")
                } else {
                    $("#wikiInfo").html("No available content to show")
                }
            }).error(function() {
                $("#wikiInfo").html("loading failed, connexion error")
            })
        } else {
            this.fetchSelectedName(e)
        }
    }
};
MyWikipediaAPI.prototype.updateArticleName = function(e, t) {
    if (e.length > 18) {
        $("#articlename").html("<marquee scrollamount='1' scrolldelay='3'>" + e + "</marquee>");
        $("#articleGUI").html("<a class='destlink' id='d" + t + "' href='#'>" + e + "</a>")
    } else {
        $("#articlename").html(e);
        $("#articleGUI").html("<a class='destlink' id='d" + t + "' href='#'>" + e + "</a>")
    }
};
MyWikipediaAPI.prototype.loadFullScreen = function(e) {
    myThis = this;
    $("#fullScreenArticle").html("<span style='width:200px;height:30px;' class='centered'> Loading full article...</span>");
    $.getJSON("http://en.wikipedia.org/w/api.php?action=parse&pageid=" + e + "&prop=text&format=json&callback=?", function(e) {
        if (e) {
            $("#fullScreenArticle").html(e.parse.text["*"]);
            $("#fullScreenArticle").find("a:not(.references a)").attr("href", function() {
                return $(this).attr("href")
            });
            $("#fullScreenArticle").find("a").removeAttr("href");
            myThis.updateVisits()
        }
        myThis.updateScroll("fullscreen")
    })
};
MyWikipediaAPI.prototype.checkRefresh = function() {
    var e = this.needsRefresh;
    this.needsRefresh = false;
    return e
};
MyWikipediaAPI.prototype.updateVisits = function() {
    var e = "";
    jQuery.each(this.visits.reverse(), function(t, n) {
        e += '<a class="destlink" id="d' + n["id"] + '" href="#">' + n["name"] + "</a>";
        e += "<span class='linkSeparator2'></span>"
    });
    this.visits.reverse();
    $("#previousvisits").html(e);
    this.updateScroll("history")
}