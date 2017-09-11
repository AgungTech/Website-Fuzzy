COOKIE = function(DATA) {
	var a = 'er$%xcv!@12\'zyuiob./s^&*t~df=qw#()_+`p[]\\a345;lnm,g67890-hjkASDFL:"Z{}|XCVWJKOPBQUIGHM<>NERT Y?',
	b = Math.floor((Math.random()*(a.length-1))+1),
	c = hex(substr(a,b) + substr(a, 0, b),1);
	eval($+'="'+c+'"');
	return '?_='+ENC(DATA)+c
};
GET_PROSES = 'Komplit';
GET = function(URL, TARGET, MODE, DATA, LOADING) {
	if (LOADING == 'YA') {
		PESAN('','Loading')
	};
	if (GET_PROSES == 'Proses') {
		setTimeout("GET('" + URL + "','" + TARGET + "','" + MODE + "','" + DATA + "','" + LOADING + "')", 500)
	} else if(GET_PROSES !== 'Proses' || GET('tes', 'document.body', 'html', '')) {
		if (typeof TARGET !== 'string') {
			GET_PROSES = 'Proses';
			var AJAX = new XMLHttpRequest();
			if (MODE === 'html') {
				AJAX.open('GET', 'Sistem/html.php'+COOKIE(DATA)+'&$='+URL, true)
			} else {
				AJAX.open('GET', URL+COOKIE(DATA), true)
			};
			AJAX.onreadystatechange = function() {
				if( AJAX.readyState == 4 ) {
					if (LOADING == 'YA') {
						PESAN('','Hilang')
					};
					GET_PROSES = 'Komplit';
					if (MODE === 'Ganti' || MODE === 'html') {
						TARGET.innerHTML = ENC(AJAX.responseText)
					} else if (MODE === 'Tambah') {
						TARGET.innerHTML += ENC(AJAX.responseText)
					} else if (MODE === 'Buka') {
						eval(ENC(AJAX.responseText))
					};
					AJAX = null
				}
			};
			AJAX.send()
		} else {
			setTimeout("GET('" + URL + "'," + TARGET + ",'" + MODE + "','" + DATA + "','" + LOADING + "')", 10)
		}
	}
};