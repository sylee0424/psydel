Extension_Sub_Functions.Add_Extension_Interface.f();

if (location.href.match(/^https?\:\/\/hitomi\.la/i)) {
	Extension_Sub_Functions.hitomi_Link_Change.f();
}

if (location.href.match(/^https?\:\/\/(m|www|bbs)\.ruliweb/i)) {
	Extension_Sub_Functions.Ruliweb_Ad_Block.f();
}

if (location.href.match(/^https?\:\/\/(marumaru|wasabisyrup)\.(in|com)/i)) {
	Extension_Sub_Functions.Marumaru_Ad_Block.f();
}

window.postMessage({
	type: "check",
	bmk: {}
}, location.href);

if (document.querySelector("meta[name=viewport]")) {
	document.querySelector("meta[name=viewport]").content="width=device-width, "
	+ "user-scalable=yes, maximum-scale=10.0, minimum-scale=0.0, initial-scale=1.0";
}

window.addEventListener("mousedown",Extension_Tool_Functions.Fake_Scroll_Event.f);
window.addEventListener("mouseup",Extension_Tool_Functions.Fake_Scroll_Event_End.f);
window.addEventListener("message",Extension_Tool_Functions.On_Message.f);

setInterval(Extension_Tool_Functions.Fake_Scroll_Action.f,40);

document.onmousedown=function () {};
