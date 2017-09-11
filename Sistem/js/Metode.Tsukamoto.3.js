TSUKAMOTO_3 = function(Xmax, Xmin, Ymax, Ymin, Zmax, Zmin, X, Y, dataTgl) {
	var Xt, Yt, Zt, a1, z1, a2, z2, a3, z3, a4, z4, a5, z5, a6, z6, a7, z7, a8, z8, a9, z9, Z, kesimpulan, detail;
	Xt = ((Xmax - Xmin)/2)+Xmin;
	Yt = ((Ymax - Ymin)/2)+Ymin;
	Zt = ((Zmax - Zmin)/2)+Zmin;
	if (X <= Xmin) {
		uXsedikit = 1;
		uXtetap = 0;
		uXbanyak = 0;
	} else if (X >= Xmax) {
		uXsedikit = 0;
		uXtetap = 0;
		uXbanyak = 1;
	} else {
		uXsedikit = (Xmax - X) / (Xmax - Xmin);
		uXbanyak = (X - Xmin) / (Xmax - Xmin);
		if (X < Xt) {
			uXtetap = (X - Xmin) / (Xt - Xmin);
		} else if ( X > Xt) {
			uXtetap = (Xmax - X) / (Xmax - Xt);
		} else {
			uXtetap = 1;
		}
	};
	if (Y <= Ymin) {
		uYsedikit = 1;
		uYtetap = 0;
		uYbanyak = 0;
	} else if (Y >= Ymax) {
		uYsedikit = 0;
		uYtetap = 0;
		uYbanyak = 1;
	} else {
		uYsedikit = (Ymax - Y) / (Ymax - Ymin);
		uYbanyak = (Y - Ymin) / (Ymax - Ymin);
		if (Y < Yt) {
			uYtetap = (Y - Ymin) / (Yt - Ymin);
		} else if ( Y > Yt) {
			uYtetap = (Ymax - Y) / (Ymax - Yt);
		} else {
			uYtetap = 1;
		}
	};
	a1 = Math.min(uXsedikit, uYbanyak);
	z1 = Zmax - ((Zmax - Zmin) * a1);
	a2 = Math.min(uXsedikit, uYtetap);
	z2 = Zmax - ((Zmax - Zmin) * a2);
	a3 = Math.min(uXsedikit, uYsedikit);
	z3 = Zmax - ((Zmax - Zmin) * a3);
	a4 = Math.min(uXtetap, uYbanyak);
	z4 = Zmax - ((Zmax - Zmin) * a4);
	a5 = Math.min(uXtetap, uYtetap);
	z5 = Zt;
	a6 = Math.min(uXtetap, uYsedikit);
	z6 = ((Zmax - Zmin) * a6) + Zmin;
	a7 = Math.min(uXbanyak, uYbanyak);
	z7 = ((Zmax - Zmin) * a7) + Zmin;
	a8 = Math.min(uXbanyak, uYtetap);
	z8 = ((Zmax - Zmin) * a8) + Zmin;
	a9 = Math.min(uXbanyak, uYsedikit);
	z9 = ((Zmax - Zmin) * a9) + Zmin;
	Z = ((a1 * z1) + (a2 * z2) + (a3 * z3) + (a4 * z4) + (a5 * z5) + (a6 * z6) + (a7 * z7) + (a8 * z8) + (a9 * z9)) / (a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9);
	if (X < Xmin || X > Xmax || Y < Ymin || Y > Ymax) {
		var Zn = (X - Y) + (Y*.1);
		if (Zn < 0) {Zn = 0};
		kesimpulan = 'Jika Permintaan atau Persediaan saat ini kurang dari data minimalnya atau melebihi data maksimalnya,\x20maka hasil pengolahan di atas tidak bisa di gunakan. Jumlah barang yang sebaiknya diproduksi adalah '+Zn+'\n';
	} else {
		kesimpulan = 'Berdasarkan hasil pengolahan diatas,\x20maka jumlah barang yang sebaiknya diproduksi adalah '+Z+'\n';
	};
	detail ='Xmax\x20=\x20'+Xmax+'\t\tXt\x20=\x20'+Xt+'\t\tXmin\x20=\x20'+Xmin+'\n'+
			'Ymax\x20=\x20'+Ymax+'\t\tYt\x20=\x20'+Yt+'\t\tYmin\x20=\x20'+Ymin+'\n'+
			'Zmax\x20=\x20'+Zmax+'\t\tZt\x20=\x20'+Zt+'\t\tZmin\x20=\x20'+Zmin+'\n'+
			'\u00B5Xsedikit\t=\x20'+uXsedikit+'\n\u00B5Xbanyak\t=\x20'+uXbanyak+'\n'+
			'\u00B5Ysedikit\t=\x20'+uYsedikit+'\n\u00B5Ybanyak\t=\x20'+uYbanyak+'\n'+
			'\u03B11\t=\x20'+a1+'\n\u03B12\t=\x20'+a2+'\n'+
			'\u03B13\t=\x20'+a3+'\n\u03B14\t=\x20'+a4+'\n'+
			'z1\t=\x20'+z1+'\nz2\t=\x20'+z2+'\nz3\t=\x20'+z3+'\n'+
			'z4\t=\x20'+z4+'\nz5\t=\x20'+z5+'\nz6\t=\x20'+z6+'\n'+
			'z7\t=\x20'+z7+'\nz8\t=\x20'+z8+'\nz9\t=\x20'+z9+'\n'+
			'Z\t=\x20'+Z+'\n\n'+
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