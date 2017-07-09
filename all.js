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

function hlb() {
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

var _scr=document.createElement("script");
_scr.setAttribute("src","https://gist.github.com/sivy/2718937.js");
document.body.appendChild(_scr)

var strs=["hab","hlb","hid","fde","led","rtl","alts","bmk","lnk","tst"];
var acts=["nxt","prv","cls","opn"];
var app= new Array(strs.length);
for (i=0;i<strs.length;i++) {
    app[i]=document.createElement("div");
    app[i].setAttribute("onclick",strs[i]+"();");
    app[i].setAttribute("onmousedown","toggle(this,false)");
    app[i].setAttribute("onmouseup","toggle(this,true)");
    app[i].className="pages"+parseInt(i/3)+" button";
    app[i].setAttribute("style","visibility:hidden; border:5px solid #000000; position:fixed; top:"+(100*(2*(i%3)+2)/11)+"%; left:0px; width:60px; height:60px; background-color:#ffffff; color:#000000; display:inline");
    app[i].appendChild(document.createTextNode(strs[i]));
    document.body.appendChild(app[i]);
}

for (i=0;i<acts.length-1;i++) {
    app[i]=document.createElement("div");
    app[i].setAttribute("onmousedown","toggle(this,false)");
    app[i].setAttribute("onmouseup","toggle(this,true)");
    app[i].setAttribute("onclick",acts[i]+"();");
    app[i].className="acts button";
    if (i==0) {
        k=0;
    }
    else if (i==1) {
        k=4;
    }
    else {
        k=5;
    }
    app[i].setAttribute("style","visibility:hidden; border:5px solid #000000; position:fixed; top:"+(100*(2*k)/11)+"%; left:0px; width:60px; height:60px; background-color:#ffffff; color:#000000; display:inline");
    app[i].appendChild(document.createTextNode(acts[i]));
    document.body.appendChild(app[i]);
}

/*
    for (i=0;i<strs.length;i++) {
        app[i]=document.createElement("div");
        app[i].setAttribute("onclick",strs[i]);
        app[i].setAttribute("id","app"+(i+1));
        app[i].setAttribute("style","visibility:hidden; border-width:5px; border-color:#000000; position:fixed; top:"+(100*(2*i)/(strs.length*2+1))+"%; left:0px; width:60px; height:60px; background-color:#ffffff; color:#000000; display:inline");
        app[i].appendChild(document.createTextNode(strs[i]));
        document.body.appendChild(app[i]);
    }
    var asd=document.createElement("div");
    asd.setAttribute("onclick",acts[2]);
    asd.setAttribute("id","app"+(strs.length+1));
    asd.setAttribute("style","visibility:hidden; border-width:5px; border-color:#000000; position:fixed; top:"+(100*(strs.length*2)/(strs.length*2+1))+"%; left:0px; width:60px; height:60px; background-color:#ffffff; color:#000000; display:inline");
    asd.appendChild(document.createTextNode(acts[2]));
*/

var diva=document.createElement("div");
diva.setAttribute("onclick",acts[acts.length-1]+"();");
diva.setAttribute("onmousedown","toggle(this,false)");
diva.setAttribute("onmouseup","toggle(this,true)");
diva.className="offbutton";
diva.setAttribute("style","opacity:0.5; visibility:visible; position:fixed; top:75%; left:0px; width:80px; border:5px solid #000000; height:80px; background-color:#ffffff; color:#000000; display:inline");
diva.appendChild(document.createTextNode(acts[acts.length-1]));
document.body.appendChild(diva);

var pages=0;

var __scr=document.createElement("script");
__scr.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.2.0/ZeroClipboard.min.js');
document.body.appendChild(__scr)

var ifa=document.createElement("iframe");
ifa.setAttribute("width","0px");
ifa.setAttribute("height","0px");
ifa.setAttribute("src","https://github.com/sylee0424/psydel/issues/new");
ifa.setAttribute("id","ifa");
document.body.appendChild(ifa);
document.getElementById("ifa").setAttribute("src","https://github.com/sylee0424/psydel/issues/new");

function nxt() {
    var app=document.getElementsByClassName("pages"+pages);
    pages=pages+1;
    if (parseInt((strs.length-1)/3)<pages) {
        pages=0;
    }
    var app2=document.getElementsByClassName("pages"+pages);
    for (var i=0;i<app.length;i++) {
        app[i].style.visibility="hidden";
    }
    for (var i=0;i<app2.length;i++) {
        app2[i].style.visibility="visible";
    }
}

function prv() {
    var app=document.getElementsByClassName("pages"+pages);
    pages=pages-1;
    if (0>pages) {
        pages=parseInt((strs.length-1)/3);
    }
    var app2=document.getElementsByClassName("pages"+pages);
    for (var i=0;i<app.length;i++) {
        app[i].style.visibility="hidden";
    }
    for (var i=0;i<app2.length;i++) {
        app2[i].style.visibility="visible";
    }
}

function opn() {
    document.getElementsByClassName("offbutton")[0].style.visibility="hidden";
    for (var i=0;i<document.getElementsByClassName("pages0").length;i++) {
        document.getElementsByClassName("pages0")[i].style.visibility="visible";
    }
    for (i=0;i<document.getElementsByClassName("acts").length;i++) {
        document.getElementsByClassName("acts")[i].style.visibility="visible";
    }
}

function cls() {
    document.getElementsByClassName("offbutton")[0].style.visibility="visible";
    for (var i=0;i<document.getElementsByClassName("button").length;i++) {
        document.getElementsByClassName("button")[i].style.visibility="hidden";
    }
}

function led() {
    var br = document.getElementById("view_content").getElementsByTagName("div");
    for (var i=0;i<br.length;i++) {
        br[i].style.display="inline"
    }
}

function rtl() {
    var br = document.getElementById("view_content").getElementsByTagName("div");
    for (var i=0;i<br.length;i++) {
        br[i].style.display="block"
    }
}

function alts() {
    document.location.href="https://hitomi.la/index-korean-1.html";
}

function toggle(element,bool) {
    if (bool) {
        element.style.backgroundColor="#ffffff"
    }
    else {
        element.style.backgroundColor="gold"
    }
}

function bmk() {
    
    var d = new Date();
    var dmt=document.getElementById("ifa").contentWindow.document;
    var client1 = new ZeroClipboard( location.href );
    client1.on( "ready", function( readyEvent ) { client1.on( "aftercopy", function( event ) { } ); } );
    fireEvent(dmt.getElementById("issue_body"),"paste");
    var client2 = new ZeroClipboard( ""+d.getFullYear()+(d.getMonth()+1)+d.getDate()+d.getHours()+d.getMinutes()+d.getSeconds()+"" );
    client2.on( "ready", function( readyEvent ) { client2.on( "aftercopy", function( event ) { } ); } );
    fireEvent(dmt.getElementById("issue_title"),"paste");
    var hrf=dmt.getElementById("new_issue");
    if (hrf.click) {
        hrf.click();
    } else if (document.createEvent) {
        var eventObj = document.createEvent('MouseEvents');
        eventObj.initEvent('click', true, true);
        hrf.dispatchEvent(eventObj);
    }
}

function fireEvent(element, event) {
    if (document.createEventObject) {
        var evt = document.createEventObject();
        return element.fireEvent('on' + event, evt);
    }
    else {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true);
        return !(element.dispatchEvent(evt));
    }
}

function lnk(element) {
    if (!element) {
        element=document.body;
    }
    if (!(element.tagName)||element.tagName=="#text") {
        var nv=element.nodeValue;
        var ids=new Array();
        var at=nv.split(/(h?)ttp(s?):\/\/([a-zA-Z0-9\/\?\!\@\#\$\%\^\&\*\_\-\+\=\|\\:\.\,]*)/g);
        var ss=new Array();
        var aq=new Array();
        var id=0;
        ids[0]=0;
        var i=0;
        while (nv.indexOf(/(h?)ttp(s?):\/\/([a-zA-Z0-9\/\?\!\@\#\$\%\^\&\*\_\-\+\=\|\\:\.\,]*)/g,id)!=-1) {
            ids[i+1]=nv.indexOf(/(h?)ttp(s?):\/\/([a-zA-Z0-9\/\?\!\@\#\$\%\^\&\*\_\-\+\=\|\\:\.\,]*)/g,id);
            id=ids[i+1]+5;
            i++;
            if (i>100) {
               break;
            }
        }
        aq[0]=element;
        for (i=0;i<at.length-1;i++) {
            ss[i]=nv.substring(ids[i],ids[i+1]-at[i+1].length);
            if (i==0) {
                aq[1]=aq[0].splitText(ids[0]);
            }
            else {
                aq[i+1]=aq[i].splitText(ids[i]-ids[i-1]);
                aq[i]=aq[i].splitText(ss[i-1].length);
                aq[i].parentNode.removeChild(aq[i].previousSibling);
            }
            var a=document.createElement("a");
            a.setAttribute("href",ss[i].replace(/(h?)ttp(s?):\/\/([a-zA-Z0-9\/\?\!\@\#\$\%\^\&\*\_\-\+\=\|\\:\.\,]*)/g,"http$2://$3"));
            a.appendChild(document.createTextNode(ss[i]));
            aq[i].parentNode.insertBefore(a,aq[i+1]);
            if (i>100) {
                break;
            }
        }
    }
    else {
        for (var i=0; i<element.childNodes.length; i++) {
            lnk(element.childNodes[i]);
            if (i>1000) {
                break;
            }
        }
    }
}
var c=0;
var d=true;
function tst(e) {
    if (!e) {
        e=document.body;
    }
    if (e.tagName&&e.tagName!="#text") {
        for (var i=0;i<e.childNodes.length;i++) {
            tst(e.childNodes[i]);
        }
    }
    else {
        if (c>=10000&&d) {
            d=false;
            alert(e.nodeValue);
        }
    }
    c++;
}
