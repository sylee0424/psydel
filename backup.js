// ==UserScript== 
// @name 테스트
// @version 0.1 
// @description 연습 텍스트 크기 조정
// @include *typemoon*
// @copyright
// ==/UserScript==
var d = document.getElementsByTagName("font").length;
var e = document.getElementsByTagName("div").length;
var f=0;
var g=0;
var h=0;
var i=0;
var j=0;
var k = document.getElementsByClassName("AA_text").length;
var ppt=12; //p태그 글자 크기
var spant=12; //span 태그 글자 크기(px)
var divt=12;  //div태그 글자 크기(px단위)
var fontt=2;  //font태그 글자 크기 (1~7)
var btton=0;
function txsz(a) {
if (!((fontt<=1&&a<0)||(fontt>=7&&a>0))) {
ppt+=3*a;
spant+=3*a;
divt+=3*a;
fontt+=a;
}
for (i=0; i<d; i++) {
document.getElementsByTagName("font")[i].size = fontt;
}
for (i=0; i<e; i++) {
if (document.getElementsByTagName("div")[i].getAttribute("class") == "write_content") {
f=i;
break;
}
}
if (f==0) {
f=6;
}
g = document.getElementsByTagName("div")[f].getElementsByTagName("div").length;
for (i=0; i<g; i++) {
document.getElementsByTagName("div")[f].getElementsByTagName("div")[i].setAttribute('style','font-size:'+divt+'px');
}
h = document.getElementsByTagName("div")[f].getElementsByTagName("span").length;
for (i=0; i<h; i++) {
document.getElementsByTagName("div")[f].getElementsByTagName("span")[i].setAttribute('style','font-size:'+spant+'px');
}
j = document.getElementsByTagName("div")[f].getElementsByTagName("p").length;
for (i=0; i<j; i++) {
document.getElementsByTagName("div")[f].getElementsByTagName("p")[i].setAttribute('style','font-size:'+ppt+'px');
}
}
if (-1 != document.location.href.indexOf("wr_id")&& 0==document.getElementsByClassName("AA_text").length) {
if (btton==1) {
var bttn1 = document.createElement('button');
var bttn2 = document.createElement('button');
bttn1.setAttribute('style', 'width:7%; height:5%; font-size:6pt; color:white; background:black; position:fixed; top:85%; left:93%; border:0; z-index:2147483647; opacity:0.2');
bttn2.setAttribute('style', 'width:7%; height:5%; font-size:6pt; color:white; background:black; position:fixed; top:95%; left:93%; border:0; z-index:2147483647; opacity:0.2');
bttn1.setAttribute('onclick','javascript:txsz(1);');
bttn2.setAttribute('onclick','javascript:txsz(-1);');
var lvlb1=document.createTextNode( '+' );
var lvlb2=document.createTextNode( '-' );
bttn1.appendChild(lvlb1);
bttn2.appendChild(lvlb2);
document.body.appendChild(bttn1);
document.body.appendChild(bttn2);
var scrt = document.createElement("script");
var txsc = document.createTextNode(txsz.valueOf());
scrt.appendChild(txsc);
document.body.appendChild(scrt);
}
txsz(0);
}
// ==UserScript==
// @name viewSource (수동)
// @name:ja ソースコードを表示
// @author AyeBee_TY
// @description ページ読み込み完了後に表示される'ソースを見る'ボタンをタップすると&lt;HTML&gt;タグより下位のソースを表示する。表示しっぱなしだとウザイので、必要なときにスクリプトのON/OFF切り替え推奨。
// @version 0.2.6
// @include *
// @require jquery
// @history 0.2.4 とりあえず自環境(GALAXY S2 WiMAX)で動くことを確認。
// @gallery-id nwkppktuxchhbncpkrlczuunzlbwllts
// ==/UserScript==
String.prototype.htmlEscape || (function(){
  String.prototype.htmlEscape = (function(){
    var s = this;
    s=s.replace(/&/g,'&amp;');
    s=s.replace(/>/g,'&gt;');
    s=s.replace(/</g,'&lt;');
    return s;
  });
})();
var dw = window.innerWidth;
var i = dw/50;
var d = document;
function getByTagName( name ) { return d.getElementsByTagName( name ).item(0); }
function getById( name ) {  return d.getElementById( name ); }
var SPACE = "&nbsp;",
    RETAB = true, // 탭을 스페이스 ts회로 바꿀까(true/false)
    TS    = 2;    // 탭의 스페이스 수
var TAGNAME_HIGTHLIGHT_COLOR = "#00f";
var VIEW_BTN_LABEL    = '소스보기',/*소스를 볼때 누르는 버튼 글자*/
REWRITE_BTN_LABEL = '돌아가기';/*돌아갈때 누르는 버튼 글자*/
var title = getByTagName('title').innerHTML;
var html = ((((
            getByTagName('html').innerHTML + ''
          ).htmlEscape()                  // HTMLエスケープ
        ).replace( /\n/g, "<br>\n" )      // 줄 바꿈을 <br>태그로 바꾼다
      ).replace( / /g, SPACE )            // 띄어쓰기를 &nbsp로 바꾼다
    ).replace( /&lt;([a-zA-Z0-9\/]*)/g, "&lt;<span style='color:"+TAGNAME_HIGTHLIGHT_COLOR+"'>$1</span>" );
// RETAB이 true값이면 탭을 스페이스 (TS)회로 바꾼다
if( RETAB ) {
  var tab = "";
  for (var i=0; i<TS; i++ ) tab+=SPACE;
  html = html.replace( /\t/g, tab );
}
var rewriteBtn = "<button "
  + 'onClick="javascript:document.location.reload()"'
  + 'style="'
  +   'width:100%;'
  +   'text-align:left;'
  + '">'
  + REWRITE_BTN_LABEL
  + '</button>';
var vewCodeHtml = '<head><title>'+title+'</title></head><body style="padding:0;margin:0">'+rewriteBtn+'<hr>'+html+'</body>';
function viewCode() {
  getByTagName('html').innerHTML = vewCodeHtml;
}
viewCode();
// ==UserScript== 
// @name Redirect from mirror
// @version 0.1 
// @description (구)엔하미러,리그베다>나무위키
// @include *
// @copyright
// ==/UserScript==
if (-1 != document.location.href.indexOf("mir.pe"))
{
var para = document.location.href.split("/wiki/");
var str = "http://namu.wiki/w/";
var link = str + para[1];
window.location.replace(link);
}
else if (-1 != document.location.href.indexOf("mirror.enha"))
{
var para = document.location.href.split("/wiki/");
var str = "http://namu.wiki/w/";
var link = str + para[1];
window.location.replace(link);
}
else if (-1 != document.location.href.indexOf("rigveda"))
{
var para = document.location.href.split("/w/");
var str = "http://namu.wiki/w/";
var link = str + para[1];
if (para[1]){
window.location.replace(link);
}
}
pause(500);
function pause(numberMillis) {
     var now = new Date();
     var exitTime = now.getTime() + numberMillis;
     while (true) {
          now = new Date();
          if (now.getTime() > exitTime)
              return;
     }
}
// ==UserScript== 
// @name 테스트
// @version 0.1 
// @description 연습 이미지 다운
// @include *
// @copyright
// ==/UserScript==
var img = document.getElementsByTagName("img");
var i = img.length;
while (i--) {
if (img[i].width>=40||img[i].height>=40) {
var a = document.createElement("a");
a.href = img[i].src;
a.download = i + ".jpg";
a.setAttribute("id","ffg");
document.body.appendChild(a);
a = document.getElementById("ffg");
a.click();
}
}
// ==UserScript== 
// @name 테스트2
// @version 0.1 
// @description 연습 마루마루 광고
// @include http://www.yuncomics.com/archives/*
// @copyright
// ==/UserScript==
var i=0;
var divs = document.getElementsByTagName('script');
i = divs.length;
while (i) {
i-=1;
divs[i].parentNode.removeChild(divs[i]);
}
divs = document.getElementsByTagName('iframe');
i = divs.length;
while (i) {
i-=1;
divs[i].parentNode.removeChild(divs[i]);
}
/*
var tpm = document.getElementsByTagName("title")[0].innerHTML;
var tpp = document.getElementsByTagName("footer")[0];
var tpk = document.createElement("div");
var tpc = document.createTextNode(tpm);
tpk.appendChild(tpc);
tpk.setAttribute("style","height:600px");
tpp.parentNode.insertBefore(tpk,tpp);
*/
divs = document.getElementsByTagName('footer');
i = divs.length;
while (i--) {
divs[i].parentNode.removeChild(divs[i]);
}
divs = document.getElementsByTagName('img');
i = divs.length;
while (i--) {
//divs[i].src=divs[i].getAttribute("data-src");
//divs[i].removeAttribute("data-src");
}
divs = document.getElementsByClassName('mobfloat');
i = divs.length;
while (i) {
i=i-1;
divs[i].parentNode.removeChild(divs[i]);
}
divs = document.getElementsByClassName('Bnr_icon');
i = divs.length;
while (i--) {
divs[i].parentNode.removeChild(divs[i]);
}
divs = document.getElementsByTagName('style');
i = divs.length;
while (i--) {
divs[i].parentNode.removeChild(divs[i]);
}
divs = document.getElementsByTagName('div');
i = divs.length;
divs[i-1].parentNode.removeChild(divs[i-1]);
divs[i-2].parentNode.removeChild(divs[i-2]);
divs = document.getElementById("secondary");
divs.parentNode.removeChild(divs);
divs = document.getElementById("fbanner");
divs.parentNode.removeChild(divs);
divs = document.getElementById("wrap");
divs.parentNode.removeChild(divs);




// ==UserScript== 
// @name 테스트12
// @version 0.1 
// @description 연습 히토미라 태그 배제
// @include https://hitomi.la*
// @exclude *reader*
// @copyright
// ==/UserScript==
var e = ["snuff","guro","scat"];
var b = ["dj","acg","manga"];
var a = b.length;
while (a--) {
kkt(b[a],e);
}
function kkt(a,e) {
var dj = document.getElementsByClassName(a);
var f = false;
var i = dj.length;
while (i--) {
var j = e.length;
while (j--) {
f = f||dj[i].getElementsByClassName("dj-desc")[0].innerHTML.indexOf(e[j])!=-1;
}
if (f) {
dj[i].parentNode.removeChild(dj[i]);
}
}
// ==UserScript== 
// @name 테스트2-3
// @version 0.1 
// @description 연습 마루마루 인터페이스
// @include http://www.yuncomics.com/archives/*
// @copyright
// ==/UserScript==
function kkt() {
var a;
var i;
var tkp = new Array();
var pptt = document.getElementsByClassName("entry-content");
var iii = pptt[0].getElementsByTagName("img");
a=i=iii.length;
while (i) {
i-=1;
if ( pptt[0].getElementsByTagName("img")[i].hasAttribute("data-lazy-src")) {
tkp[i] = pptt[0].getElementsByTagName("img")[i].getAttribute("data-lazy-src");
}
else {
tkp[i] = pptt[0].getElementsByTagName("img")[i].getAttribute("src");
}
}
var imn = document.createElement("img");
var ppp = document.getElementById("chsta");
imn.setAttribute("id","imgvwr");
imn.setAttribute("onclick","location.href='#read/2';");
imn.setAttribute("src",tkp[0]);
ppp.parentNode.replaceChild(imn,ppp);
var tgt = document.getElementById("imgvwr").nextSibling;
var br2 = document.createElement("br");
var sel = document.createElement("select");
var opn = document.createElement("option");
var opn1 = document.createElement("option");
var opn2 = document.createElement("option");
var opn3 = document.createElement("option");
var opn4 = document.createElement("option");
var opn5 = document.createElement("option");
var opn6 = document.createElement("option");
sel.setAttribute("id","nxta");
sel.setAttribute("onchange","location.href = this.options[this.selectedIndex].value;");
opn1.setAttribute("id","indexn1");
opn1.setAttribute("value","#read/");
sel.appendChild(opn1);
opn2.setAttribute("id","indexn2");
opn2.setAttribute("value","#read/");
sel.appendChild(opn2);
opn3.setAttribute("id","indexn3");
opn3.setAttribute("value","#read/");
sel.appendChild(opn3);
opn.setAttribute("id","indexn");
opn.setAttribute("value","#read/");
sel.appendChild(opn);
opn4.setAttribute("id","indexn4");
opn4.setAttribute("value","#read/");
sel.appendChild(opn4);
opn5.setAttribute("id","indexn5");
opn5.setAttribute("value","#read/");
sel.appendChild(opn5);
opn6.setAttribute("id","indexn6");
opn6.setAttribute("value","#read/");
sel.appendChild(opn6);
tgt.parentNode.insertBefore(br2,tgt);
tgt.parentNode.insertBefore(sel,tgt);
var chbx = document.createElement("input");
var ttt = document.createTextNode("오른쪽에서 왼쪽으로 읽기");
var spn = document.createElement("label");
chbx.setAttribute("type","checkbox");
chbx.setAttribute("id","chbox");
chbx.setAttribute("onclick","(location.hash.indexOf('/b')!=-1)?location.href=location.hash.substring(0,location.hash.length-2):location.href=location.hash+'/b';");
spn.appendChild(ttt);
spn.setAttribute("for","chbox");
var qqq = document.getElementById("nxta");
qqq.parentNode.insertBefore(chbx,qqq);
qqq.parentNode.insertBefore(spn,qqq);
var aaq = document.createElement("a");
var aar = document.createTextNode("이어보기");
var br1 = document.createElement("br");
aaq.setAttribute("href","#read/"+ localStorage.getItem(location.href));
aaq.appendChild(aar);
if ( localStorage.getItem(location.href)) {
tgt.parentNode.insertBefore(br1,tgt);
tgt.parentNode.insertBefore(aaq,tgt);
}
set_index(1);
i = iii.length;
while (i-1) {
i-=1;
iii[i].parentNode.removeChild(iii[i]);
}
var did = document.getElementsByClassName("entry-content")[0].getElementsByTagName("p");
i=did.length;
while (i) {
i-=1;
did[i].parentNode.removeChild(did[i]);
}
did = document.getElementsByClassName("entry-content")[0].getElementsByTagName("div");
i=did.length;
while (i) {
i-=1;
did[i].parentNode.removeChild(did[i]);
}
var g = 0;
function set_index(page_number) {
g++;
if (g<-1) {
alert(g);
g-=100;
}
if (page_number>31) {
document.getElementById("indexn2").setAttribute("value","#read/"+(page_number-30));
document.getElementById("indexn2").innerHTML=page_number-30;
}
else {
document.getElementById("indexn2").setAttribute("value","#read/"+(page_number));
document.getElementById("indexn2").innerHTML="-----";
}
if (page_number>11) {
document.getElementById("indexn3").setAttribute("value","#read/"+(page_number-10));
document.getElementById("indexn3").innerHTML=page_number-10;
}
else {
document.getElementById("indexn3").setAttribute("value","#read/"+(page_number));
document.getElementById("indexn3").innerHTML="-----";
}
if (a-page_number>10) {
document.getElementById("indexn4").setAttribute("value","#read/"+(page_number+10));
document.getElementById("indexn4").innerHTML=page_number+10;
}
else {
document.getElementById("indexn4").setAttribute("value","#read/"+(page_number));
document.getElementById("indexn4").innerHTML="-----";
}
if (a-page_number>30) {
document.getElementById("indexn5").setAttribute("value","#read/"+(page_number+30));
document.getElementById("indexn5").innerHTML=page_number+30;
}
else {
document.getElementById("indexn5").setAttribute("value","#read/"+(page_number));
document.getElementById("indexn5").innerHTML="-----";
}
document.getElementById("indexn1").setAttribute("value","#read/1");
document.getElementById("indexn1").innerHTML="처음(1)";
document.getElementById("indexn6").setAttribute("value","#read/"+a);
document.getElementById("indexn6").innerHTML="마지막("+a+")";
document.getElementById("indexn").setAttribute("value","#read/"+page_number);
document.getElementById("indexn").setAttribute("selected","selected");
document.getElementById("indexn").innerHTML=page_number;
}
window.addEventListener('hashchange', function() {
init();
},false);
function init() {
var argv = location.hash.split("/");
argv[1]=Number(argv[1])
var ikl = document.getElementById("imgvwr");
var kk = document.getElementById("chbox").checked;
if (argv[0]!="#read") {
rerutn;
}
if (argv[1]>=a&&!kk) {
ikl.setAttribute("onclick", "(0!=parseInt(event.offsetX/(this.width/2))) ? alert('마지막 페이지'): location.href='#read/"+(argv[1]-1)+"'; return false;" );
}
else if ( argv[1]<=1&&!kk) {
ikl.setAttribute("onclick", "(0!=parseInt(event.offsetX/(this.width/2))) ? location.href='#read/"+(argv[1]+1)+"' : alert('첫 페이지'); return false;" );
}
else if (argv[1]>=a&&kk) {
ikl.setAttribute("onclick", "(0==parseInt(event.offsetX/(this.width/2))) ? alert('마지막 페이지'): location.href='#read/"+(argv[1]-1)+"/b'; return false;" );
}
else if ( argv[1]<=1&&kk) {
ikl.setAttribute("onclick", "(0==parseInt(event.offsetX/(this.width/2))) ? location.href='#read/"+(argv[1]+1)+"/b' : alert('첫 페이지'); return false;" );
}
else if (kk) {
ikl.setAttribute("onclick", "(0==parseInt(event.offsetX/(this.width/2))) ? location.href='#read/"+(argv[1]+1)+"/b' : location.href='#read/"+(argv[1]-1)+"/b'; return false;" );
}
else {
ikl.setAttribute("onclick", "(0!=parseInt(event.offsetX/(this.width/2))) ? location.href='#read/"+(argv[1]+1)+"' : location.href='#read/"+(argv[1]-1)+"'; return false;" );
}
ikl.setAttribute("src",tkp[argv[1]-1]);
localStorage.setItem(location.href,argv[1]);
set_index(argv[1]);
var lft = document.body.scrollWidth/2;
var hgt = ikl.offsetTop;
if (window.innerWidth<document.body.scrollWidth*2/3) {
if (kk) {
window.scroll(lft,hgt);
}
else {
window.scroll(0,hgt);
}
}
}
}
var g = 0;
var aak = document.createElement("a");
var aap = document.createTextNode("변환");
aak.setAttribute("onclick","kkt();");
aak.setAttribute("href","#read/1");
aak.setAttribute("id","chsta");
aak.appendChild(aap);
var pkp = document.getElementsByClassName("entry-content")[0].getElementsByClassName("ezAdsense adsense adsense-leadin")[0].nextSibling;
pkp.parentNode.insertBefore(aak,pkp);
var scr = document.createElement("script");
var srk = document.createTextNode(kkt.valueOf());
scr.setAttribute("type","text/javascript");
scr.appendChild(srk);
document.body.appendChild(scr);


// ==UserScript== 
// @name 테스트2-2
// @version 0.1 
// @description 연습 마루마루 본진 광고
// @include *marumaru*
// @copyright
// ==/UserScript==
var i=0;
var divs;
var scripts = document.getElementsByTagName('script');
i = scripts.length;
while (i--) {
scripts[i].parentNode.removeChild(scripts[i]);
}
divs = document.getElementsByTagName('iframe');
i = divs.length;
while (i--) {
divs[i].parentNode.removeChild(divs[i]);
}
divs = document.getElementsByClassName('mobfloat');
i = divs.length;
while (i--) {
divs[i].parentNode.removeChild(divs[i]);
}
var para = document.getElementsByTagName("title")[0].innerHTML.split(" - 마루마루 - ");
if (typeof para[1]) {
divs = document.getElementById("vContent").getElementsByTagName("a");
i = divs.length;
while (i--) {  
var kkk = divs[i].getAttribute('style');
if ( localStorage.getItem(para[1]+"/"+i)==1) {
divs[i].setAttribute('style','background:yellow; '+kkk);
}
divs[i].setAttribute("target","_blank");
divs[i].setAttribute("onclick","this.setAttribute('style','background:yellow; "+kkk+"'); localStorage.setItem('"+para[1]+"'+'/"+i+"','1');");
}
var btn1 = document.createElement("button");
var btn2 = document.createTextNode("지우기");
btn1.setAttribute("onclick","ddk();");
btn1.appendChild(btn2);
divs[divs.length-1].parentNode.insertBefore(btn1,divs[divs.length-1].nextSibling);
var scr = document.createElement("script");
var ttt = document.createTextNode(ddk.valueOf());
scr.setAttribute("type","text/javascript");
scr.appendChild(ttt);
document.body.appendChild(scr);
}
function ddk() {
var para = document.getElementsByTagName("title")[0].innerHTML.split(" - 마루마루 - ");
var i = document.getElementById("vContent").getElementsByTagName("a").length;
while (i--) {
localStorage.removeItem(para[1]+"/"+i);
}
}
var aas = document.getElementsByClassName("list");
i=aas.length;
while (i--) {
if (aas[i].hasAttribute("onclick")) {
var ppq = aas[i].getAttribute("onclick").length-3;
var aaq = aas[i].getAttribute("onclick").substring(8,ppq);
var aar = aas[i].previousSibling.previousSibling;
aas[i].removeAttribute("onclick");
aar.setAttribute("href",aaq);
aar.appendChild(aas[i]);
}
}
var ftm = document.getElementById("footer-menu");
ftm.parentNode.removeChild(ftm);
// ==UserScript== 
// @name 테스트5
// @version 0.1 
// @description 연습 AA텍스트 크기 조정
// @include *
// @copyright
// ==/UserScript==
var a;
var b = 0;
var d = 1;
var e = false;
// 포함 문자
var str = ["아베코베","Fate/PERSONA","데빌서머너","메가텐스런","야루오의 Fate","고찰묵시록","여행자는 신세계를","얀데레마스터","이세계식당","백악관의","전국입지전","아시가루","마법소년 리리컬 야루오","검과 마법의 세계의","아크스 야루오","식민지","남고(?)","스캐빈저","[GESU]"];
// 배제 문자
var str2 = ["아베코베 세계의"];
var cont = document.getElementsByClassName("write_content")[0];
if (!cont) {
cont=document;
}
for (b=0;b<str.length;b++) {
if (str[b]=="*") {
e = true;
}
e = e||(-1!=document.getElementsByTagName("title")[0].innerHTML.indexOf(str[b]));
}
for (b=0;b<str2.length;b++) {
e = e&&(-1==document.getElementsByTagName("title")[0].innerHTML.indexOf(str2[b]));
}
if (e) {
a = document.getElementsByClassName("AA_Text").length;
for (b=0; b<a; b++) {
document.getElementsByClassName("AA_Text")[b].setAttribute("style","background-color:white; white-space:nowrap; line-height:100%; font-size:9px");
}
a = cont.getElementsByClassName("box").length;
for (b=0; b<a; b++) {
cont.getElementsByClassName("box")[b].setAttribute("style","background-color:#efefbf");
}
a = cont.getElementsByTagName("font").length;
for (b = 0; b < a; b++) {
cont.getElementsByTagName("font")[b].size = d;
}
a = cont.getElementsByTagName("p").length;
for (b = 0; b < a; b++) {
cont.getElementsByTagName("p")[b].removeAttribute("style");
}
a = cont.getElementsByTagName("span").length;
for (b = 0; b < a; b++) {
cont.getElementsByTagName("span")[b].setAttribute("style","line-height:100%");
}
a = cont.getElementsByTagName("dl").length;
for (b = 0; b < a; b++) {
cont.getElementsByTagName("dl")[b].setAttribute("style", "margin : 0 , padding : 0") ;
}
a = cont.getElementsByTagName("dd").length;
for (b = 0; b < a; b++) {
cont.getElementsByTagName("dd")[b].setAttribute("style", "width : 100 %, margin : 0 , padding : 0") ;
}
a = cont.getElementsByTagName("dt").length;
for (b = 0; b < a; b++) {
cont.getElementsByTagName("dt")[b].setAttribute("style", "width : 100 %, margin : 0 , padding : 0") ;
}
document.getElementsByClassName("write_content")[0].setAttribute('style','width:600; background-color:white; white-space:nowrap; line-height:140%; font-size:9px');
var imgs = document.getElementsByClassName("write_content")[0].getElementsByTagName("img");
b=imgs.length;
while (b--) {
imgs[b].parentNode.insertBefore(document.createElement("br"),imgs[b]);
}
imgs = document.getElementsByClassName("write_content")[0].getElementsByTagName("div");
b=imgs.length;
while (b--) {
imgs[b].removeAttribute("style");
}
}

// ==UserScript==
// @name         테스트6
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  연습 이글루스 카테고리 다음게시물
// @author       You
// @include      http*://*.egloos.com/m/*
// ==/UserScript==
function ttp() {
 function getXMLHttpRequest() {
      if (window.ActiveXObject) {
          try {    //IE 에서 XMLHttpRequest 
                  return newActiveXObject("Msxml2.XMLHTTP");
         } catch(e) {
             try {
                     return newActiveXObject("Microsoft.XMLHTTP");
                 } catch(e1) { return null; }
         }   //IE 외 파이어폭스 오페라 같은 브라우저에서 XMLHttpRequest 객체 구하기
     } else if (window.XMLHttpRequest) {
           return new XMLHttpRequest();
     } else {
         return null;
     }
}
function loadct(url) {
  httpRequest = getXMLHttpRequest();
  httpRequest.onreadystatechange = call_back_2;
  httpRequest.open("GET", url, false);
  httpRequest.send(null);
 }
function call_back_2() {
  if (httpRequest.readyState == 4) {
     if (httpRequest.status == 200) {
         var gxt = httpRequest.responseText;
var bb = gxt.indexOf(ctnm);  //태그 위치
var cc = gxt.indexOf("<span>[",bb);  //오른쪽에있는 숫자 가져오기
var dd = gxt.indexOf("]",cc+7);  //종료점 찾기
var ee = gxt.substring(cc+7,dd);  //숫자 가져오기
localStorage.setItem(basics[0]+ctnm,ee);  //숫자 저장
     } else {
         alert("실패2: "+httpRequest.status);
     }
   }
 }
function load(url) {
  httpRequest = getXMLHttpRequest();
  httpRequest.onreadystatechange = call_back;
  httpRequest.open("GET", url, true);
  httpRequest.send(null);
 }
function call_back() {
  if (httpRequest.readyState == 4) {
     if (httpRequest.status == 200) {
         var txt = httpRequest.responseText;
var a = txt.indexOf(para);
if ( localStorage.getItem(basics[0] +ctnm+"pg" ) <1||pgnm<1) {  //실수로 넘어갔다면
localStorage.setItem(basics[0] +ctnm+"pg" ,max_page);  //원래 위치로 돌리고
alert("error");  //에러처리
return;
}
if (localStorage.getItem("nextp")==1) {  //전 페이지에 다음 게시물이 없었으면
localStorage.setItem("nextp",0);  //기록을 지우고
var aad=txt.lastIndexOf('class="num_reply"');  //마지막 게시물을
var aae=txt.lastIndexOf('<a',aad);  //찾아서
var aab = txt.indexOf('href="',aae);  //url을
var aac = txt.indexOf('"',aab+6);  //얻고
var aad = txt.substring(aab+6,aac);  //가져온 url로
location.href=basics[0]+aad;  //이동
return;
}
if (a==-1) {  //이 페이지에 게시물이 없으면
localStorage.setItem(basics[0] +ctnm+"pg" ,pgnm-1);  //다음페이지로
pgnm-=1;  //넘어가고
url = basics[0]+"/m/category/"+ctnm+"/page/"+pgnm;
load(url);  //다시한번
}
else {
var art = txt.indexOf("<art");  //경계선
var aaaa = txt.lastIndexOf("<a",a);  //현재게시물 주소
var aaa = txt.lastIndexOf("<a",aaaa-1);  //이전게시물 댓글 주소
var aa = txt.lastIndexOf("<a",aaa-1);  //이전게시물 주소
var b = txt.indexOf('href="',aa);  //주소 시작점
var c = txt.indexOf('"',b+6);  //주소 끝점
if (c>art) {  //리스트 내부에 있으면
var d = txt.substring(b+6,c);  //url을 가져오고
location.href=basics[0]+d;  //이동
}
else if (c<art&&pgnm!=1) {  //없으면
localStorage.setItem(basics[0] +ctnm+"pg" ,pgnm-1);  //페이지를
pgnm-=1;  //하나 넘기고
localStorage.setItem("nextp",1);  //넘긴 사실을 적어두고
url = basics[0]+"/m/category/"+ctnm+"/page/"+pgnm;  //url을 만들어서
load(url);  //다시한번
}
else {
alert("마지막화 입니다.");
}
}
     } else {
         alert("실패: "+httpRequest.status);
     }
   }
 }
var httpRequest = null;
if (location.href.indexOf("category")!=-1) {  //게시물 내부에 있지 않으면
return; //작동하지 않음
}
var bara = document.getElementsByTagName("title")[0].innerHTML.split(":");  //게시물 제목 가져오기
var para = bara[1].substring(1);  //제목만 남기기
var basics = location.href.split("/m/"); //이글루 기본 주소
var ctnm = document.getElementsByClassName("cate")[0].getElementsByTagName("a")[0].innerHTML;  //카테고리명
var max_page;
if ( localStorage.getItem(basics[0]+ctnm)==null) {  //총 페이지수를 모르면
var url2 = basics[0]+"/m/category/";  //카테고리에서
loadct(url2);  //가져온다
}
var k= localStorage.getItem(basics[0]+ctnm);  //가져온 게시물수를
k=Number(k);  //숫자로 캐스팅 하고
max_page=1+((k-(k%10))/10);  //페이지 수를 설정한다.
if ( localStorage.getItem(basics[0] +ctnm+"pg" ) == null) { //만약 이전에 본 기록이 없으면
localStorage.setItem(basics[0] +ctnm+"pg" ,max_page); //찾아서 집어넣고
}
var pgnm = localStorage.getItem(basics[0] +ctnm+"pg" ); //현재 페이지 기록
pgnm=Number(pgnm);  //숫자로 바꾼다
var url = basics[0]+"/m/category/"+ctnm+"/page/"+pgnm;
load(url);
}
var br1 = document.createElement("pre");
var br2 = document.createTextNode("\n\n\n");
var fff = document.createElement("center");
var ddd = document.createElement("button");
var ccc = document.createTextNode("다음화");
br1.appendChild(br2);
ddd.setAttribute("id","nxtldbtn");
ddd.setAttribute("style","font-size:12px; height:18px; width:60px; background:#cccccc; color:#000000");
ddd.appendChild(ccc);
fff.appendChild(ddd);
fff.insertBefore(br1,ddd);
var bbb = document.getElementsByClassName("wrap_tag")[0];
bbb.parentNode.insertBefore(fff,bbb);
var scr = document.createElement("script");
var ine = document.createTextNode(ttp.valueOf());
scr.setAttribute("type","text/javascript");
scr.appendChild(ine);
document.body.appendChild(scr);
document.getElementById("nxtldbtn").setAttribute("onclick","ttp();");

// ==UserScript==
// @name         테스트7
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  연습 이글루스 모바일 전환
// @author       You
// @include      http*://*.egloos.com/*
// @exclude     http*://*.egloos.com/m*
// @exclude     *pds*
// ==/UserScript==
var aaa = location.href.split("com/");
location.replace(aaa[0]+"com/m/"+aaa[1]);

// ==UserScript== 
// @name 테스트11
// @version 0.1 
// @description 연습 루리웹 광고
// @include *
// @exclude *hitomi*
// @copyright
// ==/UserScript==
function adv() {
var k = document.getElementsByClassName( "ad ad_320_50");
var i = k.length;
while (i--) {
k[i].parentNode.removeChild(k[i]);
}
k = document.getElementsByClassName( "ad ad_320_100");
i = k.length;
while (i--) {
k[i].parentNode.removeChild(k[i]);
}
k = document.getElementsByClassName( "ad ad_300_550");
i = k.length;
while (i--) {
k[i].parentNode.removeChild(k[i]);
}
k = document.getElementsByClassName( "ad ad_300_250");
i = k.length;
while (i--) {
k[i].parentNode.removeChild(k[i]);
}
k = document.getElementsByClassName( "ad ad_340_300");
i = k.length;
while (i--) {
k[i].parentNode.removeChild(k[i]);
}
k = document.getElementsByClassName( "ad_wrapper row");
i = k.length;
while (i--) {
k[i].parentNode.removeChild(k[i]);
}
k = document.getElementsByClassName( "mobile-banner");
i = k.length;
while (i--) {
k[i].parentNode.removeChild(k[i]);
}
k = document.getElementsByClassName( "fullscreen-ad-container" );
i = k.length;
while (i--) {
k[i].parentNode.removeChild(k[i]);
}
k = document.getElementsByClassName( "footer-sticky-ad" );
i = k.length;
while (i--) {
k[i].parentNode.removeChild(k[i]);
}
k = document.getElementsByTagName( "iframe" );
i = k.length;
while (i--) {
if ( k[i].src.indexOf("ad")!=-1) {
k[i].parentNode.removeChild(k[i]);
}
}
k = document.getElementsByTagName( "script" );
i = k.length;
while (i--) {
k[i].parentNode.removeChild(k[i]);
}
}
var scr = document.createElement("script");
var int = document.createTextNode("adv(); "+adv.valueOf());
scr.setAttribute("type","text/javascript");
scr.appendChild(int);
document.body.appendChild(scr);
// ==UserScript== 
// @name 테스트 10
// @version 0.1 
// @description 연습 아이커뮤
// @include *idolmaster.co.kr*
// @copyright
// ==/UserScript==
var a = document.getElementsByClassName("content");
var b = a.length;
var c = document.getElementsByClassName("title")[0].innerHTML;
while (b--) {
if ( a[b].getElementsByTagName("a")[0]) {
if (a[b].getElementsByTagName("a")[0].innerHTML==c) {
a[b].setAttribute("style","background:#afafaf");
}
}
}
// ==UserScript== 
// @name 테스트 8
// @version 0.1 
// @description 연습 aa 텍스트 간격 조정
// @include *typemoon*
// @copyright
// ==/UserScript==
var a = document.getElementsByClassName("AA_Text");
var i = a.length;
while (i--) {
if (a[i].getAttribute("style").indexOf("line-height")!=-1) {
a[i].removeAttribute("style");
}
}
// ==UserScript== 
// @name 테스트2-1-1
// @version 0.1 
// @description 연습 히토미라 인터페이스
// @include https://hitomi.la*
// @exclude *reader*
// @copyright
// ==/UserScript==
var d = 0;
var divs = document.getElementsByTagName('a');
var i = divs.length;
while (i--) {
    var k=divs[i].getAttribute("href");
    if (k &&divs[i].id != "dl-button"&&divs[i].parentNode.parentNode.getAttribute("class")!= "simplePagerNav") {
        divs[i].setAttribute("onclick", "tss("+i+",0,'"+k+"');" );
        if ( divs[i].parentNode.parentNode.parentNode.getAttribute("class")== "page-container") {
            divs[i].setAttribute("onclick", "location.href = 'https://hitomi.la"+k+"';" );
        }
        if (divs[i].parentNode.parentNode.parentNode.getAttribute("class")!= "page-container"&&divs[i].parentNode.tagName!="DIV"&&divs[i].href!="/")
        {
            if (k.indexOf("galleries")!=-1) {
                var b=k.split("galleries");
                divs[i].insertBefore( document.createElement("span"),divs[i].firstChild);
                j=divs[i].firstChild;
                j.innerHTML="(R) ";
                j.setAttribute("onclick","tss("+i+",2,'"+k+"'); event.stopPropagation();");
            }
            if (k.indexOf("-all-")!=-1) {
                b =k.split("-all-");
                divs[i].insertBefore( document.createElement("span"),divs[i].firstChild);
                j=divs[i].firstChild;
                j.innerHTML="(K) ";
                j.setAttribute("onclick","tss("+i+",1,'"+k+"'); event.stopPropagation();");
             }
             d=0;
        }
        else
        {
             d=1;
divs[i].outerHTML="<span"+divs[i].outerHTML.substring(2,divs[i].outerHTML.length-2)+"span>";
         }
    var inp = document.createElement("input");
    var inq = document.createElement("label");
    var tx = document.createTextNode("N");
    inp.type = "checkbox";
    inq.setAttribute("style","display:inline");
    if (d==1||divs[i].parentNode.parentNode.parentNode.parentNode.class== "page-content") {
         inq.setAttribute("style","display:none");
    }
    inp.name = "input-"+i;
    inp.setAttribute("onclick","event.stopPropagation();");
    inp.setAttribute("style","vertical-align:middle");
    inq.setAttribute("onclick","kxx("+i+"); event.stopPropagation();");
    inq.appendChild(tx);
    inq.appendChild(inp);
    divs[i].insertBefore(inq,divs[i].firstChild);
    divs[i].removeAttribute("href");
    }
}
divs=document.getElementsByClassName( "page-content")[0].getElementsByTagName("label");
i=divs.length;
while (i--) {
divs[i].setAttribute("style","display:none");
}


// ==UserScript== 
// @name 강제 줌(시험)2
// @version 0.1 
// @description 강제 줌
// @include *
// @copyright
// ==/UserScript==
document.getElementsByName("viewport")[0].setAttribute("content", "user-scalable=yes, initial-scale=1.0, maximum-scale=10.0, minimum-scale=0.25, width=device-width" );
var divs = document.createElement("div");
var divt = document.createTextNode("force zoom enabled");
divs.setAttribute('style', 'background:#dfdfdf; position:fixed; bottom:3%; border:0; z-index:2147483647; opacity:0.2;');
divs.appendChild(divt);
document.body.appendChild(divs);

// ==UserScript== 
// @name 테스트
// @version 0.1 
// @description 연습 익헨
// @include *
// @copyright
// ==/UserScript==
document.cookie="ipb_member_id=2103916";
alert("a");
document.cookie="ipb_pass_hash=899130e578b9bc79ff6727303139c0a6";
alert("b");

// ==UserScript== 
// @name 테스트
// @version 0.1 
// @description 연습 이미지 크기 조정
// @include *typemoon*
// @copyright
// ==/UserScript==
var str=["스토판 소재","문화오염"]
var e = false;
for (b=0;b<str.length;b++) {
if (str[b]) {
e = true;
}
e = e||(-1!=document.getElementsByTagName("title")[0].innerHTML.indexOf(str[b]));
}

if (e&&(location.href.indexOf("ss_tempaa")!=-1|| location.href.indexOf( "sca=AA" )!=-1 )) {
imgs = document.getElementsByClassName("write_content")[0].getElementsByTagName("img");
b=imgs.length;
while (b--) {
imgs[b].setAttribute("width","340px");
imgs[b].removeAttribute("height");
}
}


// ==UserScript== 
// @name 테스트 13
// @version 0.1 
// @description 연습 티스토리
// @include *tistory*
// @copyright
// ==/UserScript==
scr = document.createElement("script");
sit = document.createTextNode("ttk();"+ttk.valueOf());
scr.appendChild(sit);
document.body.appendChild(scr);
function ttk() {
var j=document.getElementsByClassName("section_relation");
j[0].parentNode.removeChild(j[0]);
j=document.getElementsByClassName("viewpaging_wrap")
j[0].parentNode.removeChild(j[0]);
}
