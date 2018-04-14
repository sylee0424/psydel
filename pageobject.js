window.Action_Bar_Function = {

	Action_Bar_Function_1: {
		f: function() {
			history.back();
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			scroll(0, 0);
		},
		name: "Go_back"
	},

	Action_Bar_Function_2: {
		f: function() {
			history.forward();
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			scroll(0, document.body.scrollHeight);
		},
		name: "Go_forward"
	},

	Action_Bar_Function_3: {
		f: function() {
			document.getElementById("sidebar").classList.toggle("__hided");
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Toggle_Button_Tab"
	},

	Action_Bar_Function_4: {
		f: function() {
			console.log("f");
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Close_This_Tab."
	},

	Action_Bar_Function_5: {
		f: function() {
			document.getElementById("bmkmain").classList.remove("__hided");
			document.getElementById("actionbar").classList.add("__hided");
			window.postMessage({
				type: "check",
				bmk: Extension_Variables.Bookmark_Original
			}, location.href);
		},
		u: function() {
			window.postMessage({
				type: "create",
				prop: {active:true},
				des: "back"
			}, location.href);
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			Bookmark_User_Functions.Add_Bookmark.f.call(this);
		},
		name: "Open_Bookmark"
	},

	Action_Bar_Function_6: {
		f: function() {
			console.log("f");
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Open_Tab_Bar"
	},

	Action_Bar_Function_7: {
		f: function() {
			location.reload(true);
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Reload_Tab"
	},

	Action_Bar_Function_8: {
		f: function() {
			scroll(0, 0);
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Go_Up"
	},

	Action_Bar_Function_9: {
		f: function() {
			scroll(0, document.body.scrollHeight);
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Go_Down"
	}

};

window.Extension_Sub_Functions = {

	hitomi_Image_Sequential: {
		f: function (imagelist) {
			var __scr=document.createElement("img");
			__scr.classList.add("__loadedimg");
			document.body.appendChild(__scr);
			__scr.addEventListener("load",function () {
				if (imagelist.length) {
					Extension_Sub_Functions.hitomi_Image_Sequential.f(imagelist);
				}
			});
			__scr.addEventListener("error",function () {
				console.log(""+this.src);
				this.src+="#"+new Date().getTime();
			});
			__scr.setAttribute("src",imagelist.shift());
		},
		name:"hitomi_Image_Sequential"
	},

	hitomi_Link_Action: {
		f: function() {
			event.stopPropagation();
			var i = this.dataset.index;
			var j = this.dataset.type;
			var k = this.dataset.url;
			var url;
			if (location.protocol == "file:") {
				url = "";
			} else {
				url = "https://hitomi.la";
			}
			if (j == "normal") {
				url += k;
			} else if (j == "korean") {
				url += k.split("-all-")[0] + "-korean-" + k.split("-all-")[1];
			} else if (j == "reader") {
				url += k.split("galleries")[0] + "reader" + k.split("galleries")[1] + "#1";
			}
			if (document.getElementById("input-" + i).checked) {
				window.open(url)
			} else if (location.protocol == "file:") {
				location.hash = url;
			} else {
				location.href = url;
			}
		},
		name: "hitomi_Click_Action"
	},
	
	Add_Extension_Interface: {
		f: function() {
			if (!document.getElementById("bmkmain")) {
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					id: "bmkmain",
					classname: ["__hided"],
					target: document.body
				});
				for (var i = 0; i < Extension_Variables.Bookmark_Interface_List.length; i++) {
					Extension_Tool_Functions.Import_Nodes.f(Extension_Variables.Bookmark_Interface_List[i])
				}
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					id: "pastebmk",
					classname: ["__hided"],
					target: document.getElementById("bmkmain")
				});
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					name: "paste bmk",
					classname: ["__buttons"],
					events: [{
						name: "click",
						value: Bookmark_User_Functions.Paste_Bookmark_Second.f
					}],
					target: document.getElementById("pastebmk")
				});
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					name: "cancel",
					classname: ["__buttons"],
					events: [{
						name: "click",
						value: Bookmark_User_Functions.Cancel_Paste_Second.f
					}],
					target: document.getElementById("pastebmk")
				});
			}
			if (!document.getElementById("actionbar")) {
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					id: "actionbar",
					classname: [],
					target: document.body
				});
				for (s in Action_Bar_Function) {
					a = {};
					a.tag = "div";
					a.id = s;
					a.classname = ["__abtn"];
					a.name = Action_Bar_Function[s].name;
					a.events = [{
						name: "mousedown",
						value: Extension_Tool_Functions.Drag_Event_Checker.f
					}, {
						name: "mouseup",
						value: Extension_Tool_Functions.Remove_Longtab_Event_Checker.f
					}, {
						name: "touchstart",
						value: Extension_Tool_Functions.Drag_Event_Checker.f
					}, {
						name: "touchend",
						value: Extension_Tool_Functions.Drag_Event_Checker_Action.f
					}, {
						name: "selectstart",
						value: function(event) {
							event.preventDefault();
						}
					}];
					a.target = document.getElementById("actionbar");
					Extension_Tool_Functions.Import_Nodes.f(a);
				}
			}
			if (!document.getElementById("sidebar")) {
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					id: "sidebar",
					classname: ["__hided"],
					target: document.body
				});
				for (var s in Extension_User_Functions) {
					var a = {};
					a.tag = "div";
					a.classname = ["__btnz"];
					if (Extension_User_Functions[s].image) {
						a.image=Extension_User_Functions[s].image;
					} else if (Extension_User_Functions[s].name) {
						a.name = Extension_User_Functions[s].name;
					} else {
						a.name = s;
					}
					a.events = [{
						name: "click",
						value: Extension_User_Functions[s].f
					}];
					a.target = document.getElementById("sidebar");
					Extension_Tool_Functions.Import_Nodes.f(a);
				}
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					id: "sidebarpad",
					classname: ["__extension"],
					target: document.getElementById("sidebar")
				});
			}

			window.postMessage({
				type: "gettab",
				des: "back"
			}, location.href);
		},
		name: "Drag_Event_Checker"
	},

	hitomi_Link_Change: {
		f: function() {
			var d = 0;
			var divs = document.getElementsByTagName('a');
			var i = divs.length;
			while (i--) {
				var k = divs[i].getAttribute("href");
				if (k && divs[i].id != "dl-button" && divs[i].parentNode.parentNode.getAttribute("class") !=
					"simplePagerNav") {
					divs[i].dataset.url = k;
					divs[i].dataset.type = "normal";
					divs[i].dataset.index = i;
					divs[i].addEventListener("click", Extension_Sub_Functions.hitomi_Link_Action.f);
					var inp = document.createElement("input");
					var inq = document.createElement("label");
					var tx = document.createTextNode("N");
					inp.type = "checkbox";
					inq.style.display = "inline";
					inp.id = "input-" + i;
					inp.addEventListener("click", Extension_Tool_Functions.Cancel_Event_Bubling.f);
					inp.style["vertical-align"] = "middle";
					inq.addEventListener("click", Extension_Tool_Functions.Element_Toggle.f);
					if (divs[i].parentNode.parentNode.parentNode.getAttribute("class") != "page-container" &&
						divs[i].parentNode.tagName != "DIV" && divs[i].href != "/") {
						if (k.match("galleries")) {
							var j = document.createElement("span");
							divs[i].insertBefore(j, divs[i].firstChild);
							j.innerHTML = "(R) ";
							j.dataset.url = k;
							j.dataset.type = "reader";
							j.dataset.index = i;
							j.addEventListener("click", Extension_Sub_Functions.hitomi_Link_Action.f);
						}
						if (k.match("-all-")) {
							var j = document.createElement("span");
							divs[i].insertBefore(j, divs[i].firstChild);
							j.innerHTML = "(K) ";
							j.dataset.url = k;
							j.dataset.type = "korean";
							j.dataset.index = i;
							j.addEventListener("click", Extension_Sub_Functions.hitomi_Link_Action.f);
						}
					} else {
						var j = document.createElement("span");
						while (divs[i].firstChild) {
							j.appendChild(divs[i].firstChild);
						}
						j.dataset.url = k;
						j.dataset.type = "normal";
						j.dataset.index = i;
						j.addEventListener("click", Extension_Sub_Functions.hitomi_Link_Action.f);
						divs[i].parentNode.insertBefore(j, divs[i]);
						var k = divs[i];
						divs[i] = j;
						k.parentNode.removeChild(k);
						inq.style.display = "none";
					}
					inq.appendChild(tx);
					inq.appendChild(inp);
					divs[i].insertBefore(inq, divs[i].firstChild);
					divs[i].removeAttribute("href");
				}
			}
			divs = document.getElementsByClassName("page-content")[0]
			if (divs) {
				divs = document.getElementsByClassName("page-content")[0].getElementsByTagName("label");
				i = divs.length;
				while (i--) {
					divs[i].setAttribute("style", "display:none");
				}
			}
		},
		name: "hitomi_Link_Change"
	},

	Ruliweb_Ad_Block: {
		f: function() {
			var arr = document.getElementsByTagName("div")
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].className.indexOf("ad_") != -1) {
					arr[i].parentNode.removeChild(arr[i]);
				}
			}
		},
		name: "Ruliweb_Ad_Block"
	}

};

window.Extension_Tool_Functions = {

	change_bmk: {
		f: function (bmk,path) {
			for (var a in bmk.value) {
				bmk.value[a].path=path;
				if (bmk.value[a].type=="folder") {
					Extension_Tool_Functions.change_bmk.f(bmk.value[a],bmk.value[a].path+(path?"/":"")+a);
				}
			}
		},
		name:"hitomi_Image_Sequential"
	},

	convert_bmk: {
		f: function (bmk,path) {
			for (var a in bmk) {
				var b={};
				b.value=bmk[a];
				b.data={created:-1,modified:-1,croped:false};
				if (!path) {
					b.path+="/";
				}
				if (typeof bmk[a]=="string") {
					b.type="link";
					bmk[a]=b;
				}
				else {
					b.type="folder"
					b.path+=a;
					bmk[a]=b;
					Extension_Tool_Functions.convert_bmk.f(bmk[a].value,bmk[a].path);
				}
			}
		},
		name:"hitomi_Image_Sequential"
	},

	Tab_Change: {
		f: function() {
			window.postMessage({
				type: "changeto",
				id: Number(this.dataset.id),
				des: "back"
			}, location.href);
		},
		name: "Fake_Scroll_Event"
	},

	Tab_Remove: {
		f: function() {
			window.postMessage({
				type: "closeto",
				id: Number(this.dataset.id),
				index: Number(this.dataset.index),
				des: "back"
			}, location.href);
		},
		name: "Fake_Scroll_Event"
	},

	Fake_Scroll_Event: {
		f: function(event) {
			if (event.altKey) {
				event.preventDefault();
				if (event.which == 3) {
					Extension_Variables.Fake_Scroll_Direction = "u";
				} else if (event.which == 1) {
					Extension_Variables.Fake_Scroll_Direction = "d";
				}
			}
		},
		name: "Fake_Scroll_Event"
	},

	Fake_Scroll_Event_End: {
		f: function(event) {
			delete Extension_Variables.Fake_Scroll_Direction;
		},
		name: "Fake_Scroll_Event_End"
	},

	Emulate_Click_Event: {
		f: function(hrf) {
			if (hrf.click) {
				hrf.click();
			} else if (document.createEvent) {
				var eventObj = document.createEvent('MouseEvents');
				eventObj.initEvent('click', true, true);
				hrf.dispatchEvent(eventObj);
			}
		},
		name: "Emulate_Click_Event"
	},

	Get_Chils_Index: {
		f: function(node) {
			return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
		},
		name: "Get_Child_Number"
	},

	Element_Toggle: {
		f: function(event) {
			event.stopPropagation();
			this.classList.toggle("__checked");
			this.checked = this.classList.contains("__checked");
		},
		name: "Element_Toggle"
	},
	
	utf8_encode : {
		f: function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},
		name: "utf8_encode"
	},

	utf8_decode: {
		f: function(utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		},

		name: "utf8_decode"
	},

	Drag_Event_Checker: {
		f: function(event) {
			if (event.touches && event.touches.length > 1) {
				return undefined;
			}
			if (event.which && event.which == 3) {
				return undefined;
			}
			event.preventDefault();
			var eventx = event.clientX || event.changedTouches[0].clientX;
			var eventy = event.clientY || event.changedTouches[0].clientY;
			var nds = document.createElement("div");
			nds.setAttribute("style",
				"visibility:visible; position:fixed; bottom:0%; left:0%; width:100%; height:100%; background-color:#000000; opacity:0;"
			);
			nds.id = "setover";
			nds.setAttribute("data-x", eventx);
			nds.setAttribute("data-y", eventy);
			nds.setAttribute("data-id", this.id);
			document.body.appendChild(nds);
			nds.addEventListener("mouseup", Extension_Tool_Functions.Drag_Event_Checker_Action.f);
			window.setTimeout(Extension_Tool_Functions.Longtab_Event_Checker.f, 350);
		},
		name: "Drag_Event_Checker"
	},

	Remove_Longtab_Event_Checker: {
		f: function() {
			if (document.getElementById("setover")) {
				document.getElementById("setover").parentNode.removeChild(document.getElementById("setover"));
			}
		},
		name: "Drag_Event_Checker"
	},

	Longtab_Event_Checker: {
		f: function() {
			if (document.getElementById("setover")) {
				var a = document.createElement("div");
				a.style = document.getElementById(document.getElementById("setover").dataset.id).getAttribute(
					"style");
				a.setAttribute("data-id", document.getElementById("setover").dataset.id);
				a.id = "ltsde";
				a.appendChild(document.createTextNode("lt"));
				document.body.appendChild(a);
				a.addEventListener("mouseup", Extension_Tool_Functions.Drag_Event_Checker_Action.f);
			}
		},
		name: "Drag_Event_Checker"
	},

	Drag_Event_Checker_Action: {
		f: function(event) {
			var a = 15;
			var aaa = this;
			if (event.changedTouches || this.id == "ltsde") {
				aaa = document.getElementById("setover");
			}
			var eventx = event.clientX || event.changedTouches[0].clientX;
			var eventy = event.clientY || event.changedTouches[0].clientY;
			var movex = eventx - Number(aaa.dataset.x);
			var movey = Number(aaa.dataset.y) - eventy;
			if (Math.abs(movex) < a && Math.abs(movey) < a) {
				if (document.getElementById("ltsde")) {
					Action_Bar_Function[aaa.dataset.id].lt.call(document.getElementById(aaa.dataset.id));
					document.getElementById("ltsde").parentNode.removeChild(document.getElementById("ltsde"));
				} else {
					Action_Bar_Function[aaa.dataset.id].f();
				}
			} else if (movex >= 0 && movey >= 0) {
				if (movey / movex > 3) {
					if (Action_Bar_Function[aaa.dataset.id].u) {
						Action_Bar_Function[aaa.dataset.id].u();
					}
				} else if (movey / movex < 0.3) {
					if (Action_Bar_Function[aaa.dataset.id].r) {
						Action_Bar_Function[aaa.dataset.id].r();
					}
				}
			} else if (movex < 0 && movey >= 0) {
				if (movey / movex < -3) {
					if (Action_Bar_Function[aaa.dataset.id].u) {
						Action_Bar_Function[aaa.dataset.id].u();
					}
				} else if (movey / movex > -0.3) {
					if (Action_Bar_Function[aaa.dataset.id].l) {
						Action_Bar_Function[aaa.dataset.id].l();
					}
				}
			} else if (movex >= 0 && movey < 0) {
				if (movey / movex < -3) {
					if (Action_Bar_Function[aaa.dataset.id].d) {
						Action_Bar_Function[aaa.dataset.id].d();
					}
				} else if (movey / movex > -0.3) {
					if (Action_Bar_Function[aaa.dataset.id].r) {
						Action_Bar_Function[aaa.dataset.id].r();
					}
				}
			} else if (movex < 0 && movey < 0) {
				if (movey / movex > 3) {
					if (Action_Bar_Function[aaa.dataset.id].d) {
						Action_Bar_Function[aaa.dataset.id].d();
					}
				} else if (movey / movex < 0.3) {
					if (Action_Bar_Function[aaa.dataset.id].l) {
						Action_Bar_Function[aaa.dataset.id].l();
					}
				}
			}
			aaa.parentNode.removeChild(aaa);
		},
		name: "Drag_Event_Checker"
	},

	Import_Nodes: {
		f: function(item) {
			var div = document.createElement(item.tag);
			if (item.classname) {
				for (var i = 0; i < item.classname.length; i++) {
					div.classList.add(item.classname[i]);
				}
			}
			div.classList.toggle("__extension");
			if (item.id) {
				div.id = item.id;
			}
			if (item.image) {
				if (!item.childs) {
					item.childs=[];
				}
				var b = {}
				b.tag = "img"
				b.attributes = [{
					name: "src",
					value: item.image
				}];
				b.classname = ["__innerimage","__extension"];
				item.childs.push(b);
			} else if (item.name) {
				div.appendChild(document.createTextNode(item.name));
			}
			if (item.childs) {
				for (var i = 0; i < item.childs.length; i++) {
					item.childs[i].target = div;
					Extension_Tool_Functions.Import_Nodes.f(item.childs[i]);
				}
			}
			if (item.events) {
				for (var i = 0; i < item.events.length; i++) {
					div.addEventListener(item.events[i].name, item.events[i].value);
				}

			}
			if (item.attributes) {
				for (var i = 0; i < item.attributes.length; i++) {
					div.setAttribute(item.attributes[i].name, item.attributes[i].value);
				}
			}
			if (item.target) {
				item.target.appendChild(div);
			} else {
				document.getElementById("bmkmain").appendChild(div);
			}
		},
		name: "Drag_Event_Checker"
	},

	On_Message: {
		f: function(event) {
			if (event.data.type == "update") {
				Extension_Variables.Bookmark_Original = event.data.bmk;
				Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc);
			}
		},
		name: "Drag_Event_Checker"
	},

	Fake_Scroll_Action: {
		f: function() {
			if (Extension_Variables.Fake_Scroll_Direction == "u") {
				document.documentElement.scrollTop -= 60;
			} else if (Extension_Variables.Fake_Scroll_Direction == "d") {
				document.documentElement.scrollTop += 60;
			}
		},
		name: "Set_Scroll"
	},

	Cancel_Event_Bubling: {
		f: function(event) {
			event.stopPropagation();
		},
		name: "Cancel_Event_Bubling"
	}
};

window.Extension_User_Functions = {
	
	View_Source: {
		f: function () {
			String.prototype.htmlEscape || (function(){
				String.prototype.htmlEscape = (function(){
					var s = this;
					s=s.replace(/&/g,'&amp;');
					s=s.replace(/>/g,'&gt;');
					s=s.replace(/</g,'&lt;');
					return s;
				});
			})();
			var dw = window.innerWidth;
			var i = dw/50;
			var d = document;
			function getByTagName( name ) { return d.getElementsByTagName( name ).item(0); }
			function getById( name ) {  return d.getElementById( name ); }
			var SPACE = "&nbsp;",
				RETAB = true, // 탭을 스페이스 ts회로 바꿀까(true/false)
				TS    = 2;    // 탭의 스페이스 수
			var TAGNAME_HIGTHLIGHT_COLOR = "#00f";
			var VIEW_BTN_LABEL    = '소스보기',/*소스를 볼때 누르는 버튼 글자*/
			REWRITE_BTN_LABEL = '돌아가기';/*돌아갈때 누르는 버튼 글자*/
			var title = getByTagName('title').innerHTML;
			var html = ((((getByTagName('html').innerHTML + '').htmlEscape()).replace( /\n/g, "<br>\n" )).replace( / /g, SPACE )).replace( /&lt;([a-zA-Z0-9\/]*)/g, "&lt;<span style='color:"+TAGNAME_HIGTHLIGHT_COLOR+"'>$1</span>" );
			if( RETAB ) {
				var tab = "";
				for (var i=0; i<TS; i++ ) tab+=SPACE;
				html = html.replace( /\t/g, tab );
			}
			var rewriteBtn = "<button "
				+ 'onClick="javascript:document.location.reload()"'
				+ 'style="'
				+   'width:100%;'
				+   'text-align:left;'
				+ '">'
				+ REWRITE_BTN_LABEL
				+ '</button>';
			var vewCodeHtml = '<head><title>'+title+'</title></head><body style="padding:0;margin:0">'+rewriteBtn+'<hr>'+html+'</body>';
			function viewCode() {
				getByTagName('html').innerHTML = vewCodeHtml;
			}
			viewCode();
		},
		name:"view_source"
	},

	Change_Broken_Link: {
		f: function(element) {
			var i;
			if (!element) {
				element = document.body;
			}
			if (element.nodeName == "#text") {
				var urlreplace = /h?ttp(s?):\/\/([\S]*)/g;
				var nv = element.nodeValue;
				var ids = new Array();
				var at = nv.split(urlreplace);
				var ss = nv.match(urlreplace);
				var aq = new Array();
				var id = 0;
				ids[0] = at[0].length;
				aq[0] = element;
				if (ss) {
					for (var i = 0; i < ss.length; i++) {
						ids[i + 1] = ids[i] + ss[i].length + at[i + 1].length;
					}
				}
				if (element.parentNode.tagName != "SCRIPT" && ss) {
					for (i = 0; i < at.length - 1; i++) {
						if (i == 0) {
							aq[1] = aq[0].splitText(ids[0]);
							if (at.length - 1 == 1) {
								aq[1] = aq[1].splitText(ss[0].length);
								aq[1].parentNode.removeChild(aq[1].previousSibling);
							}
						} else {
							aq[i + 1] = aq[i].splitText(ids[i] - ids[i - 1]);
							aq[i] = aq[i].splitText(ss[i - 1].length);
							aq[i + 1].parentNode.removeChild(aq[i + 1].previousSibling);
						}
						var a = document.createElement("a");
						a.setAttribute("target", "_blank");
						a.setAttribute("href", ss[i].replace(urlreplace,"http$1://$2"));
						a.appendChild(document.createTextNode(ss[i]));
						aq[i + 1].parentNode.insertBefore(a, aq[i + 1]);
					}
				}
			} else {
				for (i = 0; i < element.childNodes.length; i++) {
					i = Extension_User_Functions.Change_Broken_Link.f(element.childNodes[i]);
				}
			}
			if (aq) {
				return Extension_Tool_Functions.Get_Chils_Index.f(aq[aq.length - 1]);
			} else {
				return Extension_Tool_Functions.Get_Chils_Index.f(element);
			}
		},
		name: "ttp://_Make_Link",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAA" +
			"AeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADs" +
			"IAAA7CARUoSoAAAAGaSURBVGhD7VeBqsMwCHx5///P2zIQrDVGrcoIFgbbUo" +
			"3encaM1+f5O+D5PyCHbwqdyK8x2Yw0I0kItLSSgHW7PZ+RMcYSHWlNCyn18d" +
			"RnCSNPg9SAM+isxW0K45hlTRrhph+8Tn9rAqfv3BiZG8Am+Ps0lNbw+nyvgg" +
			"WcTIm0PAhbbUITmSzAh0oHAsuQlTj9gjxWdQEBY+RAerQ+Kq48t2K3UrpC2u" +
			"vHaxcqLW8QEXZhiVTIR0r4Iq3qlikFZgUmrEYi5PHEBystCzPcu/g/3JJpp9" +
			"vNW5Y4LonsHK8Q222I27JVMlqWLong0cIy/+xGEsoKBMftB6BY9hcPRC0SXF" +
			"DUtpwRjMIOZS7RJzZ4ULWycWMkYrTgamAlLSvr6nNEKuasIo1KJuxkxwHtul" +
			"hU8Or7CO773LSLJZMRnMWn6mTnik+6V1BGKmSZIq2JJG65FVJLS8Qii4h3Vd" +
			"KaGwGqqyssnCHcWVIhLXUiEahl+jhGWp1Ipkw8vpsRD2qZNs1IJroe382IB7" +
			"VMm2YkE12P72bEg1qmzTGMvAEtK+dZydFd9QAAAABJRU5ErkJggg=="
	},

	Inject_Temporal_Script: {
		f: function() {
			eval(prompt("", ""));
		},
		name: "Inject_Temporal_Script"
	},

	Blink_Line_Fix: {
		f: function() {
			var br = document.getElementById("view_content").getElementsByTagName("div");
			for (var i = 0; i < br.length; i++) {
				br[i].style.display = "inline"
			}
		},
		name: "Blink_Line_Fix",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAA" +
			"D/gAIDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADs" +
			"MAAA7DAcdvqGQAAAJ3SURBVHhe7ZZhcoMgFAY9Vw7keTyNl8lhUlBBjMSwKZ" +
			"npdNYfHWM/n49lQYeHRzOBoTlp8CEsIIGwhAUIgKhmCQsQAFHNEhYgAKKaJS" +
			"xAAEQ1S1iAAIhqlrAAARDVLGEBAiCqWcICBEBUs4QFCICoZgkLEABRzRIWIA" +
			"CimiUsQABENUtYgACIapawAAEQ1SxhAQIgqlnCAgRAVLOEBQiAqGYJCxAAUc" +
			"0SFiAAopr1RVj36TbOoP7b6DzepvvbVIdAh86pWfmR8zh0GWUjrMbYBdQOnX" +
			"8Mq8NcLyXaKLSlLnv6plnBnH29hQcNy3Ebx20Zrs8Of5Nf+fRwZ73/IhIxzL" +
			"n8tiLjxWkMjyt+r2uVFX/EBvt1XjEr9BOOYmc6DC39Z5uonVY5+acSmVmteG" +
			"ZS8j42UK54VjyNI961nn/YebjzAGudhucN/LAEsszpJA2wslCWUeVh1osfl2" +
			"G1WH39tBTv1Hme6bNZy6COM1n8OsHaVuITq1OR7YHn69UBlRfPrJqLX8Ninc" +
			"cBvNjgl342xeL5S5lXrcOx+xjn/PJFWRaPm1BZfb2xGOUTK1S8d+dNb8O8Sw" +
			"7jlL6zikGUPeGXZNrLl214n5PitfGb77q+nTfBwgS63dDhk6FbLy+XYccn/K" +
			"NSf9ysv0VaWGA+hCUsQABENUtYgACIapawAAEQ1SxhAQIgqlnCAgRAVLOEBQ" +
			"iAqGYJCxAAUc0SFiAAopolLEAARDVLWIAAiGqWsAABENUsYQECIKpZwgIEQF" +
			"SzhAUIgKhmCQsQAFHNEhYgAKKaJSxAAEQ1S1iAAIhqlrAAARDVLGEBAiCqWc" +
			"ICBEBUs4QFCICoZgFYP1gVHwXKh5cqAAAAAElFTkSuQmCC"
	},

	Return_Blink_Line: {
		f: function() {
			var br = document.getElementById("view_content").getElementsByTagName("div");
			for (var i = 0; i < br.length; i++) {
				br[i].style.display = "block"
			}
		},
		name: "Return_Blink_Line",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAA" +
			"D/gAIDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADs" +
			"MAAA7DAcdvqGQAAAMjSURBVHhe7ZoxcvIwEIXlnAX+gskJ4ARMGqq0dFAmDR" +
			"0lHY0p83dpU9EEnyA5QYYi5i7OSrKN7WQGv5BZi+SpYDSeZ1v6/Fa2lo2yLD" +
			"Ns7QhctZNRZQkQFuADwiIsgAAgpbMICyAASOkswgIIAFI6i7AAAoCUziIsgA" +
			"AgpbMICyAASOkswgIIAFI6i7AAAoCUziIsgAAgpbMICyAASOkswgIIAFI6i7" +
			"AAAoA0KGcdNqN5AgxeWxoUrHLyyTwabQ7aLE7eL0xY44fs5a53cvDagm5giX" +
			"OO8SbBF7k2Wu/z6ft4lN/CX2W3duZvhyWTlbadZA9jP9Vk3t8vpe5J2tL8f6" +
			"3Ov3dza56eXTSme3N7Y60mnpts7SW6WNz0nOUNJJikFaSE1fYtXuTcxot4WD" +
			"NLSUtUnpVtwkuaQ6a8sOnB6t29ZFk6WCFTzGnVWBkbnlG0GqSZ9sKmB8u5wh" +
			"F7NNMyjPoDc7/OPxeS9X0tDK3eRuJ0ZZbFcm/DeGoe1Tl5U/vlosOWlrE3i+" +
			"PhbGeHIsd8x3VN0e9wlO7WEWtK279TlcOw/cBCVBIW8FQIi7AAAoCUziIsgA" +
			"AgpbMuCVYyV97gAXCa0ktxVhBMLwRWYyt9hjvOObUbWI0UXlqm//JcsvXRRr" +
			"bMRYQeWXWa/NPeSO9m9tFWdsb2wDCWdIvfNPuuPVjTFAqr+nQJtf21HiyfXf" +
			"iUQNjNKiAKWs2DX6QdHLIqQwVkemHYMvl3/a/xR8Xh+el6kudS/YLzZ5N/Mv" +
			"fXavbPDPr1JbjB6m8n/2zExW4hqwTpMQwraUCFODtxi8CTf/JafF8E8xdi4L" +
			"DO+Sr6+XP1FvifH7v6FQkLQE5YhAUQAKR0FmEBBABpUM5i5R/w5EopK/8Aaq" +
			"z8q8Bi5V8r57DyrxUmVv61wuRFLZN/tSuy8o+Vf9/PzLHyDwjPC5IG9QUfOj" +
			"fCAp4QYREWQACQ0lmEBRAApHQWYQEEACmdRVgAAUBKZxEWQACQ0lmEBRAApH" +
			"QWYQEEACmdRVgAAUBKZxEWQACQ0lmEBRAApHQWYQEEACmdRVgAAUBKZxEWQA" +
			"CQ0lkArA9MJatAph9IyQAAAABJRU5ErkJggg=="
	},

	hitomi_Image_Downloader: {
		f: function() {
			var num1 = Number(prompt("max", "-1"));
			var num2 = Number(prompt("min", "0"));
			var galleryId="";
			if (location.href.indexOf("/reader/") != -1 || location.href.indexOf("/galleries/") != -1) {
				galleryId = location.href.split("/")[location.href.split("/").length - 1].split(".")[0];
			}
			else if ((galleryId = prompt("다운 받을 갤러리 주소",""))) {
				
			}
			else {
				alert("갤러리/리더 화면이 아닙니다.");
				return undefined;
			}
			var target = galleryinfo.slice(num2,(num1==-1?undefined:num1));
			var key=document.getElementsByTagName("img")[0].src.split(".hitomi.la/")[0].split("//")[1] + ".hitomi.la/galleries/";
			if (!confirm("download?")) {
				document.getElementsByTagName("head")[0].innerHTML = "";
				document.body.innerHTML = "";
				var arr=[];
				target.forEach(function (val) {
					arr.push("https://" + key + galleryId + "/" + val.name);
				});
				Extension_Sub_Functions.hitomi_Image_Sequential.f(arr);
			} 
			else {
				target.forEach(function (val,index) {
					var m = "";
					if ((index+num2 + 1) / 10 < 1) {
						m = m + "0";
					}
					if ((index+num2 + 1) / 100 < 1) {
						m = m + "0";
					}
					var hrf = document.createElement("a");
					hrf.href = "https://" + key + galleryId + "/" + val.name;
					hrf.download = "hitomi_" + galleryId + "_" + m + (index+num2 + 1) + ".jpg";
					if (hrf.click) {
						hrf.click();
					} else if (document.createEvent) {
						var eventObj = document.createEvent('MouseEvents');
						eventObj.initEvent('click', true, true);
						hrf.dispatchEvent(eventObj);
					}
				});
			}
		},
		name: "hitomi_Image_Downloader",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAA" +
			"AeP4ixAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6Q" +
			"AAdTAAAOpgAAA6mAAAF2+SX8VGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAW" +
			"JLR0QecgogKwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNC0xMC0xOVQyMTozMD" +
			"ozNyswMjowMF1ZuNsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMTAtMTlUMj" +
			"E6MzA6MzcrMDI6MDAsBABnAAADX0lEQVRoQ+2YP0wTURzHv/enNoW2VG1LAE" +
			"shUQJEB1mcUBcHB00kDsawuOjsREyIiTEYMcRBBgcd1MRJIzFao4MmriYiYS" +
			"CKgRjRQBRBoBRo766+d6XlrELL3e8lhNxbmt67e+/3+X1/v9/73UlZNrANhk" +
			"QB0tp2pOAK3TAA5htJkiDLcuG6YWRhGLr5X5JkKMra3MjgW8euJAXxeDyIx+" +
			"qgst90Oo2vE9+haRrjyqK2tgYtzfvANsTk1A+MfBwtGE8BsuYWhz4xmBLRSB" +
			"g3e6/gwd1buNHTjZ2hKhOCz7UfaEbvxQvo77uKzrOnwXQDZUyTgXA/yLKEQM" +
			"APf2UFAn4/JPbfYCBNu4JoT8/i2/07mB8axO6shoPhIHwsvKhgSEFyov5r2q" +
			"HqEOp8O6Alk5h8lUBk+B262vbiWCxCJosAkFUcpoSu6SxHdEwll7DCcoVlOb" +
			"T5OejJBfhUBQ3BCjDRSIYwEL+/EqdOHkfnmQ7EDx+FFms0K1legrkVDUPT89" +
			"CJqj9Z1eIJHa/fYyZ6dZSFTNHIzP3GxMN7YBJhXJdxO/EGo7NJE2RLVa1S8e" +
			"GpCqHmRAcazp1Hqmk/RmYWyNQwC00pA+zOz8zM4npfPy5dvoau7h48efoCvl" +
			"g95ECQpwrLDaLkWDVQGEhyMYXEy9d4PPAcjwae4f2HYbs+Kes5YSA8sRVWmV" +
			"RVhaqof7UrZVm2yZsEgNCGTLk8pCC8HeE9Fu+vlpdXzObRHIyNVzU+p+u5s4" +
			"V6kJVfbpjX60VrSxM8LJxSqSV8+jyGTCZj9lvV0TAaG+LmWfJz+hfGxr8UWC" +
			"jKLykI97/BPM6F4EVJUZSCsRxG13mrmOvJrC3+lgGhDhM765EoUrxxrhVZf4" +
			"h4KRUGsp6xHFIECGnVshMSVM8IU8QNLZsSuaG1kePcqmUzrMwuiOIDnXuOOF" +
			"Cg+NFtk+wuCGFUkCzlKkLiRsJFXEUInUmylHsgkriRcJFtkyOOQ6tUp1uu05" +
			"2+/pKAODaC4D2eNLS4OhspZJ2jUjKvOBlI/usIVydvJLWxG4UpGYh1k3yoWU" +
			"PO+hlIxCchISDlJjjlfUJAikNLtBrcIWQg+dywGu20mm1GMTIQvik3/H/GW6" +
			"+JgiM5RzbjufXudQroGIQCgmIN0tCiMMjuGn8A/O2d15PLg+EAAAAASUVORK" +
			"5CYII="
	},

	Force_Drag_Enable: {
		f: function(element) {
			if (!element) {
				element = document.documentElement;
			}
			if (element.attributes) {
				if (element.id != "img") {
					element.removeAttribute("ondragstart");
				}
				element.removeAttribute("onselectstart");
				element.removeAttribute("oncontextmenu");
			}
			if (!element.childNodes) {
				return undefined;
			}
			for (i = 0; i < element.childNodes.length; i++) {
				i = Extension_User_Functions.fde.f(element.childNodes[i]);
			}
			return Extension_Tool_Functions.Get_Chils_Index.f(element);
		},
		name: "Force_Drag_Enable"
	}

};

window.Bookmark_User_Functions = {

	Show_Bookmark: {
		f: function(bmkpath,edit) {
			var a = document.getElementById("bmks");
			var e = Number(a.scrollTop);
			while (a.firstChild) {
				a.removeChild(a.firstChild);
			}
			if (!Extension_Variables.Bookmark_Original) {
				if (confirm("web bookmark load failed.\nload bookmark from local?")){
					Extension_Tool_Functions.Emulate_Click_Event.f(document.getElementById("getbmk"));
				}
				return undefined;
			}
			var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
			bmkpath.split("/").forEach(function (val) {
				Bookmark_Pointer = Bookmark_Pointer.value[val];
			});
			var lists=Object.keys(Bookmark_Pointer.value);
			lists.forEach(function (val) {
				var c = document.createElement("div");
				var b = document.createElement("label");
				c.dataset.id = val;
				c.id="chk"+val;
				c.classList.add("__input");
				c.classList.add("__hided");
				if (edit) {
					c.classList.remove("__hided");
				}
				b.appendChild(c);
				b.dataset.src = Bookmark_Pointer.value[val].value;
				b.dataset.loc = bmkpath;
				b.classList.add("__"+Bookmark_Pointer.value[val].type);
				b.id = val;
				b.appendChild(document.createTextNode(val));
				if (!Bookmark_Pointer.value[val].data.croped) {
					document.getElementById("bmks").appendChild(b);
					document.getElementById("bmks").appendChild(document.createElement("br"));
					b.addEventListener("mousedown", Bookmark_User_Functions.Bookmark_Click_Action.f);
				}
			});
			a.scrollTop = e;
		},

		name: "Show_Bookmark"
	},

	Add_Bookmark: {
		f: function() {
			if (!this||this.classList.contains("__disabled")) {
				return undefined;
			}
			var a = {
				name: "",
				path: ""
			};
			a.name = document.getElementsByTagName("title")[0].innerHTML;
			a.path = document.location.href;
			a.name = prompt("bookmark name", a.name);
			a.path = prompt("bookmark path", a.path);
			var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
			document.getElementById("dir").dataset.loc.split("/").forEach(function (val) {
				Bookmark_Pointer = Bookmark_Pointer.value[val];
			});
			if (!Bookmark_Pointer.value[a.name]) {
				if (!a.name) {
					return undefined;
				}
			} else if (confirm("overwrite \"" + a.name + "\" ?")) {
				document.getElementById(a.name).parentNode.removeChild(document.getElementById(a.name));
			} else if (!!(a.name = prompt("new name from " + a.name, ""))) {
				while (Bookmark_Pointer.value[a.name]) {
					if (!!(a.name = prompt("new name from " + a.name, ""))) {

					} else {
						return undefined;
					}
				}
			} else {
				return undefined;
			}
			Bookmark_Pointer.value[a.name] = {};
			Bookmark_Pointer.value[a.name].type = "link";
			Bookmark_Pointer.value[a.name].path = document.getElementById("dir").dataset.loc;
			Bookmark_Pointer.value[a.name].data={};
			var b=(new Date()).getTime();
			Bookmark_Pointer.value[a.name].data.created = b;
			Bookmark_Pointer.value[a.name].data.modified = b;
			Bookmark_Pointer.value[a.name].data.croped=false;
			Bookmark_Pointer.value[a.name].value = a.path;
			Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc);
			window.postMessage({
				type: "setbmk",
				bmk: Extension_Variables.Bookmark_Original
			}, location.href);
		},

		name: "Add_Bookmark"
	},

	Bookmark_Click_Action: {
		f: function(e) {
			if (!document.getElementById("bmks").classList.contains("__editing") && e.which == 1) {
				if (this.classList.contains("__link")) {
					if (document.getElementById("tab").classList.contains("__checked")) {
						window.open(this.dataset.src, "_self");
					} else {
						window.open(this.dataset.src, "_blank");
					}
				} else if (this.classList.contains("__folder")) {
					var s = document.getElementById("dir").dataset.loc + "/" + this.id;
					document.getElementById("dir").setAttribute("data-loc", s);
					document.getElementById("dir").innerHTML = s;
					Bookmark_User_Functions.Show_Bookmark.f(s);
					if (document.getElementById("go_up").classList.contains("__disabled")) {
						document.getElementById("go_up").classList.remove("__disabled");
					}
				}
			} else if (e.which == 1) {
				var input=document.getElementById("chk"+this.id);
				Extension_Tool_Functions.Element_Toggle.f.call(input,e);
			} else if (e.which == 3) {
				e.preventDefault();
				if (this.getAttribute("class") == "__link") {
					var a = {};
					a.name = prompt("bookmark name", this.innerText);
					a.path = prompt("bookmark path", this.dataset.src);
					var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
					document.getElementById("dir").dataset.loc.split("/").forEach(function (val) {
						Bookmark_Pointer = Bookmark_Pointer.value[val];
					});
					if (!Bookmark_Pointer.value[a.name]) {
						if (!a.name) {
							return undefined;
						}
					} else if (Bookmark_Pointer.value[a.name] == this.dataset.src) {

					} else if (confirm("overwrite \"" + a.name + "\" ?")) {
						document.getElementById(a.name).parentNode.removeChild(document.getElementById(a.name));
					} else if (!!(a.name = prompt("new name from " + a.name, ""))) {
						while (Bookmark_Pointer.value[a.name]) {
							if (!!(a.name = prompt("new name from " + a.name, ""))) {

							} else {
								return undefined;
							}
						}
					} else {
						return undefined;
					}
					Bookmark_Pointer.value[a.name] = {};
					Bookmark_Pointer.value[a.name].type = "link";
					Bookmark_Pointer.value[a.name].path = document.getElementById("dir").dataset.loc;
					Bookmark_Pointer.value[a.name].data={};
					var b=(new Date()).getTime();
					Bookmark_Pointer.value[a.name].data.created = Bookmark_Pointer.value[this.innerText].data.created;
					Bookmark_Pointer.value[a.name].data.modified = b;
					Bookmark_Pointer.value[a.name].data.croped=false;
					Bookmark_Pointer.value[a.name].value = a.path;
					delete Bookmark_Pointer.value[this.innerText];
					Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc,
						document.getElementById("bmks").classList.contains("__editing"));
					window.postMessage({
						type: "setbmk",
						bmk: Extension_Variables.Bookmark_Original
					}, location.href);
				} else if (this.getAttribute("class") == "__folder") {
					var a = {};
					a.name = prompt("bookmark name", this.innerText);
					var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
					document.getElementById("dir").dataset.loc.split("/").forEach(function (val) {
						Bookmark_Pointer = Bookmark_Pointer.value[val];
					});
					if (!Bookmark_Pointer.value[a.name]) {
						if (!a.name) {
							return undefined;
						}
					} else if (Bookmark_Pointer.value[a.name] == Bookmark_Pointer.value[this.innerText]) {

					} else if (confirm("overwrite \"" + a.name + "\" ?")) {
						document.getElementById(a.name).parentNode.removeChild(document.getElementById(a.name));
					} else if (!!(a.name = prompt("new name from " + a.name, ""))) {
						while (Bookmark_Pointer.value[a.name]) {
							if (!!(a.name = prompt("new name from " + a.name, ""))) {

							} else {
								return undefined;
							}
						}
					} else {
						return undefined;
					}
					//Bookmark_User_Functions.Bookmark_Compare.f(Bookmark_Pointer[a.name], Bookmark_Pointer[this.innerText]);
					console.log(Bookmark_Pointer.value[a.name]);
					[Bookmark_Pointer.value[a.name], Bookmark_Pointer.value[this.innerText]]=[Bookmark_Pointer.value[this.innerText],Bookmark_Pointer.value[a.name]];
					var b=(new Date()).getTime();
					Bookmark_Pointer.value[a.name].data.modified = b;
					if (!(a.name==this.innerText)) {
						delete Bookmark_Pointer.value[this.innerText];
					}
					Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc,
						document.getElementById("bmks").classList.contains("__editing"));
					window.postMessage({
						type: "setbmk",
						bmk: Extension_Variables.Bookmark_Original
					}, location.href);
				}
			} else if (e.which == 2) {
				e.preventDefault();
				if (this.getAttribute("class") == "__link") {
					var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
					document.getElementById("dir").dataset.loc.split("/").forEach(function (val) {
						Bookmark_Pointer = Bookmark_Pointer.value[val];
					});
					delete Bookmark_Pointer.value[this.innerText];
					Bookmark_Pointer.value[document.getElementsByTagName("title")[0].innerHTML] = {};
					Bookmark_Pointer.value[document.getElementsByTagName("title")[0].innerHTML].type = "link";
					Bookmark_Pointer.value[document.getElementsByTagName("title")[0].innerHTML].path = document.getElementById("dir").dataset.loc;
					Bookmark_Pointer.value[document.getElementsByTagName("title")[0].innerHTML].data={};
					var b=(new Date()).getTime();
					Bookmark_Pointer.value[document.getElementsByTagName("title")[0].innerHTML].data.created = b;
					Bookmark_Pointer.value[document.getElementsByTagName("title")[0].innerHTML].data.modified = b;
					Bookmark_Pointer.value[document.getElementsByTagName("title")[0].innerHTML].data.croped=false;
					Bookmark_Pointer.value[document.getElementsByTagName("title")[0].innerHTML].value = location.href;
					Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc,
						document.getElementById("bmks").classList.contains("__editing"));
					window.postMessage({
						type: "setbmk",
						bmk: Extension_Variables.Bookmark_Original
					}, location.href);
				}
			}
		},

		name: "Bookmark_Click_Action"
	},

	Activate_Bookmark_Edit: {
		f: function() {
			document.getElementById("bmks").classList.add("__editing")
			for (var s of document.getElementsByClassName("__inedit")) {
				s.classList.add("__disabled");
			}
			for (s of document.getElementsByClassName("__editout")) {
				s.classList.remove("__invisibled");
			}
			for (s of document.getElementsByClassName("__input")) {
				s.classList.remove("__hided");
			}
		},

		name: "Activate_Bookmark_Edit"
	},

	Deactivate_Bookmark_Edit: {
		f: function() {
			document.getElementById("bmks").classList.remove("__editing")
			for (var s of document.getElementsByClassName("__inedit")) {
				s.classList.remove("__disabled");
			}
			for (s of document.getElementsByClassName("__editout")) {
				s.classList.add("__invisibled");
			}
			if (document.getElementById("dir").dataset.loc == "root") {
				document.getElementById("go_up").classList.add("__disabled");
			}
			for (s of document.getElementsByClassName("__input")) {
				s.classList.add("__hided");
			}
		},

		name: "Deactivate_Bookmark_Edit"
	},

	Remove_Bookmark: {
		f: function() {
			var a = document.getElementById("bmks").querySelectorAll("#bmks .__input.__checked");
			var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
			for (var t of document.getElementById("dir").dataset.loc.split("/")) {
				Bookmark_Pointer = Bookmark_Pointer.value[t];
			}
			a.forEach(function (val) {
				var c = document.getElementById(val.dataset.id);
				while (!c.tagName||!c.tagName.match(/^br$/i)) {
					c=c.nextSibling;
				}
				c.parentNode.removeChild(c);
				c = document.getElementById(val.dataset.id);
				delete Bookmark_Pointer.value[val.dataset.id];
				c.parentNode.removeChild(c);
			});
			window.postMessage({
				type: "setbmk",
				bmk: Extension_Variables.Bookmark_Original
			}, location.href);
		},

		name: "Remove_Bookmark"
	},

	Go_To_Upper_Bookmark_Folder: {
		f: function() {
			var a = document.getElementById("dir").dataset.loc.split("/");
			if (a.length == 2) {
				document.getElementById("go_up").classList.add("__disabled")
			}
			var b = "";
			for (var i = 0; i < a.length - 1; i++) {
				if (i == 0) {
					b += a[i];
				} else {
					b += "/" + a[i];
				}
			}
			document.getElementById("dir").dataset.loc = b;
			document.getElementById("dir").innerHTML = b;
			Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc);
		},

		name: "Go_To_Upper_Bookmark_Folder"
	},

	Create_Bookmark_Folder: {
		f: function() {

			var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
			for (var t of document.getElementById("dir").dataset.loc.split("/")) {
				Bookmark_Pointer = Bookmark_Pointer.value[t];
			}
			var a;
			if (!!(a = prompt("folder name", ""))) {
				while (Bookmark_Pointer.value[a]) {
					if (!!(a = prompt("folder name", ""))) {

					} else {
						return undefined;
					}
				}
			} else {
				return undefined;
			}
			Bookmark_Pointer.value[a] = {};
			Bookmark_Pointer.value[a].type = "folder";
			Bookmark_Pointer.value[a].path = document.getElementById("dir").dataset.loc;
			Bookmark_Pointer.value[a].data={};
			var b=(new Date()).getTime();
			Bookmark_Pointer.value[a].data.created = b;
			Bookmark_Pointer.value[a].data.modified = b;
			Bookmark_Pointer.value[a].data.croped=false;
			Bookmark_Pointer.value[a].value = {};
			Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc);
			window.postMessage({
				type: "setbmk",
				bmk: Extension_Variables.Bookmark_Original
			}, location.href);
		},

		name: "Create_Bookmark_Folder"
	},

	Move_Bookmarks: {
		f: function() {
			var a = document.getElementById("bmks").querySelectorAll("#bmks .__input.__checked");
			var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
			document.getElementById("dir").dataset.loc.split("/").forEach(function (val) {
				Bookmark_Pointer = Bookmark_Pointer.value[val];
			});
			if (!(Extension_Variables.Paste_Bookmarks)) {
				Extension_Variables.Paste_Bookmarks = [];
			}
			a.forEach(function (val) {
				Bookmark_Pointer.value[val.dataset.id].data.name=val.dataset.id;
				Bookmark_Pointer.value[val.dataset.id].path=document.getElementById("dir").dataset.loc;
				Bookmark_Pointer.value[val.dataset.id].data.croped=true;
				Extension_Variables.Paste_Bookmarks.push(Bookmark_Pointer.value[val.dataset.id]);
				delete Bookmark_Pointer.value[val.dataset.id];
			});
			document.getElementById("pastebmk").classList.remove("__hided");
			document.getElementById("bmks").classList.add("__copyactive");
			Bookmark_User_Functions.Deactivate_Bookmark_Edit.f();
			Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc);
		},

		name: "Move_Bookmarks"
	},

	Cancel_Paste: {
		f: function() {
			Extension_Variables.Paste_Bookmarks.forEach( function (d) {
				console.log(d);
				var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
				for (var t of d.loc.split("/")) {
					Bookmark_Pointer = Bookmark_Pointer.value[t];
				}
				Bookmark_Pointer.value[d.name].data.croped=false;
			});
			Extension_Variables.Paste_Bookmarks = [];
			document.getElementById("pastebmk").classList.add("__hided");
			document.getElementById("bmks").classList.remove("__copyactive");
			Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc);
		},

		name: "Cancel_Paste"
	},

	Cancel_Paste_Second: {
		f: function() {
			Extension_Variables.Paste_Bookmarks.forEach( function (d) {
				var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
				d.path.split("/").forEach(function (t) {
					Bookmark_Pointer = Bookmark_Pointer.value[t];
				});
				Bookmark_Pointer.value[d.data.name]=d;
				Bookmark_Pointer.value[d.data.name].data.croped=false;
			});
			Extension_Variables.Paste_Bookmarks = [];
			document.getElementById("pastebmk").classList.add("__hided");
			document.getElementById("bmks").classList.remove("__copyactive");
			Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc);
		},

		name: "Cancel_Paste2"
	},

	Paste_Bookmark_Second: {
		f: function() {
			for (var d of Extension_Variables.Paste_Bookmarks) {
				var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
				for (var t of document.getElementById("dir").dataset.loc.split("/")) {
					Bookmark_Pointer = Bookmark_Pointer.value[t];
				}
				d.path=document.getElementById("dir").dataset.loc;
				if (d.type == "folder") {
					if (!Bookmark_Pointer.value[d.data.name]) {
						Bookmark_Pointer.value[d.data.name] = d;
						Bookmark_Pointer.value[d.data.name].data.croped=false;
					} else {
						[Bookmark_Pointer.value[d.name],Bookmark_Pointer_Second.value[d.name]]=[Bookmark_Pointer_Second.value[d.name],Bookmark_Pointer.value[d.name]]
						if (JSON.stringify(Bookmark_Pointer_Second.value[d.name]) == "{}") {
							delete Bookmark_Pointer_Second.value[d.name];
						}
						continue;
					}
				} else {
					if (Bookmark_Pointer.value[d.data.name]) {
						if (!confirm(d.data.name + " is already exist.\n overwrite it?")) {
							if (!!(d.data.name = prompt("new bookmark name", ""))) {
								while (Bookmark_Pointer.value[d.data.name]) {
									if (!!(d.data.name = prompt("new bookmark name", ""))) {

									} else {
										continue;
									}
								}
							} else {
								continue;
							}
						}
					}
					Bookmark_Pointer.value[d.data.name] = d;
					Bookmark_Pointer.value[d.data.name].data.croped=false;
				}
			}
			Extension_Variables.Paste_Bookmarks = [];
			document.getElementById("pastebmk").classList.add("__hided");
			document.getElementById("bmks").classList.remove("__copyactive");
			Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc);
			window.postMessage({
				type: "setbmk",
				bmk: Extension_Variables.Bookmark_Original
			}, location.href);
		},

		name: "Paste_Bookmark2"
	},

	Paste_Bookmark: {
		f: function() {
			for (var d of Extension_Variables.Paste_Bookmarks) {
				var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
				for (var t of document.getElementById("dir").dataset.loc.split("/")) {
					Bookmark_Pointer = Bookmark_Pointer.value[t];
				}
				var Bookmark_Pointer_Second = Extension_Variables.Bookmark_Original;
				for (var t of d.loc.split("/")) {
					Bookmark_Pointer_Second = Bookmark_Pointer_Second.value[t];
				}
				if (typeof Bookmark_Pointer_Second.value[d.name] == "object") {
					if (!Bookmark_Pointer.value[d.name]) {
						Bookmark_Pointer.value[d.name] = {};
						[Bookmark_Pointer.value[d.name],Bookmark_Pointer_Second.value[d.name]]=[Bookmark_Pointer_Second.value[d.name],Bookmark_Pointer.value[d.name]]
						if (JSON.stringify(Bookmark_Pointer_Second.value[d.name]) == "{}") {
							delete Bookmark_Pointer_Second.value[d.name];
						}
					} else {
						[Bookmark_Pointer.value[d.name],Bookmark_Pointer_Second.value[d.name]]=[Bookmark_Pointer_Second.value[d.name],Bookmark_Pointer.value[d.name]]
						if (JSON.stringify(Bookmark_Pointer_Second.value[d.name]) == "{}") {
							delete Bookmark_Pointer_Second.value[d.name];
						}
						continue;
					}
				} else {
					if (Bookmark_Pointer.value[d.name]) {
						if (!confirm(d.name + " is already exist.\n overwrite it?")) {
							if (!!(d.name = prompt("new bookmark name", ""))) {
								while (Bookmark_Pointer.value[d.name]) {
									if (!!(d.name = prompt("new bookmark name", ""))) {

									} else {
										continue;
									}
								}
							} else {
								continue;
							}
						}
					}
					delete Bookmark_Pointer_Second.value[d.name];
					Bookmark_Pointer.value[d.name] = d.path;
					Bookmark_Pointer.value[d.name].data.croped=false;
				}
			}
			Extension_Variables.Paste_Bookmarks = [];
			document.getElementById("pastebmk").classList.add("__hided");
			document.getElementById("bmks").classList.remove("__copyactive");
			Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc);
			window.postMessage({
				type: "setbmk",
				bmk: Extension_Variables.Bookmark_Original
			}, location.href);
		},

		name: "Paste_Bookmark"
	},

	Export_Bookmark: {
		f: function() {
			window.postMessage({
				type: "exportbmk",
				des: "back"
			}, location.href);
		},

		name: "Export_Bookmark"
	},

	Sort_Bookmark: {
		f: function() {

			var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
			for (var s of document.getElementById("dir").dataset.loc.split("/")) {
				Bookmark_Pointer = Bookmark_Pointer.value[s];
			}
			var Temporal_Bookmark = {};
			var Bookmark_Folders = [];
			var Bookmark_Links = [];
			for (var key in Bookmark_Pointer.value) {
				if (Bookmark_Pointer.value[key].type == "folder") {
					Bookmark_Folders.push(key);
				} else {
					Bookmark_Links.push(key);
				}
			}
			if (Bookmark_Folders.length > 1) {
				Bookmark_Folders.sort();
			}
			if (Bookmark_Links.length > 1) {
				Bookmark_Links.sort();
			}
			for (key = 0; key < Bookmark_Folders.length; key++) {
				Temporal_Bookmark[Bookmark_Folders[key]] = Bookmark_Pointer.value[Bookmark_Folders[key]];
			}
			for (key = 0; key < Bookmark_Links.length; key++) {
				Temporal_Bookmark[Bookmark_Links[key]] = Bookmark_Pointer.value[Bookmark_Links[key]];
			}
			for (key in Temporal_Bookmark) {
				delete Bookmark_Pointer.value[key];
				Bookmark_Pointer.value[key] = Temporal_Bookmark[key];
			}
			Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc);
			window.postMessage({
				type: "setbmk",
				bmk: Extension_Variables.Bookmark_Original
			}, location.href);
		},

		name: "Sort_Bookmark"
	},

	Hide_Bookmark: {
		f: function() {
			document.getElementById("bmkmain").classList.add("__hided");
			var a = document.getElementById("actionbar")
			a.classList.remove("__hided");
		},

		name: "Hide_Bookmark"
	},

	Backup_Bookmark: {
		f: function() {
			var a=document.createElement("a");
			var b=new Date();
			a.download="backup(date:"+b.getFullYear()+"_"+(b.getMonth()+1)+"_"+b.getDate()+"_"+b.getHours()+"_"+b.getMinutes()+"_"+b.getSeconds()+"_"+b.getMilliseconds()+").json";
			a.href="data:text/plain,"+escape(Extension_Tool_Functions.utf8_encode.f(JSON.stringify(Extension_Variables.Bookmark_Original)));
			Extension_Tool_Functions.Emulate_Click_Event.f(a);
		},

		name: "Backup_Bookmark"
	},

	Import_Bookmark: {
		f: function() {
			window.postMessage({
				type: "importbmk"
			}, location.href);
		},

		name: "Import_Bookmark"
	},
	
	Merge_Bookmark: {
		f: function() {
			Extension_Tool_Functions.Emulate_Click_Event.f(document.getElementById("getbmk"));
		},
		name: "Remove_Saved_Bookmark"
	},

	Remove_Saved_Bookmark: {
		f: function() {
			window.postMessage({
				type: "removebmk"
			}, location.href);
		},

		name: "Remove_Saved_Bookmark"
	},

	Get_External_Bookmark: {
		f: function() {
			var reader = new FileReader();
			reader.addEventListener("load", function() {
				if (!Extension_Variables.Bookmark_Original) {
					Extension_Variables.Bookmark_Original={};
				}
				Extension_Variables.Bookmark_Original = Object.asign(Extension_Variables.Bookmark_Original,JSON.parse(Extension_Tool_Functions.utf8_decode.f(reader.result)));
				window.postMessage({
					type: "setbmk",
					bmk: Extension_Variables.Bookmark_Original
				}, location.href);
				Bookmark_User_Functions.Show_Bookmark.f("root");
			}, false);
			if (this.files[0]) {
				reader.readAsBinaryString(this.files[0]);
			}
			document.getElementById("getbmk").classList.add("__hided");
		},

		name: "Get_External_Bookmark"
	}

}

window.Extension_Variables = {
	Bookmark_Interface_List: [{
		tag: "div",
		name: "edit bmks",
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Activate_Bookmark_Edit.f
		}]
	},
	{
		tag: "div",
		name: "add bmk",
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Add_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "sort bmk",
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Sort_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "new folder",
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Create_Bookmark_Folder.f
		}]
	},
	{
		tag: "div",
		name: "go up",
		classname: ["__buttons","__disabled","__inedit"],
		id:"go_up",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Go_To_Upper_Bookmark_Folder.f
		}]
	},
	{
		tag: "div",
		name: "close bmks",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Hide_Bookmark.f
		}]
	},
	{
		tag: "br"
	},
	{
		tag: "div",
		id: "tab",
		events: [{
			name: "click",
			value: Extension_Tool_Functions.Element_Toggle.f
		}],
		classname:["__input","__extension"]
	},
	{
		tag: "span",
		name: "this tab",
		events: [{
			name: "click",
			value: function (event) {
				Extension_Tool_Functions.Element_Toggle.f.call(document.getElementById("tab"),event);
			}
		}],
		classname:["__extension"]
	},
	{
		tag: "div",
		name: "import",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Import_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "export",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Export_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "backup",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Backup_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "merge",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Merge_Bookmark.f
		}]
	},
	{
		tag: "input",
		id: "getbmk",
		classname: ["__hided"],
		events: [{
			name: "change",
			value: Bookmark_User_Functions.Get_External_Bookmark.f
		}],
		attributes: [{
				name: "accept",
				value: ".json"
			},
			{
				name: "type",
				value: "file"
			}
		]
	},
	{
		tag: "div",
		name: "root",
		id: "dir",
		attributes: [{
			name: "data-loc",
			value: "root"
		}]
	},
	{
		tag: "div",
		name: "remove",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Remove_Bookmark.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "move",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Move_Bookmarks.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "end",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Deactivate_Bookmark_Edit.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "loading...",
		id: "bmks"
	}]
}