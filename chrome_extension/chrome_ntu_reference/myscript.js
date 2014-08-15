
//document.body.innerHTML = document.body.innerHTML.replace(new RegExp('流水號</td>', "g"), '流水號</td><td>選課人數</br>(選上/登記/上限)</td>');

function isNum(data){
	return (data>='0' && data<='9') 
}
var all_element = document.getElementsByTagName("td");
var all_str = "";
var element_size = all_element.length;
var reqstr = "";
var table;
var obj = [];
for(var i=0;i<element_size;i++){
	var str = all_element[i].innerHTML;
	if(str=="流水號"){
		table = all_element[i];
		//all_element[i].outerHTML = '<td>流水號</td><td>選課人數</br>(選上/登記/上限)</td>';
	}
	if(!isNaN(str) && str.length==5 && isNum(str[0])){
		obj.push(all_element[i]);
		reqstr+=str+",";
	}
}
var url = "http://huli.yade.cc/classget/getpeople.php?number="+reqstr;
var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
       eval(xhr.responseText);
  }
}
xhr.send();

//var script = document.createElement('script');
//script.setAttribute('src', url);
//document.getElementsByTagName('head')[0].appendChild(script); 
var callback = function(data){
	first = true;
	size = obj.length;
	for(var i=0;i<size;i++){
		obj[i].outerHTML += "<TD>" + data.result[i] + "</TD>";
	}
	table.outerHTML = '<td>流水號</td><td>選課人數</br>(選上/登記/上限)</td>';

}



