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


function UserInterface() {
    this.showUI = true;
    this.initjQuery();
    this.labelcount = 1;
    this.labels = [];
    this.fullscreen = false
}
UserInterface.prototype.intro = function() {
    $("#UIlayer").fadeIn(1500);
    $("#logotitle").fadeOut(1200);
    $(".overlay").fadeOut(1e3);
    $("#toggleui").fadeIn(1500)
};
UserInterface.prototype.initjQuery = function() {
    UIthis = this;
    $("#fullscreen").click(function() {
        if (!UIthis.fullscreen) {
            THREEx.FullScreen.request(document.body);
            UIthis.fullscreen = true
        } else {
            THREEx.FullScreen.cancel();
            UIthis.fullscreen = false
        }
    });
    $("#searchvalue").focus(function() {
        $("#searchResults").empty()
    });
    $("#searchArticle").submit(function() {
        return false
    });
    if (!window.localStorage.getItem("hidetutorial")) $("#tutorial").fadeIn();
    $("#about").click(function() {
        $(".overlay").fadeIn(100);
        $("#aboutbox").fadeIn(300);
        $("#content").html($("#content1").html());
        $("#close").fadeIn(300);
        $("#overlayer").fadeOut(300)
    });
    $("#help").click(function() {
        $(".overlay").fadeIn(100);
        $("#helpbox").fadeIn(300);
        $("#close").fadeIn(300);
        $("#overlayer").fadeOut(300);
        $("#helperbox").html($("#help1").html())
    });
    $("#zoom, #wikipediaBox").keypress(function(e) {
        e.preventDefault();
        var t = e.charCode || e.keyCode;
        if (t == 38 || t == 40) {
            return false
        }
    });
    $("#searchbar").addClass("visible");
    $("#pageTitle").addClass("visible");
    $("#wikipediaBox").addClass("visible");
    $("#zoom").addClass("visible");
    $("#UImap").addClass("visible");
    $("#links").addClass("visible");
    $("#history").addClass("visible");
    $("#wikipediaBox,#searchbar,#UImap,#pageTitle,#zoom").click(function(e) {
        if (e.offsetX > $(this).width() - 10) {
            UIthis.AnimateHideLeft($(this))
        }
    });
    $("#wikipediaBox,#UImap,#pageTitle,#searchbar,#zoom").mouseover(function(e) {
        if (e.offsetX > $(this).width() - 10) {
            if ($(this).hasClass("visible")) {
                $(this).css({
                    "border-right": "12px solid #FFF"
                }).addClass("mouseover")
            }
        }
    });
    $("#wikipediaBox,#UImap,#pageTitle,#searchbar,#zoom").mouseout(function(e) {
        if ($(this).hasClass("visible")) {
            $(this).css({
                "border-right": "1px solid #DDD"
            }).removeClass("mouseover")
        }
    });
    $("#links,#history,#helper").click(function(e) {
        if (e.pageX - $(this).offset().left < 15) {
            UIthis.AnimateHideRight($(this))
        }
    });
    $("#links,#history,#helper").mouseover(function(e) {
        if (e.pageX - $(this).offset().left < 15) {
            if ($(this).hasClass("visible")) {
                $(this).css({
                    "border-left": "12px solid #FFF"
                }).addClass("mouseover")
            }
        }
    });
    $("#links,#helper,#history").mouseout(function(e) {
        if ($(this).hasClass("visible")) {
            $(this).css({
                "border-left": "1px solid #DDD"
            }).removeClass("mouseover")
        }
    });
    $("#toggleui").click(function() {
        var e = UIthis.showUI;
        switch (e) {
            case true:
                $("#articleGUI").fadeIn();
                UIthis.showUI = false;
                $("#toggleui").html('<div><img src="textures/icons/light.png"/></div><div>UI on</div>');
                $("#UIlayer").fadeOut(300);
                UIthis.AnimateHideLeft($("#wikipediaBox,#searchbar,#UImap,#pageTitle,#zoom"));
                UIthis.AnimateHideRight($("#links,#history"));
                break;
            case false:
                $("#articleGUI").fadeOut();
                UIthis.showUI = true;
                $("#toggleui").html('<div><img src="textures/icons/moon.png"/></div><div>UI off</div>');
                $("#UIlayer").fadeIn(300);
                $("#previousvisits,#destination").slimScroll({
                    size: "10px",
                    position: "right",
                    color: "#ffffff",
                    borderRadius: "0",
                    height: "auto"
                });
                $("#wikiInfo").slimScroll({
                    size: "10px",
                    position: "left",
                    color: "#ffffff",
                    borderRadius: "0",
                    height: "auto"
                });
                UIthis.AnimateHideLeft($("#wikipediaBox,#searchbar,#UImap,#pageTitle,#zoom"));
                UIthis.AnimateHideRight($("#links,#history"));
                break
        }
    });
    $(".choice1").click(function() {
        $("#content").fadeOut(function() {
            $(this).html($("#content1").html())
        }).fadeIn()
    });
    $(".choice2").click(function() {
        $("#content").fadeOut(function() {
            $(this).html($("#content2").html())
        }).fadeIn()
    });
    $(".choice3").click(function() {
        $("#content").fadeOut(function() {
            $(this).html($("#content3").html())
        }).fadeIn()
    });
    $(".choice4").click(function() {
        $("#content").fadeOut(function() {
            $(this).html($("#content4").html())
        }).fadeIn()
    });
    $(".help1").click(function() {
        $("#helperbox").fadeOut(function() {
            $(this).html($("#help1").html())
        }).fadeIn()
    });
    $(".help2").click(function() {
        $("#helperbox").fadeOut(function() {
            $(this).html($("#help2").html())
        }).fadeIn()
    });
    $(".help3").click(function() {
        $("#helperbox").fadeOut(function() {
            $(this).html($("#help3").html())
        }).fadeIn()
    });
    $(".help4").click(function() {
        $("#helperbox").fadeOut(function() {
            $(this).html($("#help4").html())
        }).fadeIn()
    })
};
UserInterface.prototype.AnimateHideLeft = function(e) {
    if (!e.hasClass("visible")) {
        e.animate({
            left: "-1px",
            opacity: 1
        }, "fast", "swing").addClass("visible");
        e.css("border-right", "1px solid #DDD");
        if (e.attr("id") === "wikipediaBox") {
            e.animate({
                "max-height": "58%"
            }, "fast", "swing")
        }
    } else {
        e.animate({
            left: -e.width() - 10,
            opacity: .8
        }, "slow", "swing").removeClass("visible");
        e.css("border-right", "12px solid rgba(240,240,255,0.5)");
        if (e.attr("id") === "wikipediaBox") {
            e.animate({
                "max-height": "10%"
            }, "fast", "swing")
        }
    }
};
UserInterface.prototype.updateHelp = function(e) {
    switch (e) {
        case "START":
            $("#helpertext").html("Use the mouse to see a preview of articles in each cluster<br/> Click anywhere on the map to fly there");
            break;
        case "MAP":
            $("#helpertext").html("<span class='key'>3</span> : Fly in first person mode<br/><span class='key'>↑</span><span class='key'>↓</span><span class='key'>←</span><span class='key'>→</span><span class='key'>A</span><span class='key'>S</span><span class='key'>D</span><span class='key'>W</span> : move around <br/> <span class='key'>Scroll Wheel</span> : zoom in and out <br/> Click on star : fly to article");
            break;
        case "CENTER":
            $("#helpertext").html("Click link to select, background to deselect<br/><span class='key'>Space bar</span> : Add next 20 links <br/> <span class='key'>Scroll Wheel</span> : zoom in and out");
            break;
        case "EULER":
            $("#helpertext").html("<span class='key'>2</span> : Go back to the map<br/><span class='key'>←</span><span class='key'>→</span><span class='key'>A</span><span class='key'>D</span> :Rotate camera <br/><span class='key'>↑</span><span class='key'>↓</span><span class='key'>W</span><span class='key'>S</span> : move closer/further <br/> <span class='key'>Scroll Wheel</span> : Fly in/ Fly out to cursor<br/> Click on star : go to article");
            break;
        case "ORBIT":
            $("#helpertext").html("Click link to select, background to deselect<br/><span class='key'>Space bar</span> : Add next 20 links <br/> <span class='key'>↑</span><span class='key'>↓</span><span class='key'>W</span><span class='key'>S</span> : move closer/further <br/> <span class='key'>Scroll Wheel</span> : zoom in and out");
            break
    }
};
UserInterface.prototype.AnimateHideRight = function(e) {
    if (!e.hasClass("visible")) {
        e.animate({
            right: "-1px",
            opacity: 1
        }, "fast", "swing").addClass("visible");
        e.css("border-left", "1px solid #DDD")
    } else {
        e.animate({
            right: -e.width(),
            opacity: .8
        }, "slow", "swing").removeClass("visible");
        e.css("border-left", "12px solid rgba(240,240,255,0.8)")
    }
};
UserInterface.prototype.addLabel = function(e, t, n) {
    $("#pointer").css({
        top: -(t - 1) * window.innerHeight / 2 - 30,
        left: (e + 1) * window.innerWidth / 2 - 40
    })
};
UserInterface.prototype.hideLabel = function() {
    $("#pointer").css({
        top: -30,
        left: 0
    })
};
UserInterface.prototype.addSuggestions = function(e, t, n, r) {
    var i = ["Culture", "Belief", "Technology and applied sciences", "Society", "Health", "Language", "Business", "Arts", "History and events", "Agriculture", "People", "Politics", "Science", "Geography and places", "Education", "Sports", "Philosophy", "Law", "Environment", "Mathematics", "Computing", "Unknown"];
    var s = ["Culture", "Culture", "Science", "Society", "Science", "Culture", "Society", "Culture", "History", "Society", "People", "Society", "Science", "Geography", "Society", "Culture", "Culture", "Society", "Society", "Science", "Science", "Unknown", "Unknown"];
    var o = ["#f90058", "#f90058", "#07d6a1", "#bf8bff", "#07d6a1", "#f90058", "#bf8bff", "#f90058", "#ff9a00", "#bf8bff", "#ffff66", "#bf8bff", "#07d6a1", "#0292ef", "#bf8bff", "#f90058", "#f90058", "#bf8bff", "#bf8bff", "#07d6a1", "#07d6a1", "#CCC", "#CCC"];
    var u = 5;
    var a = (n + 1) * window.innerWidth / 2;
    var f = -(r - 1) * window.innerHeight / 2;
    for (var l = 1; l < 6; l++) {
        if (l > e.length) {
            $("#suggestion" + l).css({
                top: -200
            }).hide()
        } else {
            $("#suggestion" + l).css({
                top: f + 65 * Math.sin((u - l) / u * Math.PI * 2) - 5,
                left: a + 65 * Math.cos((u - l) / u * Math.PI * 2) - 25
            }).stop().fadeIn();
            if (i[t[l]]) {
                $("#catsuggestion").css({
                    top: f + 80,
                    left: a - i[t[l]].length * 4
                });
                $("#catsuggestion").html("<span style='color: " + o[t[l]] + "'>" + i[t[l]] + "</span><br/>Click to view")
            }
        }
    }
};
UserInterface.prototype.addSuggestions2 = function(e) {
    var t = 0;
    var n = [];
    for (var r = 0; r < 6; r++) {
        t = r + 1;
        if (r >= e.length) {
            $("#suggestion" + t).css({
                top: -200
            }).hide()
        } else {
            n[r] = e[r]["id"];
            $("#suggestion" + t).css({
                top: e[r]["y"],
                left: e[r]["x"]
            }).stop().fadeIn()
        }
    }
    return n
};
UserInterface.prototype.showZoom = function() {
    $("#zoom").fadeIn(300)
};
UserInterface.prototype.updateZoom = function(e, t) {
    if (t === "EULER" || t === "ORBIT") $("#zoomLevel").html("altitude  ");
    else $("#zoomLevel").html("zoom  ")
};
UserInterface.prototype.hideZoom = function() {
    $("#zoom").fadeOut(300)
};
UserInterface.prototype.hideSuggestions = function() {
    for (var e = 1; e < 6; e++) {
        $("#suggestion" + e).css({
            top: -200
        }).hide()
    }
    $("#catsuggestion").css({
        top: -200
    })
};
UserInterface.prototype.showReleaseEuler = function() {
    $("#release").fadeIn(300);
    $("#releasetext").css({
        "margin-top": 300
    })
};
UserInterface.prototype.showReleaseMap = function() {
    $("#release").fadeIn(300);
    $("#releasetext").css({
        "margin-top": 30
    })
};
UserInterface.prototype.hideRelease = function() {
    $("#release").fadeOut(600, function() {
        $("#release").empty()
    })
}