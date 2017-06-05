var i=document.getElementsByTagName("iframe");
var j=document.getElementsByTagName("iframe").length;

while (j--)
{
i[j].removeAttribute("src");
i[j].setAttribute("width","0px");
i[j].setAttribute("height","0px");
}

i=document.getElementById("responsive-banner");
i.parentNode.removeChild(i);
