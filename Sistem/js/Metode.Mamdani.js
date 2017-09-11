MAMDANI = function(Xmax, Xmin, Ymax, Ymin, Zmax, Zmin, X, Y, dataTgl) {
	var p1, p2, p3, p4,
	Min1, Min2, Min,
	Max1, Max2, Max,
	a1, a2,
	M1, M2, M3,
	A1, A2, A3,
	Z, kesimpulan, detail;
	if (X <= Xmin) {
		uXsedikit = 1;
		uXbanyak = 0;
	} else if (X >= Xmax) {
		uXsedikit = 0;
		uXbanyak = 1;
	} else {
		uXsedikit = (Xmax - X) / (Xmax - Xmin);
		uXbanyak = (X - Xmin) / (Xmax - Xmin);
	};
	if (Y <= Ymin) {
		uYsedikit = 1;
		uYbanyak = 0;
	} else if (Y >= Ymax) {
		uYsedikit = 0;
		uYbanyak = 1;
	} else {
		uYsedikit = (Ymax - Y) / (Ymax - Ymin);
		uYbanyak = (Y - Ymin) / (Ymax - Ymin);
	};
	p1 = Math.min(uXsedikit, uYbanyak);
	p2 = Math.min(uXsedikit, uYsedikit);
	p3 = Math.min(uXbanyak, uYbanyak);
	p4 = Math.min(uXbanyak, uYsedikit);
	Min1 = Math.min(p1, p2);
	Min2 = Math.min(p3, p4);
	Min = Math.min(Min1, Min2);
	Max1 = Math.max(p1, p2);
	Max2 = Math.max(p3, p4);
	Max = Math.max(Max1, Max2);
	a1 = ( Min * (Zmax - Zmin) ) + (Zmax - Xmax);
	a2 = ( Max * (Zmax - Zmin) ) + (Zmax - Xmax);
	M1 = (Min / 2) * (Math.pow(a1, 2));
	M2 =	(
			(
				(
					(
						1 / (Zmax - Zmin)
					) / 2
				) * Math.pow(a2, 3)
			) - (
				(
					Zmin / (Zmax - Zmin)
				) / 2
			) * Math.pow(a2, 2)
		) - (
			(
				(
					1 / (Zmax - Zmin)
				) / 3
			) * Math.pow(a1, 3)
		) - (
			(
				(
					(
						Zmin / (Zmax - Zmin)
					) / 2
				) * Math.pow(a1, 2)
			)
		);
	M3 =	(
			(
				Max * Math.pow(Zmax, 2)
			) / 2
		) - (
			(
				Max * (Zmax - Zmin)
			) / 2
		) * (
			Zmax - Zmin
		);
	A1 = a1 * Min;
	A2 = ((Min + Max) * (a2 - a1)) / 2;
	A3 = (Zmax - (Zmax - Zmin)) * Max;
	Z = (M1 + M2 + M3) / (A1 + A2 + A3);
	if (X < Xmin || X > Xmax || Y < Ymin || Y > Ymax) {
		var Zn = (X - Y) + (Y*.1);
		if (Zn < 0) {Zn = 0};
		kesimpulan = 'Jika Permintaan atau Persediaan saat ini kurang dari data minimalnya atau melebihi data maksimalnya,\x20maka hasil pengolahan di atas tidak bisa di gunakan. Jumlah barang yang sebaiknya diproduksi adalah '+Zn+'\n';
	} else {
		kesimpulan = 'Berdasarkan hasil pengolahan diatas,\x20maka jumlah barang yang sebaiknya diproduksi adalah '+Z+'\n';
	};
	detail ='Xmax\x20=\x20'+Xmax+'\nXmin\x20=\x20'+Xmin+'\n'+
			'Ymax\x20=\x20'+Ymax+'\nYmin\x20=\x20'+Ymin+'\n'+
			'Zmax\x20=\x20'+Zmax+'\nZmin\x20=\x20'+Zmin+'\n'+
			'\u00B5Xsedikit\x20=\x20'+uXsedikit+'\n\u00B5Xbanyak\x20=\x20'+uXbanyak+'\n'+
			'\u00B5Ysedikit\x20=\x20'+uYsedikit+'\n\u00B5Ybanyak\x20=\x20'+uYbanyak+'\n'+
			'p1\x20=\x20'+p1+'\np2\x20=\x20'+p2+'\n'+
			'p3\x20=\x20'+p3+'\np4\x20=\x20'+p4+'\n'+
			'Min\x20=\x20'+Min+'\nMax\x20=\x20'+Max+'\n'+
			'\u03B11\x20=\x20'+a1+'\n\u03B12\x20=\x20'+a2+'\n'+
			'M1\x20=\x20'+M1+'\n'+
			'M2\x20=\x20'+M2+'\n'+
			'M3\x20=\x20'+M3+'\n'+
			'A1\x20=\x20'+A1+'\n'+
			'A2\x20=\x20'+A2+'\n'+
			'A3\x20=\x20'+A3+'\n'+
			'Z\x20=\x20'+Z+'\n\n'+
			kesimpulan +
			'\n'+
			'Simpan hasil pengolahan ?\n';
	if (confirm(detail) == true) {
		var Tanggal = function() {
			var TGL = prompt('Masukkan tanggal "tttt-bb-hh"',KALENDER('Tanggal Sekarang',0)),
			tgl = explode('-', TGL),
			tglSekarang = explode('-', KALENDER('Tanggal Sekarang',0)),
			tgl1 = parseInt(tgl[0]+tgl[1]+tgl[2]),
			tglSekarang = parseInt(tglSekarang[0]+tglSekarang[1]+tglSekarang[2]),
			cek = KALENDER('Cek', TGL);
			if ( cek == 'Valid' ) {
				if (tgl1 <= tglSekarang) {
					if (dataTgl.indexOf(TGL) == -1) {
						GET('Sistem/Database.php', 0, 'Buka', 'Tambah;'+TGL+'|'+X+'|'+Y+'|'+Z+'|Pensil');
					} else {
						alert('Data pada tanggal:'+TGL+' sudah ada.', 0);
						Tanggal()
					}
				} else {
					alert('Tanggal:'+TGL+' melebihi tanggal sekarang.', 0);
					Tanggal()
				}
			} else {
				alert('Format tanggal tidak valid', 0);
				Tanggal()
			}
		};
		Tanggal()
	}
};