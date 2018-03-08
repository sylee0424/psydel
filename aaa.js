window.onload=function () {
	var iframe = document.createElement("iframe");
	document.body.appendChild(iframe);
	iframe.addEventListener("load",function () {
		var doc;
		if(this.contentDocument) {
			doc = this.contentDocument; 
		}
		else {
			doc = this.contentWindow.document; 
		}
		var a=doc.innerHTML.split(/\<script.*?\/script\>/gi);
		var b="";
		for (var i=0;i<a.length;i++) {
			b+=a[i];
		}
		document.innerHTML=b;
	});
	iframe.src="https://hitomi.la/index-korean-1.html";
}

