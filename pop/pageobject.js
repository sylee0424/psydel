window.Extension_Sub_Functions = {
	Add_Extension_Interface: {
		f: function() {
			Extension_Variables.Bookmark_Interface_List.forEach(Extension_Tool_Functions.Import_Nodes.f);
			Extension_Tool_Functions.Import_Nodes.f({
				tag: "div",
				id: "pastebmk",
				classname: ["__hided"],
				target: document.body
			});
			Extension_Tool_Functions.Import_Nodes.f({
				tag: "div",
				name: "paste bmk",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD8SURBVEhL7dUxTgJBFMbx1XgPC2NJoSewtLSwQw5hhQVUFkqDx4Ab0FB4A7XVjgOQcACR/7fuSyYvM7OyErKJfskv2Rlm3stu2NmiLTnENW5xrIld5wlflSUaNznHG9awgmaKjpszK4xxgGxescAIj3iGCuj6Eoqfl0k1vkI2n1Bxyx200cfPH0Hj+3KUiRY9fF+WsUIpYTQO90bjF13AHkNMmEYNtkn7G+hl66GfoL1znCKZXAMV1+91PpCMFqQapP6yYWrX/Df4Aw38YRdmJw3suB7Av0gz/LrBGV6gO9HCmFx+cpfJ3MA3i3lHo+hz2EXs2DZDnGBfKYoNj8aK9uWSNrcAAAAASUVORK5CYII=",
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
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADJSURBVEhL7dPLCQIxFIXhLNyJbrQA63AnFqAFia9arMBHB27VDmxBEXci+p/IwITRxei9m8EDHyQZJne4k4RKponFa2ifLo54xJlhapjgBm1uWqCDLbKNv3HFHnO0kcSiQN4JQyT5tUV19LCE3r1jgEIsfvIIev+MQrsUi2O6gopM48whapcKHOLMIQ2owCXOHOJewL1Fa6iAjr55xtDmunAtLVhEPe9jA22eXDQtiFJm/Im+PLnF2QOlzDhPp2WHGd7e3n8qmxCeHp1rU1t2vOAAAAAASUVORK5CYII=",
				classname: ["__buttons"],
				events: [{
					name: "click",
					value: Bookmark_User_Functions.Cancel_Paste_Second.f
				}],
				target: document.getElementById("pastebmk")
			});
		},
		name: "Drag_Event_Checker"
	}
};

window.Extension_Tool_Functions = {

	Element_Toggle: {
		f: function(event) {
			event.stopPropagation();
			this.classList.toggle("__checked");
			this.checked = this.classList.contains("__checked");
		}
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
				document.body.appendChild(div);
			}
		},
		name: "Drag_Event_Checker"
	}
};

window.Bookmark_User_Functions = {

	Show_Bookmark: {
		f: function(bmkpath,edit=false) {
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
			if (!Bookmark_Pointer) {
				Bookmark_User_Functions.Show_Bookmark.f("root",edit);
				document.getElementById("dir").dataset.loc="root";
				return undefined;
			}
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
			extension.storage.local.set({"loc":bmkpath});
		},

		name: "Show_Bookmark"
	},

	Add_Bookmark: {
		f: function() {
			if (!this||this.classList.contains("__disabled")) {
				return undefined;
			}
			convertCF(this,extension.tabs.executeScript,function (a) {
				Storage_Action({
					type:"add",
					loc:document.getElementById("dir").dataset.loc,
					data:a
				});
			},{code:"var a={}; a.title=document.title; a.url=location.href; a.type='link'; a;"});
		},

		name: "Add_Bookmark"
	},

	Bookmark_Click_Action: {
		f: function(e) {
			if (!document.getElementById("bmks").classList.contains("__editing") && e.which == 1) {
				if (this.classList.contains("__link")) {
					var a={};
					a.url=this.dataset.src;
					a.active=!document.getElementById("bactab").classList.contains("__checked");
					if (document.getElementById("tab").classList.contains("__checked")) {
						extension.tabs.update(a);
					} else {
						extension.tabs.create(a);
					}
				} else if (this.classList.contains("__folder")) {
					var s = document.getElementById("dir").dataset.loc + "/" + this.id;
					document.getElementById("dir").dataset.loc=s;
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
				if (this.classList.contains("__link")) {
					var a = {};
					a.ptitle = this.id;
					a.title = prompt("bookmark name", this.id);
					a.url = prompt("bookmark path", this.dataset.src);
					a.type = "link";
					Storage_Action({
						type:"edit",
						loc:document.getElementById("dir").dataset.loc,
						data:[a]
					});
				} else if (this.classList.contains("__folder")) {
					var a = {};
					a.ptitle = this.id;
					a.title = prompt("bookmark name", this.id);
					a.type = "folder";
					Storage_Action({
						type:"edit",
						loc:document.getElementById("dir").dataset.loc,
						data:[a]
					});
				}
			} else if (e.which == 2) {
				e.preventDefault();
				if (this.classList.contains("__link")) {
					convertCF(this,extension.tabs.executeScript,function (c) {
						console.log(c);
						Storage_Action({
							type:"update",
							loc:document.getElementById("dir").dataset.loc,
							data:[{
								type:"link",
								title:c[0].title,
								ptitle:c[0].ptitle,
								url:c[0].url
							}]
						});
					},{code:"var a={}; a.title=document.title; a.url=location.href; a.ptitle='"+this.id+"'; a;"});
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
			for (s of document.querySelectorAll("#bmks .__input")) {
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
			for (s of document.querySelectorAll("#bmks .__input")) {
				s.classList.add("__hided");
			}
		},

		name: "Deactivate_Bookmark_Edit"
	},

	Remove_Bookmark: {
		f: function() {
			Storage_Action({
				type:"remove",
				loc:document.getElementById("dir").dataset.loc,
				data:Array.prototype.slice.call(
					document.getElementById("bmks").querySelectorAll("#bmks .__input.__checked")
				).map(val => val.dataset.id)
			});
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
			var a = {};
			a.title = prompt("bookmark name", document.title);
			a.type = "folder";
			Storage_Action({
				type:"add",
				loc:document.getElementById("dir").dataset.loc,
				data:[a]
			});
		},

		name: "Create_Bookmark_Folder"
	},

	Move_Bookmarks: {
		f: function() {
			document.getElementById("pastebmk").classList.remove("__hided");
			document.getElementById("bmks").classList.add("__copyactive");
			Bookmark_User_Functions.Deactivate_Bookmark_Edit.f();
			Storage_Action({
				type:"remove",
				loc:document.getElementById("dir").dataset.loc,
				data:Array.prototype.slice.call(
					document.getElementById("bmks").querySelectorAll("#bmks .__input.__checked")
				).map(val => val.dataset.id),
				crop:true
			});
		},

		name: "Move_Bookmarks"
	},

	Cancel_Paste_Second: {
		f: function() {
			Storage_Action({
				type:"return",
				loc:document.getElementById("dir").dataset.loc
			});
		},

		name: "Cancel_Paste2"
	},

	Paste_Bookmark_Second: {
		f: function() {
			Storage_Action({
				type:"move",
				loc:document.getElementById("dir").dataset.loc
			});
			document.getElementById("pastebmk").classList.add("__hided");
			document.getElementById("bmks").classList.remove("__copyactive");
		},

		name: "Paste_Bookmark2"
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
			Storage_Action({
				type:"sort",
				loc:document.getElementById("dir").dataset.loc
			});
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
			window.postMessage({
				type: "backupbmk",
				des: "back"
			}, location.href);
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
				Storage_Action({
					type:"import",
					loc:document.getElementById("dir").dataset.loc,
					data:[JSON.parse(Extension_Tool_Functions.utf8_decode.f(reader.result))]
				});
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
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFQSURBVEhL7dPPKwRhHMfxWcWVRBJyd+OERDnI38HfoHXh6Nd/ws1/4KokSiK5cEdCHPx4v3dNTds+9tk8k4tPvWp2dub5PvvZmew/7WYCp/jAZwSvO4H3RcWLb7CNrQg7uIX3ReUdLt5O1uF9UfFnb9YPy6nLC/MBpdRVHFBKXcUBxePYrML7gvnzAZVvofx6QAeusI8VTKETeZJU5OI+kvnje4gemCQD3LmLj2EZrzhCL0ZxjWCKj2ZowCT8bqn2KcsW8YJj9GEEweQv1xpCA7pgLW9wcbOAZ/jm93silHE4JO+32QDTDWtx5y5u5uGQMwx4olVavcl2bi0u6uJmFk84x6AnfkqxrmoT/qF2bi0OmYOZwSMuMOSJUBrrauTTMgw7txZ37uJmGg84qH1KEDu3Fnfu4mYP9/XDNLHzS7jzXfgrN5A0VmYtd2DxrPIF/Z6XYmBn5SYAAAAASUVORK5CYII=",
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Activate_Bookmark_Edit.f
		}]
	},
	{
		tag: "div",
		name: "add bmk",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVGhD7dgxCoAwEETRtNqIJ/DWgqfV3XbRYDCRSfgPpgmC/kIEEwAAwCuT7Qjzs+4stjPMz7pDiBpC1BCihhA1hLQ229aCbbYY4md31z7N71ndbosP1np+z+oI+TBCcoZ52UvxHVFDiBpC1BCihhA1w4QM8xMbAAD8K6UL3iPe8XBShfQAAAAASUVORK5CYII=",
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
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALqSURBVGhD7ZlL6A1RHMePdyTylrxSZIGtPBOyETuKkvKK9E+i2MjKY2WFjSXWIiWPLDzzihQbFIWFDYmV5+d7zj11mu7Mnbn3/OfOn/nUp/v73f+/e8+3uTNz5hxTU1NTmAm4BtdVVI1NY8xkBX7DPxVXY1yOqdzBD6jUKyuqxqYx3sJU3uFlV1YajVFjTaUOUjJRgwxovHaDqEGe4GFXlk7UIF/wvCtTmYVH8XjDPRiD0oNsx9/or/+fcCh2StQgn/GsK3MxBAe7smOiBtmJ811ZOlGDdJOoQU7ielemounEI3zcxGs4BtshapA8J/sSvIrXA++hgqgei+1QepDeog7SjDxB+uF0nJHiNByFw7EIpQfZh+EDUZq/cCnmpfQgE3Eb7sBdeCBFTV2KHJXSg/QWdZBm5AkyBfdj8qe0F/Vza+YWHI1ZlB6kB5ud3K1UmCzaDrIZL+JI2zmSQRbgXdRlNWQqJi+7Wepy3Yq2g2jO9BMfog8TBlEI9e9xvN7oZdoOIjahwmgSqDA+yMJGrRAzsQw6CiLCMN/xOWaF0MrlfbyB4cQxr5pwrsIkHQcRPow/MbOOhAbxAJNT+DSf4ZvAV7gBk0QJInyYMn9OIdGCCJ3guk90g6hBukkdpGr8n0GO4SlXWs7gIVdaLuFuV5r+qEUFbY2JYfgUl9nOPZe8xHm2M2Y2vsDJtjNmMeqe5GcNa1GziIG2M2YrXnGlpVCQ26gP96gOj1Y4RdEAdE9ReKH5lXo9TAkNVP1G2xmzGtXrfaH/Uz/XdsYcRPU+2GnU93kKBbmAN11p0VbXOVdaXuMJV9qlUH2RpuxCz+E/0N/MdAS0Buzv0otQA51jO3ckdV+aZDsXTPuEWmYVR/CtKy2FgmixOXz8HIH+g4UGO8iVFq1R6SfmGdd49ST75OQy/Ls+J1zz0l5M+IzSMkhf2AzV+fMRMzdDteXbF7anv2Lm9rTQIdcRCTfpq6TGVsYzT03NP4QxfwEEVaw9vxJoVgAAAABJRU5ErkJggg==",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Sort_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "new folder",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL0SURBVGhD7Zo5rA1RAIZfYhd7ZY8gGiERQSnREFthaUS0Yo1GKB8iEh0SnS2CoFHQEBqhoqMQBAWJXYLC7vvGPc/cefPu3Ce5c8+T+ZIv754z52bmvzPnnJkzr6OioqJphuARfI+/mvA5LsLoOIwe4A98V+AHtO1HnIpR8QZ/4oykVMwpNMwt7GdFLHhQ/tLNMgKfoN/bg6NLcjg2pLdBZCF+R79bpk9xLeZig94GkTX4EPP6UisM/dMfcC5241+DtIP96PEeSEoZ+lKQdejxHk1KGUKQweiQGqsTsTCIw++32ueY/Vr722MQ/YyPI/YZ+oM3DOKs7qmLnU5sGOS/6ux9gSpIbFRBYqMKEhtVkNiogsRGFaRsBuJknIczcSSmiT7IYryILvx5PEEXGu7gdhyG0QbxGegGhgP3uegRuvh3D9PBXKoNi4NRBXFJ5wW6/1e4A8dimkG4DG9jCBRVEM9ECHEFXb1MMwEH/PnYxVYM6wrHrMjSjiDX0f1exuz68Xz02fxQUqpnPfq9TzjFijRlB1mC7vMljrIig5eS288kpe4cR7fbX+ooO4ijk/u0T+RRFGQ8uiz0BcdYESgziNe9I5Gj0zgrcigKIlfRNquTUo0ygzjZuT+H2MACdIU96LqubW6m6nQF+nZNfJ1hG5eHuigziAft/hxOZRKGRbdm3IWyBS37yrALK8oK4lsx9+dkJ15qjk4XUnombOPKYrr+LM5GMZBt9iWlGmUG8TbDM+Dw6WSXRzN9JMzwG5NSDTue675lEWbp5UmpO0VB+qN3AraZZkXgPlp5ENOdq1WG4df7qTyKgmxGt3szWcdKbNcrhW2YJUyYp5NSPdPxLbp9qRVZ5qBnJN25WukltK94m74B0/jCaTfOSkp/McQDNMQ5K2JhE4ah19uOniZI+4SXky9EbWsfG4pR4dlwxPQAve24hnvRkJ6Vk/ga3a7nMboQASfFE5h9Okx7F+07fQLnmFW4E/3/GM+M80TdEFtPR8dvE7bxLI9A09kAAAAASUVORK5CYII=",
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
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALlSURBVGhD7ZhNqE1BAMePr0IpNpLFK0IpNmQjHz31LNgjSYpIiYXEAisLeRuvXkrpLWwslC2SRBaSvY2djZJvsSD8f3POaNzmns+Zc506//plZs7MnPm579yZe5I+ffr06Wy2idviQUVuikNijhh5Vonv4qN4UZF34re4KxaKkeaIYDEbTK1a+CTOi1/ioRipzHGByJip1ctJgcwjMTKZECLkhEDmudgslgRmtshNKBFyWPC8MV9oPgnWOjQhRchycUBcEpcD8kz8FCuFN6FFYmWHYJ27TM2TrohsEazzi3gv3or7YoUw6ZoIe9Z1wWb8VTwWJl0T2W1qaW6IH2kxngib5WRGiCOMT+SaoM0khggLnxHMC5SbyrQu4kpMZYSQaVVkUGJWRgiZ1kR8EjYhZFoRyZOwaSoTXaSMhE0TmagiVSRs6spEE8mT4GDnHrspu4e9OjLRRHYKxj0RrgRHeX6XHDS1NJRp45oNYxjLHBM0FCSayHxxTzD2NA2KlaCNeW3sPVwZxtDGHMxVlKjPyAJhZXgLw0JfZnWfCNfoQ1/qjGWOMokqQlyZp2JdVvaJcI0+lKtIkOgihAXxq3CRYB7m84lwjT70rSJBWhFxUyRSN6VF6LCxAWsEKSNCX98cefAlUUokBJtEkQh93DFVKRQ5J442YK+YK4pE5gn6+ubI44ooJcJNBnfYwZdiZa4XidS9R+lnZK3gzcQeQZaJz4I39WS94CUZ/5Ltguv0I/wvM555hok0uUdpEduRPzHCZNT3m1o6gTsR7dTtTRnnzuMTaXKPaJ8I7bE/EfcehSL7BJWtoukzQj3WM2JPDGdMLc0d8SYtJslSwZu7V+KU8H1jVMH+iflEmnwzHhMfxDdxUVwVnNumxd+Mi9eCm4XCJxISJG4Jjjz/hN8Hq4VvV62CfWB9IlzzjanDYhE1Rc9IZ9KL/G+xIhcELxyAcudE2LxYtA+7eXYmbLJnB2Dn7zM8SfIHVRHsBwr8ASgAAAAASUVORK5CYII=",
		id:"go_up",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Go_To_Upper_Bookmark_Folder.f
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
		id: "bactab",
		events: [{
			name: "click",
			value: Extension_Tool_Functions.Element_Toggle.f
		}],
		classname:["__input","__extension"]
	},
	{
		tag: "span",
		name: "background tab",
		events: [{
			name: "click",
			value: function (event) {
				Extension_Tool_Functions.Element_Toggle.f.call(document.getElementById("bactab"),event);
			}
		}],
		classname:["__extension"]
	},
	{
		tag: "div",
		name: "import",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEYSURBVEhL7dWva0JRGMbxO5nVsLS0uGBY0SA2mwPDLEOWlvRP0ComDZaBYBSWjGNleWBaWhcMYnOYBhrU73suF0TmOe85acEHPnAPnHOf+/tGJI0pdgFWuIM1N0gmf3mYQ9Y9wZqk4N2M9GnhXGBNAU1kzciS0AJ1fAoeUI839dEUpNDDFt5n6iq4xCtkTtCltBVc4HDnhzb4wRLyJfjGBB8YowQTW0EbxzvWkgMzsRXIUaxxvFijDxPXPahCLkeycIERhuiiA3kfGqjhHkVkYOIqkFTwC9e8P6MpkOQxw5sZeURbILnCbbypj09BUEILniE/nrIZWRJa8P/+B5/IeXiBquAaMjHUI5yRN1E+UL4GkEf3RKJoD6oapuFu11fgAAAAAElFTkSuQmCC",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Import_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "export",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEUSURBVEhL7dUxS0JRGMbx2+xHsF0QtxZpq8mtXRe3mgVJaG1ocpVoj/QTiKuDCE1BOAh+gSAbqiVB/8+RGzfJc46HMzj4wA/OK+fe56L3ehMyxjLAJ87gjDZ/43kHM+i4FpzRxpf10jtVHAqsKeIaZTM5ElKwU2IVNPDvbRurYIgFmmbKJGaBziVtHMHEVXCOezyhjxEm0MP2Dj3R6YmzVGKiwVYwwObBvi5hFraCLjYP9PGBE5jBVpDHBWrQFen+v8UdOtDX94g3pCf/wu8d5SrwTfojz3GqD9LELHhFwUyZxCooIbde/k2sgq0JKahAL566mRwJKdi/98EUeih83cC74AfaHEJ/0c5coRfgAcewJElWV7ymskrVIa4AAAAASUVORK5CYII=",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Export_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "backup",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE5SURBVEhL7ZWtTsRAFEY3QeF4CQTBoQghKCwej0CC5AX4MQg8hv/wDHgeAgIOEgwOSeCcdi+ZNFOYaSr5kpPe2d3eM3sz3Z38pzZzsF7JGhRnFb4GcAxFCcEuuLvT6TrdseubpH6bXoskIfBq9sB1mjvYasvmvUOweZGkRJAmBOYEXC83q570Cdx1jlTQvTeb7oc2Idc4JcY1SFCTUQSz4LOSS7Ug6mAbbP4Jj3ALHucZMIMFl3AEG2Ae4B2ewfevQck8fEC1oHuDO39qy59TdgVKfPiWoDclgh3wdZubkPhNY1y9KRHYxLHkJBfwq6REYGziWKol0dTTIVGnP3ayADZxLDnJGWQlIfgLT4uiaknNH84KGJucQ05y0KxGSE7iQXhty3GixLEocWwvcA+jRsk+uHOaTxa/Ac9Gmu9xpJJiAAAAAElFTkSuQmCC",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Backup_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "merge",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFXSURBVEhL1dW/K0VhHMfxI4UyYCGLkJTCQBYLu8FyDWbFhs0qg8EoIn+FDAwyGkiUwoJSfidlsnp/zjenc85z7/Uc96R86lXfM9znc+6553lu8JdpRFNMA3LLNu5xE/OIDVScejzbmEgNzjCDwYx6UIUwehR3Njrpxg72MzrHKsKUK/ht2nFroxV84ggnOTlFdNMq+EAvOnMyhkTBT4+oGqOYRgF6jculDd4FfbjEIdagV/oFKisV74JWPEB3HU8XVDoRXrnxLljBso1OBqANWSzeBccYsrFo9LkOGxPxLtBO7rexaK6gxdLxLtjCvI1OtMiTjU68C3SmaBHtkXh0fh1gNrxy412gjOMV65jCIq6hHbuLWqSTqUBpxhxUsgD9LjotN7GHdEnmglL5LtE3iY5nkluBooVHbIySKKjDG1oQ/8usxDAuEGUJelvec6K7n8S/TxB8AR2GeWDyey0JAAAAAElFTkSuQmCC",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Merge_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "expand",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACvSURBVEhL7ZLLCYRAEEQniQ3D/E8mYUKrvfCgpj9DH7ys+KAQp6qrBWc8iu9CFVkWBbIQqsiyKKDmcelzqYtlbUY7AlrOs7NEy3VJAMMPrJZkWXoCanSWVBntmfCGFux24LAz8/wH+J4lNmhF2+9txs7M0/KXP+TWn+yvlw3eek3V0HJfAFVGeyYwOuWQZekJYHTLwS+hJ4BBsFMOugQF1PSqyLIokIVQRZZFj2CMEwcelwlE5J32AAAAAElFTkSuQmCC",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: function (event) {
				document.getElementById("bmkmain").classList.toggle("__expanded");
			}
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
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACFSURBVEhL7Y5BCsMwEAP9u+ZX/Wv6kHR9E2FktKWHEDIwBwlr8Xj4F+/yODm7nzkfS42hceK1oB+ubENHVrahIyvb0Nhl7WJo7LJ2MTR2WbsYGrusXQyNXdYuhsYuaxdDY5e1i6Gxy9rF0Nhl7WJ0nNjmU9Ihci/bbOUc0kF1vnmVt2SMLxWMrm3WZuxXAAAAAElFTkSuQmCC",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Remove_Bookmark.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "move",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGESURBVEhL7dS/K0ZRHMfxg/xKfsdAShaTMhkM/gBRREpSisGg7CaDycSoGBhIPCIGhRgUq5LBrKTkRyLk1/tzn3sMt4fO5QwGn3r1nHNu93vuec651/yHFIe/3lOJCSwEPc9pwSPe0a0B31mFit8jTwNxkoX0ZDNlimCfflEDrinAHB6gAjMoRDR9UHFp14BrtFm66TSk9jKi2YSu3SJHAy7JxRuOkYkMHOEF1bDJxgU0wawGXKP/9RWHSNMAOYAKaZJtDKAEeoBm1CNWtqCCe9gJ21HP2EAvtGexUoFd2GJaQRumcRWOnWMsbOswJNAF/cXO0RtalWx+Rkd3CnbyqDvMoxXapx9lHyqmVXRgCVpFdLJr6Ig3wSn5aIBOmQpMwkbXerCOJ+i6VjOOcnwbnaZR2ButRqSKvqraj9Kg5xA9mQqeYQV2ohp4yRpUsDboGTMM9QeDnofYL2Zd0DNmBOr3Bz0P6YQK6lToxdMbfYMyeMsQLqGJTvDVBv86Oo5/McZ8ADxubY+z76C3AAAAAElFTkSuQmCC",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Move_Bookmarks.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "end",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC2SURBVEhL7ZVBCoMwEEXTfYUu2oXgUbrsgbxF9z1aL+DeS7T/RwfLMAlxQqALH3wSBzMvqMRwsJcL8qgMeyS5I5/KsEcSEYyItbtcuKZYkL0pQdFa66brOmpOSLdMIy4Bm0/IM15tsPkLeSNnFoBLII1YE4lVIy4B0Q2t5sQtIL8Sqzn5X0HTR2S9UKtGXIIBmRG9W5HwE5azxyUg/TpqKLkt04hbUMouQfPDriZZQfMfzoEihC9fkncGqArhuAAAAABJRU5ErkJggg==",
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

window.Storage_Action = function (changeinfo) {
	if (!changeinfo) {
		return undefined;
	}
	extension.storage.local.get(["bmks","croped"],function (c) {
		if (c.bmks) {
			var bmk=JSON.parse(unescape(c.bmks));
			var bmkptr=bmk;
			changeinfo.loc.split("/").forEach(function (val) {
				bmkptr=bmkptr.value[val];
			});
		}
		else {
			var bmk={};
			var bmkptr=bmk;
			changeinfo.loc.split("/").forEach(function (val) {
				bmkptr.value={};
				bmkptr.value[val]={};
				bmkptr=bmkptr.value[val];
			});
		}
		if (changeinfo.type=="add") {
			changeinfo.data.forEach(function (val) {
				if (!val.title) {
					return undefined;
				}
				else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
					while (val.title.indexOf("/")!=-1) {
						val.title = prompt("'/'는 사용할수 없습니다.", val.title);
					}
				}
				else if (!bmkptr.value[val.title]) {
					if (!val.title) {
						return undefined;
					}
				}
				else if (val.type=="link"&&confirm("이미 '" + val.title + "'가 있습니다. 덮어쓰시겠습니까?")) {
					if (val.type=="folder") {
						return undefined;
					}
				}
				else if ((val.title = prompt("사용 중인 이름입니다." , val.title))) {
					while (bmkptr.value[val.title]||(val.type=="folder"&&val.title.indexOf("/")!=-1)) {
						if (bmkptr.value[val.title]) {
							val.title = prompt("사용 중인 이름입니다.", val.title);
						} else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
							val.title = prompt("'/'는 사용할수 없습니다.", val.title);
						} else {
							return undefined;
						}
					}
				}
				else {
					return undefined;
				}
				bmkptr.value[val.title] = {};
				bmkptr.value[val.title].path = changeinfo.loc;
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
			});
		}
		else if (changeinfo.type=="remove") {
			if (changeinfo.crop) {
				if (!c.croped) {
					c.croped=[];
				}
				changeinfo.data.forEach(function (val) {
					bmkptr.value[val].data.name=val;
					bmkptr.value[val].path=changeinfo.loc;
					c.croped.push(bmkptr.value[val]);
					delete bmkptr.value[val];
				});
				extension.storage.local.set({"croped":c.croped});
			}
			else {
				changeinfo.data.forEach(function (val) {
					delete bmkptr.value[val];
				});
			}
		}
		else if (changeinfo.type=="update") {
			console.log(changeinfo);
			changeinfo.data.forEach(function (val) {
				if (!val.title) {
					return undefined;
				}
				bmkptr.value[val.title]=bmkptr.value[val.ptitle];
				if (val.title!=val.ptitle) {
					delete bmkptr.value[val.ptitle];
				}
				if (val.type=="link") {
					bmkptr.value[val.title].value=val.url;
				}
				var b=(new Date()).getTime();
				bmkptr.value[val.title].data.modified = b;
			});
		}
		else if (changeinfo.type=="edit") {
			changeinfo.data.forEach(function (val) {
				if (!val.title) {
					return undefined;
				}
				else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
					while (val.title.indexOf("/")!=-1) {
						val.title = prompt("'/'는 사용할수 없습니다.", val.title);
					}
				}
				else if (!bmkptr.value[val.title]||val.title==val.ptitle) {
					if (!val.title) {
						return undefined;
					}
				}
				else if (val.type=="link"&&confirm("이미 '" + val.title + "'가 있습니다. 덮어쓰시겠습니까?")) {
					return undefined;
				}
				else if ((val.title = prompt("사용 중인 이름입니다." , val.title))) {
					while (bmkptr.value[val.title]||(val.type=="folder"&&val.title.indexOf("/")!=-1)) {
						if (bmkptr.value[val.title]) {
							val.title = prompt("사용 중인 이름입니다.", val.title);
						} else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
							val.title = prompt("'/'는 사용할수 없습니다.", val.title);
						} else {
							return undefined;
						}
					}
				}
				else {
					return undefined;
				}
				bmkptr.value[val.title]=bmkptr.value[val.ptitle];
				if (val.title!=val.ptitle) {
					delete bmkptr.value[val.ptitle];
				}
				if (val.type=="link") {
					bmkptr.value[val.title].value=val.url;
				}
				var b=(new Date()).getTime();
				bmkptr.value[val.title].data.modified = b;
			});
		}
		else if (changeinfo.type=="move") {
			c.croped.forEach(function (val) {
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
							MergeRecursive(bmkptr.value[val.data.name].value,val.value);
						}
						return undefined;
					}
				} else {
					console.log(bmkptr);
					if (bmkptr.value[val.data.name]) {
						if (confirm("이미 '" + val.data.name + "'가 있습니다. 덮어쓰시겠습니까?")) {
							if (!!(val.data.name = prompt("새 북마크 이름", val.data.name))) {
								while (bmkptr.value[val.data.name]) {
									if (!!(val.data.name = prompt("새 북마크 이름", val.data.name))) {

									} else {
										return undefined;
									}
								}
							} else {
								return undefined;
							}
						}
					}
					bmkptr.value[val.data.name] = val;
					bmkptr.value[val.data.name].data.croped=false;
				}
			});
			extension.storage.local.remove("croped");
		}
		else if (changeinfo.type=="return") {
			c.croped.forEach(function (val) {
				bmkptr=bmk;
				val.path.split("/").forEach(function (s) {
					bmkptr=bmkptr.value[s];
				});
				bmkptr.value[val.data.name]=val;
				bmkptr.value[val.data.name].data.croped=false;
			});
			extension.storage.local.remove("croped");
		}
		else if (changeinfo.type=="import") {
			changeinfo.data.forEach(function (val) {
				bmk=MergeRecursive(bmk,val);
			});
		}
		else if (changeinfo.type=="sort") {
			var Temporal_Bookmark = {};
			var Bookmark_Folders = [];
			var Bookmark_Links = [];
			Object.keys(bmkptr.value).forEach(function (val) {
				if (bmkptr.value[val].type == "folder") {
					Bookmark_Folders.push(val);
				} else {
					Bookmark_Links.push(val);
				}
			});
			Bookmark_Folders.sort();
			Bookmark_Links.sort();
			Bookmark_Folders.forEach(function (val) {
				Temporal_Bookmark[val] = bmkptr.value[val];
				delete bmkptr.value[val];
				bmkptr.value[val] = Temporal_Bookmark[val];
			});
			Bookmark_Links.forEach(function (val) {
				Temporal_Bookmark[val] = bmkptr.value[val];
				delete bmkptr.value[val];
				bmkptr.value[val] = Temporal_Bookmark[val];
			});
		}
		extension.storage.local.set({"bmks":escape(JSON.stringify(bmk))});
		Extension_Variables.Bookmark_Original=bmk;
		Bookmark_User_Functions.Show_Bookmark.f(
			document.getElementById("dir").dataset.loc,
			document.getElementById("bmks").classList.contains("__editing")
		);
		console.log("setted");
	});
}

window.MergeRecursive = function (obj1, obj2) {
	for (var p in obj2) {
		try {
			if ( obj2[p].constructor==Object ) {
				obj1[p] = MergeRecursive(obj1[p], obj2[p]);
			} else {
				obj1[p] = obj2[p];
			}
		} catch(e) {
			obj1[p] = obj2[p];
		}
	}
	return obj1;
}

window.convertCF = function (thist,_function,callback,...argv) {
	if (chrome) {
		argv.push(callback);
		_function.apply(thist,argv);
	}
	else {
		_function.apply(thist,argv).then(callback);
	}
}

window.addall = function () {
	convertCF(this,extension.tabs.query,function (a){
		a.forEach(function (val) {
			val.type="link";
		});
		Storage_Action({
			type:"add",
			loc:"temp",
			data:a
		});
	},{});
}

window.openall = function () {
	var bmkptr=Extension_Variables.Bookmark_Original.value.temp.value;
	var list=Object.keys(bmkptr);
	list.forEach(function (val) {
		var a={};
		a.url=bmkptr[val].value;
		a.active=false;
		extension.tabs.create(a);
	});
	Storage_Action({
		type:"remove",
		loc:"temp",
		data:list
	});
}

window.keyboardaction = function (event) {
	if (event.ctrlKey&&event.keyCode==86) {
		if (!document.getElementById("pastebmk").classList.contains("__hided")) {
			Storage_Action({
				type:"move",
				loc:document.getElementById("dir").dataset.loc
			});
			document.getElementById("pastebmk").classList.add("__hided");
			document.getElementById("bmks").classList.remove("__copyactive");
		}
	}
	else if (event.ctrlKey&&event.keyCode==67) {
		document.getElementById("pastebmk").classList.remove("__hided");
		document.getElementById("bmks").classList.add("__copyactive");
		Bookmark_User_Functions.Deactivate_Bookmark_Edit.f();
		Storage_Action({
			type:"remove",
			loc:document.getElementById("dir").dataset.loc,
			data:Array.prototype.slice.call(
				document.getElementById("bmks").querySelectorAll("#bmks .__input.__checked")
			).map(val => val.dataset.id),
			crop:true
		});
	}
}

window.addEventListener("keydown",keyboardaction);
