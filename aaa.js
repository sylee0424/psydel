
var req=new XMLHttpRequest();
req.open("GET","https://hitomi.la/index-korean-1.html",true);
req.onreadystatechange = getpage;
req.send(null);

window.addEventListener("hashchange", hashchanged , false);

function hashchanged() {
	var url=location.hash.split("#")[1];
	var req=new XMLHttpRequest();
	req.open("GET","https://hitomi.la"+url,true);
	req.onreadystatechange = getpage;
	req.send(null);
}

function getpage(aEvt) {
	if (req.readyState == 4) {
		if(req.status == 200) {
			var parser=new DOMParser();
			var doc=parser.parseFromString(req.responseText,"text/html");
			var a=doc.getElementsByTagName("script");
			for (var i=0;i<a.length;i++) {
				a[i].parentNode.removeChild(a[i]);
			}
			a=doc.getElementsByTagName("a");
			for (i=0;i<a.length;i++) {
				a[i].href="#"+a[i].href;
			}
			a=doc.getElementsByTagName("link");
			for (i=0;i<a.length;i++) {
				a[i].href="https:"+a[i].href.split("file:")[1];
			}
			a=doc.getElementsByTagName("img");
			for (i=0;i<a.length;i++) {
				a[i].src="https:"+a[i].src.split("file:")[1];
			}
			a=doc.getElementsByTagName("body")[0].childNodes;
			for (i=0;i<a.length;i++) {
				document.body.appendChild(a[i]);
			}
			a=doc.getElementsByTagName("head")[0].childNodes;
			for (i=0;i<a.length;i++) {
				document.head.appendChild(a[i]);
			}
			window.aaa=doc;
		}
	}
}