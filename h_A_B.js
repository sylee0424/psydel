var i=0;
var b;
var galleryId = location.href.split("/")[location.href.split("/").length-1].split(".")[0];
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
var scr = document.createElement('script');
scr.src='https://hitomi.la/galleries/' + galleryId + '.js';
document.body.appendChild(scr);
divs = document.getElementsByTagName('style');
i = divs.length;
while (i--) {
divs[i].parentNode.removeChild(divs[i]);
}
if ( document.getElementsByClassName("page-container").length !=0) {
divs =document.getElementsByClassName("page-container")[0].getElementsByTagName("li");
i=divs.length;
while (i--) {
if (divs[i].innerHTML==location.href.split("-")[location.href.split("-").length-1].split(".")[0])
{
divs[i].setAttribute("style","color:#ff00ff");
}
}
}
function tss(i,j,k) {
var url;
if (j==0) {
url = "https://hitomi.la" + k;
}
else if (j==1) {
url = "https://hitomi.la" + k.split("-all-")[0] + "-korean-" + k.split("-all-")[1];
}
else {
url = "https://hitomi.la" + k.split("galleries")[0] + "reader" + k.split("galleries")[1] +"#1";
}
if (document.getElementsByName("input-"+i)[0].checked=="1") {
window.open(url)
}
else {
location.href = url;
}
}
var scr = document.createElement("script");
var inn = document.createTextNode(tss.valueOf());
scr.type = "text/javascript";
scr.appendChild(inn);
document.body.appendChild(scr);
function kxx(i) {
if (document.getElementsByName("input-"+i)[0].getAttribute('checked')=='1') {
document.getElementsByName( "input-"+i )[0].setAttribute('checked','0');
}
else {
document.getElementsByName( "input-"+i )[0].setAttribute('checked','1');
}
}
scr = document.createElement("script");
inn = document.createTextNode(kxx.valueOf());
scr.type = "text/javascript";
scr.appendChild(inn);
document.body.appendChild(scr);
document.ontouchstart= "event.stopImmediatePropagation();" ;
document.body.ontouchstart= "event.stopImmediatePropagation();" ;
document.body.onmousedown= "event.stopImmediatePropagation();" ;
window.onbeforeunload= "event.stopImmediatePropagation();" ;
