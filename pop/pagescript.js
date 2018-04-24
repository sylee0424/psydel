window.postMessage({
	type: "check",
	bmk: {}
}, location.href);

window.addEventListener("message",Extension_Tool_Functions.On_Message.f);

document.onmousedown=function () {};
document.body.oncontextmenu="";
document.body.ondragstart="";
document.body.onselectstart="";

Extension_Sub_Functions.Add_Extension_Interface.f();
