GET('Sistem/css.php', document.head, 'Tambah', '');
GET('Masuk', 'document.body', 'html', '');
MASUK = function(mode) {
	var a = document.body.querySelector('.masuk').childNodes,
	nama, password, tombol, node = 1;
	if (a.length == 4) {
		nama = a[node++].value;
		password = a[node++].value;
		tombol = a[node];
	} else {
		nama = a[node+=2].value;
		password = a[node+=2].value;
		tombol = a[node+=2];
	};
	if (mode === 'cek') {
		if (nama.length > 4 && nama.length < 21 && password.length > 4 && password.length < 21) {
			tombol.removeAttribute('disabled', 0);
			TOOLTIP(tombol, '', 0);
		} else {
			tombol.setAttribute('disabled', 0);
			TOOLTIP(tombol, 'Nama & Password Minimal 5 Karakter Maksimal 20 Karakter', '130px');
		}
	} else if(mode === 'klik') {
		GET('Sistem/Masuk.php', document, 'Buka', nama+'|'+password);
	}
};