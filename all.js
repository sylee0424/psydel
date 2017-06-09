function hab() {
    var i = 0;
    var b;
    var galleryId = location.href.split("/")[location.href.split("/").length - 1].split(".")[0];
    var scripts = document.getElementsByTagName('script');
    i = scripts.length;
    while (i--) {
        scripts[i].parentNode.removeChild(scripts[i]);
    }
    scripts = document.getElementsByTagName('noscript');
    i = scripts.length;
    while (i--) {
        scripts[i].parentNode.removeChild(scripts[i]);
    }
    scripts = document.getElementsByTagName('iframe');
    i = scripts.length;
    while (i--) {
        scripts[i].parentNode.removeChild(scripts[i]);
    }
    var scr = document.createElement('script');
    scr.src = 'https://hitomi.la/galleries/' + galleryId + '.js';
    document.body.appendChild(scr);
    divs = document.getElementsByTagName('style');
    i = divs.length;
    while (i--) {
        divs[i].parentNode.removeChild(divs[i]);
    }
    if (document.getElementsByClassName("page-container").length != 0) {
        divs = document.getElementsByClassName("page-container")[0].getElementsByTagName("li");
        i = divs.length;
        while (i--) {
            if (divs[i].innerHTML == location.href.split("-")[location.href.split("-").length - 1].split(".")[0]) {
                divs[i].setAttribute("style", "color:#ff00ff");
            }
        }
    }

    function tss(i, j, k) {
        var url;
        if (j == 0) {
            url = "https://hitomi.la" + k;
        } else if (j == 1) {
            url = "https://hitomi.la" + k.split("-all-")[0] + "-korean-" + k.split("-all-")[1];
        } else {
            url = "https://hitomi.la" + k.split("galleries")[0] + "reader" + k.split("galleries")[1] + "#1";
        }
        if (document.getElementsByName("input-" + i)[0].checked == "1") {
            window.open(url)
        } else {
            location.href = url;
        }
    }
    var scr = document.createElement("script");
    var inn = document.createTextNode(tss.valueOf());
    scr.type = "text/javascript";
    scr.appendChild(inn);
    document.body.appendChild(scr);

    function kxx(i) {
        if (document.getElementsByName("input-" + i)[0].getAttribute('checked') == '1') {
            document.getElementsByName("input-" + i)[0].setAttribute('checked', '0');
        } else {
            document.getElementsByName("input-" + i)[0].setAttribute('checked', '1');
        }
    }
    scr = document.createElement("script");
    inn = document.createTextNode(kxx.valueOf());
    scr.type = "text/javascript";
    scr.appendChild(inn);
    document.body.appendChild(scr);
    document.ontouchstart = "event.stopImmediatePropagation();";
    document.body.ontouchstart = "event.stopImmediatePropagation();";
    document.body.onmousedown = "event.stopImmediatePropagation();";
    window.onbeforeunload = "event.stopImmediatePropagation();";
}

function hid() {
    var nums=prompt("num","0");
    var numsn=nums*1;
    var a = "b"; // a or b
    var galleryId = location.href.split("/")[location.href.split("/").length - 1].split(".")[0];
    if (location.href.indexOf("/reader/") != -1) {
        var i = j = galleryinfo.length;
        var k = 0;
        if (a == "a") {
            document.getElementsByTagName("head")[0].innerHTML = "";
            document.getElementsByTagName("body")[0].innerHTML = "";
            while ((i--)-numsn) {
                var img = document.createElement("img");
                img.src = "https://hitomi.la/galleries/" + galleryId + "/" + galleryinfo[i-numsn].name;
                document.body.insertBefore(img, document.body.firstChild);
            }
        } else {
            while ((i--)-numsn) {
                var m = "";
                if ((i-numsn + 1) / 10 < 1) {
                    m = m + "0";
                }
                if ((i-numsn + 1) / 100 < 1) {
                    m = m + "0";
                }
                var hrf = document.createElement("a");
                hrf.name = "hrf";
                document.body.appendChild(hrf);
                hrf = document.getElementsByName("hrf")[0];
                hrf.href = "https://" + document.getElementsByTagName("img")[0].src.split(".hitomi.la/")[0].split("//")[1] + ".hitomi.la/galleries/" + galleryId + "/" + galleryinfo[i-numsn].name;
                hrf.download = "hitomi_" + galleryId + "_" + m + (i-numsn + 1) + ".jpg";
                hrf.name = "href";
                if (hrf.click) {
                    hrf.click();
                } else if (document.createEvent) {
                    var eventObj = document.createEvent('MouseEvents');
                    eventObj.initEvent('click', true, true);
                    hrf.dispatchEvent(eventObj);
                }
            }
        }
    } else {
        alert("갤러리/리더 화면이 아닙니다.");
    }
}

function fde() {
    document.body.removeAttribute("ondragstart");
    document.body.removeAttribute("onselectstart");
    document.body.removeAttribute("oncontextmenu");
}

function hab2() {
    var d = 0;
    var divs = document.getElementsByTagName('a');
    var i = divs.length;
    while (i--) {
        var k = divs[i].getAttribute("href");
        if (k && divs[i].id != "dl-button" && divs[i].parentNode.parentNode.getAttribute("class") != "simplePagerNav") {
            divs[i].setAttribute("onclick", "tss(" + i + ",0,'" + k + "');");
            if (divs[i].parentNode.parentNode.parentNode.getAttribute("class") == "page-container") {
                divs[i].setAttribute("onclick", "location.href = 'https://hitomi.la" + k + "';");
            }
            if (divs[i].parentNode.parentNode.parentNode.getAttribute("class") != "page-container" && divs[i].parentNode.tagName != "DIV" && divs[i].href != "/") {
                if (k.indexOf("galleries") != -1) {
                    var b = k.split("galleries");
                    divs[i].insertBefore(document.createElement("span"), divs[i].firstChild);
                    j = divs[i].firstChild;
                    j.innerHTML = "(R) ";
                    j.setAttribute("onclick", "tss(" + i + ",2,'" + k + "'); event.stopPropagation();");
                }
                if (k.indexOf("-all-") != -1) {
                    b = k.split("-all-");
                    divs[i].insertBefore(document.createElement("span"), divs[i].firstChild);
                    j = divs[i].firstChild;
                    j.innerHTML = "(K) ";
                    j.setAttribute("onclick", "tss(" + i + ",1,'" + k + "'); event.stopPropagation();");
                }
                d = 0;
            } else {
                d = 1;
                divs[i].outerHTML = "<span" + divs[i].outerHTML.substring(2, divs[i].outerHTML.length - 2) + "span>";
            }
            var inp = document.createElement("input");
            var inq = document.createElement("label");
            var tx = document.createTextNode("N");
            inp.type = "checkbox";
            inq.setAttribute("style", "display:inline");
            if (d == 1 || divs[i].parentNode.parentNode.parentNode.parentNode.class == "page-content") {
                inq.setAttribute("style", "display:none");
            }
            inp.name = "input-" + i;
            inp.setAttribute("onclick", "event.stopPropagation();");
            inp.setAttribute("style", "vertical-align:middle");
            inq.setAttribute("onclick", "kxx(" + i + "); event.stopPropagation();");
            inq.appendChild(tx);
            inq.appendChild(inp);
            divs[i].insertBefore(inq, divs[i].firstChild);
            divs[i].removeAttribute("href");
        }
    }
    divs = document.getElementsByClassName("page-content")[0].getElementsByTagName("label");
    i = divs.length;
    while (i--) {
        divs[i].setAttribute("style", "display:none");
    }
}

var str=["hab();","hab2();","hid();","fde();"];
var app[4];
var i;
for (i=0;i<4;i++) {
    app[i]=document.createElement("div");
    app[i].setAttribute("id","button"+(i+1));
    app[i].setAttribute("onclick",str[i]);
    app[i].setAttribute("style","opacity=50%; position=fixed; top="+(100*(2*i+1)/7)+"%; left=0px; width=20px; height=20px; background-color=#7f7f7f; color=#000000;");
    document.body.appendChild(app[i]);
}
