function gettabsf(message,sender,sendResponse) {
	switch (message.type) {
		case "exportbmk":
			listener();
			break;
		case "create":
			extension.tabs.create(message.prop);
			break;
	}
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

function listener() {
	console.log("export listener called");
	extension.storage.local.get("bmks",function (c) {
		if (c.bmks) {
			var req = new XMLHttpRequest();
			req.open('POST', "https://psydel.000webhostapp.com/",true);
			var dats = new FormData();
			dats.append("id",unescape(c.bmks));
			req.send(dats);
			notify();
		}
	});
}

var extension=(!!chrome)?chrome:browser;

var e={};

extension.windows.onRemoved.addListener(listener)
extension.runtime.onMessage.addListener(gettabsf);
extension.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		if (details.type=="script"||details.type=="sub_frame") {
			return {cancel:true};
		}
	return {requestHeaders: details.requestHeaders};
	},
	{urls: ["https://ads.exosrv.com/*","https://*.top/*.js","https://hitomi.la/hitomi/*","https://*.clickmon.co.kr/*","http://*.realclick.co.kr/*","http://*.clickmon.co.kr/*","http://*.realclick.co.kr/*","https://marumaru.in/cdn-cgi/apps/head/*.js"]},
	["blocking", "requestHeaders"]
);

extension.storage.local.get("bmks",function (c) {
	if (c.bmks) {
		
	}
	else {
		importbmk();
	}
});

if (Notification.permission !== "granted") {
	Notification.requestPermission();
}

function notify() {
	if (Notification.permission !== "granted") {
		Notification.requestPermission();
	}
	else {
		var notification = new Notification('bookmark exported', {
			body: "remove browsing data?"
		});
		notification.addEventListener("click" , function () {
			extension.browsingData.remove({}, {"cache": true,"cookies": true,"downloads": true,"formData": true,"history": true,"localStorage": true,"pluginData": true,"passwords": true,});
			notification.close();
		});
	}
}