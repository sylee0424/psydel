function contentonmessage(event) {
		if (event.data.type=="setbmk") {
			extension.storage.local.get("bmks",function (c) {
				console.log("setted");
				var rtn=MergeRecursive(event.data.bmk,JSON.parse(unescape(c.bmks)));
				extension.storage.local.set({"bmks":escape(JSON.stringify(rtn))});
				console.log(event.data.bmk);
				console.log(rtn);
			});
		}
		else if (event.data.type=="removebmk") {
			extension.storage.local.remove("bmks");
		}
		else if (event.data.type=="importbmk") {
			var req = new XMLHttpRequest();
			req.open('GET', "https://psydel.000webhostapp.com/",true);
			req.onreadystatechange = function (aEvt) {
				if (req.readyState == 4&&req.status == 200) {
					extension.storage.local.set({"bmks":escape(req.responseText)});
				}
				else if (req.status == 423) {
					
				}
			};
			req.onerror=function () {
				
			};
			req.send(null);
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
					var rtn=MergeRecursive(event.data.bmk,JSON.parse(unescape(c.bmks)));
					extension.storage.local.set({"bmks":escape(JSON.stringify(rtn))});
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

/*
* Recursively merge properties of two objects 
*/
function MergeRecursive(obj1, obj2) {

  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor==Object ) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p]);

      } else {
        obj1[p] = obj2[p];

      }

    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];

    }
  }

  return obj1;
}

var extension=(!!chrome)?chrome:browser;

window.addEventListener("message",contentonmessage);

extension.runtime.onMessage.addListener(topagescript);

addscript(["pageobject.js","pagescript.js"],true);