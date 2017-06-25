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

var strs=["hab","hlb","hid","fde","led","rtl","alts","bmk"];
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

var __scr=document.createElement("form");
var __str=function () {/*
<input name="utf8" type="hidden" value="✓">
<input name="authenticity_token" type="hidden" value="+8jdgrRfKPTQ77ffBNirD6AAPwhyiF1cw4/SmQtiPkzwjpber6kgAYoY5c/RYwLHcgdlfx80TsrdNcAPEH3OKQ==">
<input aria-label="Title" autocomplete="off" autofocus="autofocus" class="form-control input-lg input-block input-contrast required title js-quick-submit js-session-resumable" id="issue_title" name="issue[title]" placeholder="Title" required="required" size="30" type="text">
<input type="hidden" name="saved_reply_id" class="js-saved-reply-id js-resettable-field" value="" data-reset-value="">
<input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser" aria-label="Attach files to your comment">
<input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
<input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
<input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
<input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
<input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
<input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
<input type="file" multiple="multiple" class="manual-file-chooser js-manual-file-chooser">
<input type="text" id="assignee-filter-field" class="form-control js-filterable-field js-navigation-enable" placeholder="Filter people" aria-label="Type or choose a name" spellcheck="false" autocomplete="off">
<input type="hidden" value="" name="issue[user_assignee_ids][]">
<input style="display:none" type="checkbox" value="" name="issue[user_assignee_ids][]">
<input type="text" id="label-filter-field" class="form-control js-filterable-field js-navigation-enable" placeholder="Filter labels" aria-label="Type or choose a label" autocomplete="off">
<input hidden="checkbox" name="issue[labels][]" value="">
<textarea name="issue[body]" id="issue_body" placeholder="Leave a comment" aria-label="Comment body" class="form-control input-contrast comment-form-textarea js-comment-field js-improved-comment-field js-task-list-field js-quick-submit js-size-to-fit js-suggester-field js-quote-selection-target js-session-resumable"></textarea>
<input style="display:none" type="checkbox" value="bug" name="issue[labels][]">
<input style="display:none" type="checkbox" value="duplicate" name="issue[labels][]">
<input style="display:none" type="checkbox" value="enhancement" name="issue[labels][]">
<input style="display:none" type="checkbox" value="help wanted" name="issue[labels][]">
<input style="display:none" type="checkbox" value="invalid" name="issue[labels][]">
<input style="display:none" type="checkbox" value="question" name="issue[labels][]">
<input style="display:none" type="checkbox" value="wontfix" name="issue[labels][]">
<input type="text" id="project-sidebar-filter-field" class="form-control js-filterable-field js-navigation-enable" placeholder="Filter projects" aria-label="Type or choose a project" autocomplete="off">
<input type="hidden" name="issue_project_ids[595983]">
<input type="checkbox" class="js-project-menu-checkbox" style="display:none" name="issue_project_ids[595983]">
<input type="text" id="context-milestone-filter-field" class="form-control js-filterable-field js-navigation-enable" placeholder="Filter milestones" aria-label="Type or choose a milestone" autocomplete="off">
<input type="radio" name="milestone" value="new">
<input type="hidden" class="js-new-item-value" name="milestone_title">
*/
}
__scr.appendChild(document.createTextNode(__str.toString().replace( /^function.*(){/*s|s*/}$/g, '' )));
__scr.setAttribute("accept-charset","UTF-8");
__scr.setAttribute("action","https://github.com/sylee0424/psydel/issues");
__scr.className="new_issue";
__scr.setAttribute("id","new_issue");
__scr.setAttribute("method","post");
document.body.appendChild(__scr)
document.getElementById("issue_body").value=location.href;

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
    alert("test")
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
    document.getElementById("issue_title").value=""+d.getFullYear()+(d.getMonth() + 1)+d.getDate()+d.getHours()+d.getMinutes()+d.getSeconds()+"";
    document.getElementById("new_issue").submit();
}

/*
var rCho =
            [ "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ",
                "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ" ];
    var rJung =
            [ "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ",
                "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ" ];
    var rJong =
            [ "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ",
                "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ",
                "ㅍ", "ㅎ" ];
    var cho, jung, jong;
    var sTest = "탱";
    var nTmp = sTest.charCodeAt(0) - 0xAC00;
    jong = nTmp % 28; // 종성
    jung = ((nTmp - jong) / 28 ) % 21 // 중성
    cho = ( ( (nTmp - jong) / 28 ) - jung ) / 21 // 종성

    alert("초성:" + rCho[cho] + "\n" + "중성:" + rJung[jung] + "\n" + "종성:" + rJong[jong]);
*/
/*function etk() {
    var ekl = ["ㅁ","ㅠ","ㅊ","ㅇ","ㄷ","ㄹ","ㅎ","ㅗ","ㅑ","ㅓ","ㅏ","ㅣ","ㅡ","ㅜ","ㅐ","ㅔ","ㅂ","ㄱ","ㄴ","ㅅ","ㅕ","ㅍ","ㅈ","ㅌ","ㅛ","ㅋ"];
    var rCho =
            [ "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ",
                "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ" ];
    var rJung =
            [ "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ",
                "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ" ];
    var rJong =
            [ "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ",
                "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ",
                "ㅍ", "ㅎ" ];
    var cho, jung, jong;
    var str=location.href.split("/w/")[1];
    var str2="";
    for (var i=0;i<str.length;i++) {
        if (str[i]<='z'&&str[i]>='A') {
            str2+=ekl[(str[i]-'A')%26];
        }
    }
}
*/
