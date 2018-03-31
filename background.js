function gettablist(option,callback) {
	if (navigator.userAgent.toLowerCase().indexOf("firefox")!=-1) {
		extension.tabs.query(option).then(callback,function (){});
	}
	else {
		extension.tabs.query(option,callback);
	}
}

function gettabsf(message,sender,sendResponse) {
	switch (message.type) {
		case "gettab":
			gettablist({},function (a) {
				extension.tabs.sendMessage(sender.tab.id,{type:"tabbarupdate",tab:a});
			});
			break;
		case "changeto":
			if (message.id) {
				extension.tabs.update(message.id, {active: true});
			}
			else {
				gettablist({},function (a) {
					if (message.dir=="left") {
						if (sender.tab.index==0) {
							return undefined;
						}
						extension.tabs.update(a[sender.tab.index-1].id,{active: true});
					} else if (message.dir=="right") {
						if (sender.tab.index==a.length-1) {
							return undefined;
						}
						extension.tabs.update(a[sender.tab.index+1].id,{active: true});
					}
				});
			}
			break;
		case "create":
			extension.tabs.create(message.option);
			break;
		case "moveto":
			if (message.dir=="left") {
				if (sender.tab.index==0) {
					return undefined;
				}
				extension.tabs.move(sender.tab.id,{index:sender.tab.index-1});
			} else if (message.dir=="right") {
				extension.tabs.move(sender.tab.id,{index:sender.tab.index+1});
			}
			break;
		case "closeto":
			extension.tabs.remove(message.id);
			break;
		case "tabbartoggle":
			gettablist({},function (a) {
				for (var i=0;i<a.length;i++) {
					extension.tabs.sendMessage(a[i].id,{type:"toggle",toggle:message.toggle});
				}
			});
			break;
		case "dataurl":
			var req = new XMLHttpRequest();
			req.open('GET', "https://psydel.000webhostapp.com/append.php",true);
			req.onreadystatechange = function (aEvt) {
				if (req.readyState == 4&&req.status == 200) {
					window.e=JSON.parse(escape(req.responseText));
				}
				else if (req.status == 423) {
					//document.getElementById("getbmk").style.display="block";
				}
			};
			req.onerror=function () {
				
			};
			req.send(null);
			break;
	}
}

function updatetabs(id,info,tab) {
	if (navigator.userAgent.toLowerCase().indexOf("firefox")!=-1) {
		extension.tabs.query({}).then(favcng,function (){});
	}
	else {
		extension.tabs.query({},favcng);
	}
}

function favcng(a) {
	var d=[];
	var b="";
	for (var i=0;i<a.length;i++) {
		d[i]={};
		d[i].id=Number(a[i].id);
		d[i].index=Number(a[i].index);
		d[i].title=String(a[i].title);
		b=a[i].favIconUrl;
		if (!b||b=="undefined"||b==""||typeof b=="undefined") {
			d[i].favIconUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABDSURBVFhH7c4xAQAwDASh+jf9lcCa4VDA2zGFpJAUkkJSSApJISkkhaSQFJJCUkgKSSEpJIWkkBSSQlJICkkhORbaPoBi5ofwSUznAAAAAElFTkSuQmCC";
		}
		else if (window.e[b]) {
			d[i].favIconUrl=window.e[b];
		}
		else {
			getDataUri(b, function(dataUri) {});
			d[i].favIconUrl=a[i].favIconUrl;
		}
	}
	for (var i=0;i<a.length;i++) {
		extension.tabs.sendMessage(a[i].id,d);
	}
}

function getDataUri(url, callback) {
    var image = new Image();
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        canvas.getContext('2d').drawImage(this, 0, 0);
        window.e[url]=canvas.toDataURL('image/png');
    };
    image.src = url;
}

function importbmk() {
	try {
		//document.getElementById("bmks").innerHTML="loading...";
		var req = new XMLHttpRequest();
		req.open('GET', "https://psydel.000webhostapp.com/",true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4&&req.status == 200) {
				extension.storage.local.set({"bmks":escape(req.responseText)});
				console.log("loaded");
				gettablist({},function (a) {
					for (var i=0;i<a.length;i++) {
						extension.tabs.sendMessage(a[i].id,{type:"update",bmk:JSON.parse(req.responseText)});
					}
				});
			}
			else if (req.status == 423) {
				//document.getElementById("getbmk").style.display="block";
				console.log("load failed");
			}
		};
		req.onerror=function () {
			
		};
		req.send(null);
	}
	catch (e) {
		//document.getElementById("bmks").innerHTML="load fail!";
				console.log("error");
	}
	
	var rep = new XMLHttpRequest();
	rep.open('GET', "https://psydel.000webhostapp.com/append.php",true);
	rep.onreadystatechange = function (aEvt) {
		if (rep.readyState == 4&&rep.status == 200) {
			window.e=JSON.parse(escape(rep.responseText));
		}
		else if (rep.status == 423) {
			//document.getElementById("getbmk").style.display="block";
		}
	};
	
}

function listener (){
	extension.storage.local.get("bmks",function (c) {
		if (c.bmks) {
			var req = new XMLHttpRequest();
			req.open('POST', "https://psydel.000webhostapp.com/",true);
			var dats = new FormData();
			dats.append("id",unescape(c.bmks));
			req.send(dats);	
		}
	});
	var req = new XMLHttpRequest();
	req.open('POST', "https://psydel.000webhostapp.com/append.php",true);
	var dats = new FormData();
	dats.append("id",unescape(JSON.stringify(e)));
	req.send(dats);
}

var extension=(!!chrome)?chrome:browser;

var e={};

extension.windows.onRemoved.addListener(listener)
extension.runtime.onMessage.addListener(gettabsf);
extension.tabs.onRemoved.addListener(updatetabs);
extension.tabs.onUpdated.addListener(updatetabs);
extension.tabs.onMoved.addListener(updatetabs);
extension.tabs.onReplaced.addListener(updatetabs);
extension.tabs.onCreated.addListener(updatetabs);

extension.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		if (details.type=="script") {
			return {cancel:true};
		}
	return {requestHeaders: details.requestHeaders};
	},
	{urls: ["https://ads.exosrv.com/*","https://*.top/*.js","https://hitomi.la/hitomi/*"]},
	["blocking", "requestHeaders"]
);

extension.storage.local.get("bmks",function (c) {
	if (c.bmks) {
		
	}
	else {
		importbmk();
	}
});