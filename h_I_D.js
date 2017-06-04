function kku() {
var a = "b"; // a or b
var galleryId = location.href.split("/")[location.href.split("/").length-1].split(".")[0];
if (location.href.indexOf("/reader/")!=-1) {
var i = j = galleryinfo.length;
var k = 0;
if (a=="a") {
document.getElementsByTagName("head")[0].innerHTML="";
document.getElementsByTagName("body")[0].innerHTML="";
while (i--) {
var img = document.createElement("img");
img.src="https://hitomi.la/galleries/"+galleryId+"/"+ galleryinfo[i].name;
document.body.insertBefore(img,document.body.firstChild);
}
}
else {
while (i--) {
var m = "";
if ((i+1)/10<1) {
m = m + "0";
}
if ((i+1)/100<1) {
m = m + "0";
}
var hrf = document.createElement("a");
hrf.name="hrf";
document.body.appendChild(hrf);
hrf = document.getElementsByName("hrf")[0];
hrf.href = "https://"+document.getElementsByTagName("img")[0].src.split(".hitomi.la/")[0].split("//")[1]+".hitomi.la/galleries/"+galleryId+"/"+ galleryinfo[i].name;
hrf.download = "hitomi/"+ galleryId + "/" + m + (i + 1) + ".jpg";
hrf.name = "href";
hrf.click();
}
}
}
else {
alert("갤러리/리더 화면이 아닙니다.");
}
}
var sss = document.createElement("script")
sss.appendChild(document.createTextNode("kku();"+kku.valueOf()));
document.body.appendChild(sss);
