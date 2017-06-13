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

    var scr = document.createElement("script");
    var inn = document.createTextNode(tss.valueOf());
    scr.type = "text/javascript";
    scr.appendChild(inn);
    document.body.appendChild(scr);
    
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

function kxx(i) {
    if (document.getElementsByName("input-" + i)[0].getAttribute('checked') == '1') {
        document.getElementsByName("input-" + i)[0].setAttribute('checked', '0');
    } else {
        document.getElementsByName("input-" + i)[0].setAttribute('checked', '1');
    }
}

function hid() {
    var num1=Number(prompt("max","-1"));
    var num2=Number(prompt("min","0"));
    var a = prompt("a or b","b"); // a or b
    var galleryId = location.href.split("/")[location.href.split("/").length - 1].split(".")[0];
    if (location.href.indexOf("/reader/") != -1 || location.href.indexOf("/galleries/") != -1) {
        var i = galleryinfo.length;
            if (i>num1&&num1!=-1) {
                i=num1;
            }
        var k = 0;
        if (a == "a") {
            document.getElementsByTagName("head")[0].innerHTML = "";
            document.getElementsByTagName("body")[0].innerHTML = "";
            while ((i--)-num2) {
                var img = document.createElement("img");
                img.src = "https://hitomi.la/galleries/" + galleryId + "/" + galleryinfo[i-num2].name;
                document.body.insertBefore(img, document.body.firstChild);
            }
        } else {
            while ((i--)-num2) {
                var m = "";
                if ((i + 1) / 10 < 1) {
                    m = m + "0";
                }
                if ((i + 1) / 100 < 1) {
                    m = m + "0";
                }
                var hrf = document.createElement("a");
                hrf.name = "hrf";
                document.body.appendChild(hrf);
                hrf = document.getElementsByName("hrf")[0];
                hrf.href = "https://" + document.getElementsByTagName("img")[0].src.split(".hitomi.la/")[0].split("//")[1] + ".hitomi.la/galleries/" + galleryId + "/" + galleryinfo[i].name;
                hrf.download = "hitomi_" + galleryId + "_" + m + (i + 1) + ".jpg";
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

var strs=["hab();","hab2();","hid();","fde();","closes(strs);"];
var app= new Array(strs.length);
var i;
for (i=0;i<strs.length;i++) {
    app[i]=document.createElement("div");
    app[i].setAttribute("onclick",strs[i]);
    app[i].setAttribute("id","app"+(i+1));
    app[i].setAttribute("style","visibility:hidden; border-width:1px; border-color:#000000; position:fixed; top:"+(100*(2*i)/(((strs.length)*2)+1))+"%; left:0px; width:80px; height:80px; background-color:#ffffff; color:#000000;");
    app[i].appendChild(document.createTextNode(strs[i]));
    document.body.appendChild(app[i]);
}

var diva=document.createElement("div");
diva.setAttribute("onclick","openb(strs);");
diva.setAttribute("id","diva");
diva.setAttribute("style","opacity:0.5; visibility:visible; position:fixed; top:75%; left:0px; width:80px; border-width:1px; border-color:#000000; height:80px; background-color:#ffffff; color:#000000;");
document.body.appendChild(diva);

function openb(strs) {
    document.getElementById("diva").style.visibility="hidden";
    for (var i=0;i<strs.length;i++) {
        document.getElementById("app"+(i+1)).style.visibility="visible";
    }
}

function closes(strs) {
    document.getElementById("diva").style.visibility="visible";
    for (var i=0;i<strs.length;i++) {
        document.getElementById("app"+(i+1)).style.visibility="hidden";
    }
}
