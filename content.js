function contentonmessage(event) {
		if (event.data.type=="setbmk") {
			extension.storage.local.get("bmks",function (c) {
				console.log("setted");
				//var rtn=MergeRecursive(event.data.bmk,JSON.parse(unescape(c.bmks)));
				extension.storage.local.set({"bmks":escape(JSON.stringify(event.data.bmk))});
				extension.runtime.sendMessage(extension.runtime.id,event.data);
				//console.log(event.data.bmk);
				//console.log(rtn);
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
		else if (event.data.type=="change") {
			if (!event.data.changeinfo) {
				return undefined;
			}
			extension.storage.local.get("bmks",function (c) {
				var bmk=JSON.parse(unescape(c.bmks));
				var bmkptr=bmk;
				event.data.changeinfo.loc.split("/").forEach(function (val) {
					bmkptr=bmkptr.value[val];
				});
				if (event.data.changeinfo.type=="add") {
					event.data.changeinfo.data.forEach(function (val) {
						if (!bmkptr.value[val.title]) {
							if (!val.title) {
								return undefined;
							}
						} else if (confirm("overwrite \"" + val.title + "\" ?")) {
							if (val.type=="folder") {
								return undefined;
							}
						} else if (!!(val.title = prompt("new name from " + val.title, ""))) {
							while (bmkptr.value[val.title]) {
								if (!!(a.name = prompt("new name from " + val.title, ""))) {

								} else {
									return undefined;
								}
							}
						} else {
							return undefined;
						}
						bmkptr.value[val.title] = {};
						bmkptr.value[val.title].path = event.data.changeinfo.loc;
						bmkptr.value[val.title].data={};
						var b=(new Date()).getTime();
						bmkptr.value[val.title].data.created = b;
						bmkptr.value[val.title].data.modified = b;
						bmkptr.value[val.title].data.croped=false;
						bmkptr.value[val.title].type = val.type;
						if (val.type=="link") {
							bmkptr.value[val.title].value = val.url;
						}
						else {
							bmkptr.value[val.title].value = {};
						}
					})
				}
				else if (event.data.changeinfo.type=="remove") {
					event.data.changeinfo.data.forEach(function (val) {
						delete bmkptr.value[val];
					})
				}
				else if (event.data.changeinfo.type=="update") {
					event.data.changeinfo.data.forEach(function (val) {
						if (val.type=="link") {
							bmkptr.value[val.title]=val.url;
						}
						else {
							[bmkptr.value[val.title],bmkptr.value[val.ptitle]]=[bmkptr.value[val.ptitle],bmkptr.value[val.title]];
						}
						if (val.title!=val.ptitle) {
							delete bmkptr.value[val.ptitle];
						}
						var b=(new Date()).getTime();
						bmkptr.value[val.title].data.modified = b;
					})
				}
				else if (event.data.changeinfo.type=="move") {
					event.data.changeinfo.data.forEach(function (val) {
						if (val.type == "folder") {
							if (!bmkptr.value[val.data.name]) {
								bmkptr.value[val.data.name] = val;
								bmkptr.value[val.data.name].data.croped=false;
							} else {
								if (bmkptr.value[val.data.name].type=="link") {
									var a=bmkptr.value[val.data.name];
									bmkptr.value[val.data.name] = val;
									bmkptr.value[val.data.name].data.croped=false;
									bmkptr.value[val.data.name].data.exx=a;
								}
								else {
									MergeRecursive(bmkptr.value[val.data.name].vlaue,val.value);
								}
								continue;
							}
						} else {
							if (bmkptr.value[val.data.name]) {
								if (!confirm(val.data.name + " is already exist.\n overwrite it?")) {
									if (!!(val.data.name = prompt("new bookmark name", ""))) {
										while (bmkptr.value[val.data.name]) {
											if (!!(val.data.name = prompt("new bookmark name", ""))) {

											} else {
												continue;
											}
										}
									} else {
										continue;
									}
								}
							}
							bmkptr.value[val.data.name] = val;
							bmkptr.value[val.data.name].data.croped=false;
						}
					})
				}
				else if (event.data.changeinfo.type=="return") {
					event.data.changeinfo.data.forEach(function (val) {
						bmkptr=bmk;
						val.path.split("/").forEach(function (s) {
							bmkptr=bmkptr.value[s];
						});
						bmkptr.value[val.data.name]=val;
						bmkptr.value[val.data.name].data.croped=false;
					});
				}
				extension.storage.local.set({"bmks":escape(JSON.stringify(bmk))});
			}
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