var req=new XMLHttpRequest();
req.open("GET","https://hitomi.la"+location.hash.substr(1),true);
window.onceevent=true;
req.onreadystatechange = function () {
	if (req.readyState == 4) {
		if (req.status == 200) {
			removeads(req.responseText);
			console.log(req.responseURL);
		}
	}
};
req.send(null);

window.addEventListener("hashchange",clickaction);
window.addEventListener("load",addlistener);

function addlistener() {
	document.getElementById("left").addEventListener("click",function () {
		var a=location.hash;
		var b=a.replace(/(\d*)\.html$/i,function (match,p1,offset,string) {
			if (Number(p1)==1) {
				return match;
			}
			else {
				return (Number(p1)-1)+".html";
			}
		});
		if (a!=b) {
			location.hash=b;
		}
	});
	document.getElementById("right").addEventListener("click",function () {
		var a=location.hash;
		var b=a.replace(/(\d*)\.html$/i,function (match,p1,offset,string) {
			return (Number(p1)+1)+".html";
		});
		if (a!=b) {
			location.hash=b;
		}
	});
}

function clickaction(event) {
	var url=location.hash.split("#")[1];
	console.log("https://hitomi.la"+url);
	if (url.indexOf("reader")!=-1) {
		window.open("https://hitomi.la"+url,"_self");
		return undefined;
	}
	var req=new XMLHttpRequest();
	req.open("GET","https://hitomi.la"+url,true);
	window.onceevent=true;
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				removeads(req.responseText);
				console.log(req.responseURL);
			}
		}
	}
	req.send(null);
}

function removeads(rep) {
	if (window.onceevent) {
		window.onceevent=false;
	}
	else {
		return undefined;
	}
	if (document.getElementById("bodyside")) {
		var a=document.getElementById("bodyside");
		a.parentNode.removeChild(a);
		a=document.getElementById("headside");
		a.parentNode.removeChild(a);
	}
	var parser=new DOMParser();
	var doc=parser.parseFromString(rep,"text/html");
	var a=doc.getElementsByTagName("script");
	for (var i=0;i<a.length;i++) {
		if (a[i].src.indexOf("ad")!=-1||a[i].src.indexOf("puss")!=-1||a[i].src.indexOf("hitomi.js")!=-1) {
			a[i].parentNode.removeChild(a[i]);
		}
	}
	a=doc.getElementsByTagName("a");
	for (i=0;i<a.length;i++) {
		if (a[i].href.split("file:///C:").length>1) {
			a[i].href="#"+a[i].href.split("file:///C:")[1];
		}
		a[i].setAttribute("onclick","clickaction(this.href); event.stopPropagation();");
	}
	a=doc.getElementsByTagName("link");
	for (i=0;i<a.length;i++) {
		a[i].href="https:"+a[i].href.split("file:")[1];
	}
	a=doc.getElementsByTagName("img");
	for (i=0;i<a.length;i++) {
		a[i].src="https:"+a[i].src.split("file:")[1];
	}
	a=doc.getElementsByTagName("body")[0];
	var b=document.createElement("div");
	b.id="bodyside";
	while (a.firstChild) {
		b.appendChild(a.firstChild);
	}
	document.body.appendChild(b);
	a=doc.getElementsByTagName("head")[0];
	b=document.createElement("div");
	b.id="headside";
	while (a.firstChild) {
		b.appendChild(a.firstChild);
	}
	document.head.appendChild(b);
	window.aaa=doc;
	if (window.Extension_Tool_Functions) {
		Extension_Tool_Functions.hitomi_Link_Change.f();
		document.documentElement.scrollTop=0;
	}
}