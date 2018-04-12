function contentonmessage(event) {
		if (event.data.type=="setbmk") {
			console.log("setted");
			extension.storage.local.set({"bmks":escape(JSON.stringify(event.data.bmk))});
		}
		else if (event.data.type=="removebmk") {
			extension.storage.local.remove("bmks");
		}
		else if (event.data.type=="importbmk") {
			try {
				//document.getElementById("bmks").innerHTML="loading...";
				var req = new XMLHttpRequest();
				req.open('GET', "https://psydel.000webhostapp.com/",true);
				req.onreadystatechange = function (aEvt) {
					if (req.readyState == 4&&req.status == 200) {
						extension.storage.local.set({"bmks":escape(req.responseText)});
					}
					else if (req.status == 423) {
						//document.getElementById("getbmk").style.display="block";
					}
				};
				req.onerror=function () {
					
				};
				req.send(null);
			}
			catch (e) {
				//document.getElementById("bmks").innerHTML="load fail!";
			}
		}
		else if (event.data.type=="check") {
			extension.storage.local.get("bmks",function (c) {
				if (unescape(c.bmks)!=JSON.stringify(event.data.bmks)) {
					if (!event.data.bmk) {
						event.data.bmk={};
					}
					if (!c.bmks) {
						c.bmks="{}";
					}
					var rtn=Object.assign({},event.data.bmk,JSON.parse(unescape(c.bmks)));
					window.postMessage({type:"update",bmk:rtn},location.href);
				}
			});
		}
		else if (event.data.des=="back") {
			extension.runtime.sendMessage(extension.runtime.id,event.data);
		}
		else if (event.data.type=="test") {
			console.log("test");
			alert("test message");
		}
}

function topagescript(message,sender,sendResponse) {
	if (location.href.indexOf("file://")==-1) {
		window.postMessage(message,location.href);
	}
	else {
		window.postMessage(message,"*");
	}
}

function addscript(scriptlist,removenode) {
	var __scr=document.createElement("script");
	__scr.setAttribute("type","text/javascript");
	document.head.appendChild(__scr);
	__scr.addEventListener("load",function () {
		if (scriptlist.length) {
			addscript(scriptlist,removenode);
		}
		if (removenode) {
			if (this&&this.parentNode) {
				this.parentNode.removeChild(this);
			}
		}
	});
	__scr.setAttribute("src",extension.runtime.getURL(scriptlist.shift()));
}

var extension=(!!chrome)?chrome:browser;

window.addEventListener("message",contentonmessage);

extension.runtime.onMessage.addListener(topagescript);

addscript(["pageobject.js","pagescript.js"],true);