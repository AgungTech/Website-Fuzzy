ADMIN = function(mode, data) {
	if (mode === 'Awal') {
		document.title = 'Admin';
		document.key = [hex(data,1)];
		GET('Admin', document.body, 'html', '', 'YA');
		GET('Sistem/Database.php', '0', 'Buka', 'Dapat;0', 'YA');
	} else if (mode === 'Siap') {
		var isi = document.body.querySelector('.body'),
		header = isi.querySelector('.header'),
		a = isi.querySelector('.navigasi').childNodes,
		b = isi.querySelector('.tabel').childNodes,
		node = 1, noAtas = 0, noHal = 1,
		toggleOlahData = 0, toggleTambahData = 0, toggleUbahData = 0,
		toggleHapusData = 0, toggleCetakData = 0, toggleUbahPengguna = 0,
		olahData = a[node++].childNodes[0],
		mulaiHari = olahData.nextSibling.nextSibling,
		lamaPeriode = mulaiHari.nextSibling,
		permintaan = lamaPeriode.nextSibling.nextSibling,
		persediaan = permintaan.nextSibling,
		metode1 = persediaan.nextSibling.nextSibling,
		metode2 = metode1.nextSibling,
		metode3 = metode2.nextSibling,
		metode4 = metode3.nextSibling,
		ttdOlah1 = metode4.nextSibling.nextSibling,
		ttdOlah2 = ttdOlah1.nextSibling,
		tombolOlah = ttdOlah2.nextSibling.nextSibling,
		tambahData = a[node++].childNodes[0],
		tglTambah = tambahData.nextSibling.nextSibling,
		tambahPermintaan = tglTambah.nextSibling,
		tambahPersediaan = tambahPermintaan.nextSibling,
		tambahProduksi = tambahPersediaan.nextSibling,
		tombolTambah = tambahProduksi.nextSibling.nextSibling,
		ubahData = a[node++].childNodes[0],
		passUbah = ubahData.nextSibling.nextSibling,
		tglUbah = passUbah.nextSibling,
		ubahPermintaan = tglUbah.nextSibling,
		ubahPersediaan = ubahPermintaan.nextSibling,
		ubahProduksi = ubahPersediaan.nextSibling,
		tombolUbah = ubahProduksi.nextSibling.nextSibling,
		hapusData = a[node++].childNodes[0],
		passHapus = hapusData.nextSibling.nextSibling,
		hapusMulai = passHapus.nextSibling.nextSibling,
		hapusSampai = hapusMulai.nextSibling,
		tombolHapus = hapusSampai.nextSibling.nextSibling,
		cetakData = a[node++].childNodes[0],
		cetakMulai = cetakData.nextSibling.nextSibling,
		cetakSampai = cetakMulai.nextSibling,
		cetakTabel = cetakSampai.nextSibling.nextSibling,
		cetakGrafik = cetakTabel.nextSibling,
		ttdCetak1 = cetakGrafik.nextSibling.nextSibling,
		ttdCetak2 = ttdCetak1.nextSibling,
		tombolCetak = ttdCetak2.nextSibling.nextSibling,
		ubahPengguna = a[node++].childNodes[0],
		passLama = ubahPengguna.nextSibling.nextSibling,
		namaBaru = passLama.nextSibling.nextSibling,
		passBaru = namaBaru.nextSibling,
		tombolGanti = passBaru.nextSibling.nextSibling,
		bantuan = a[node++],
		keluar = a[node++],
		isi1 = b[1].childNodes[1],
		isi2 = b[2].childNodes[1],
		mundur = b[3].childNodes[0].childNodes[0].childNodes[0],
		halaman = mundur.nextSibling,
		maju = halaman.nextSibling,
		data = explode(';', data),
		database = [], dataId =[], dataTgl = [], dataPermintaan = [], dataPersediaan = [], dataProduksi = [];
		for (var i = 0; i < strlen(data); i++) {
			database[i] = explode('|', data[i])
		};
		data = null;
		for (var i = 0; i < (database.length-1); i++) {
			dataId[i] = database[i][0];
			dataTgl[i] = database[i][1];
			dataPermintaan[i] = database[i][2];
			dataPersediaan[i] = database[i][3];
			dataProduksi[i] = database[i][4];
		};
		isi.style.visibility = 'visible';
		olahData.parentNode.setAttribute('disabled', 0);
		tambahData.parentNode.setAttribute('disabled', 0);
		ubahData.parentNode.setAttribute('disabled', 0);
		hapusData.parentNode.setAttribute('disabled', 0);
		ubahPengguna.parentNode.setAttribute('disabled', 0);
		if (database.length < 2) {
			isi1.parentNode.style.visibility = 'hidden';
			ubahData.parentNode.style.display = 'none';
			hapusData.parentNode.style.display = 'none';
		} else {
			isi1.parentNode.style.visibility = 'visible';
			ubahData.parentNode.style.display = 'inline-block';
			hapusData.parentNode.style.display = 'inline-block';
		};
		if (database.length <= 2) {
			PESAN('Untuk mengolah data,\x20Anda harus mempunyai Database minimal 2,\nJumlah Database Anda sekarang\x20=\x20'+(database.length-1),0);
			olahData.parentNode.style.display = 'none';
		} else {
			olahData.parentNode.style.display = 'inline-block';
		};
		header.onmouseover = function() {
			header.style.filter = 'saturate(200%) brightness(110%)';
			isi.querySelector('.navigasi').style.filter = 'blur(3px)';
			isi.querySelector('.tabel').style.filter = 'blur(3px)';
		};
		header.onmouseout = function() {
			header.style.filter = 'saturate(100%)';
			isi.querySelector('.navigasi').style.filter = 'blur(0)';
			isi.querySelector('.tabel').style.filter = 'blur(0)';
		};
		if (header.style.backgroundImage == '') {
			var headerGambar = [
				'url("Sistem/data/header.jpg")'
			],
			gambar = headerGambar.length-1;
			header.style.backgroundImage = headerGambar[gambar];
			header.style.opacity = 1;
			var gantiGambar = setInterval(function() {
				header.style.opacity = 0;
				setTimeout(function() {
					if (headerGambar.length == gambar+1) {
						gambar -= gambar
					} else {
						gambar++
					};
					header.style.backgroundImage = headerGambar[gambar];
					header.style.opacity = 1;
				},1000)
			},10000);
			if(headerGambar.length<2)clearInterval(gantiGambar);
		};
		function TABEL(nomor) {
			isi1.innerHTML = '';
			isi2.innerHTML = '';
			isi2.parentNode.style.visibility = 'hidden';
			var tabel1 = 'Kosong';
			for (var i = nomor; i < nomor + 40; i++) {
				if (i < database.length-1) {
					var tr = document.createElement('tr');
					if (i == nomor + 20) {tabel1 = 'Penuh'};
					if (tabel1 === 'Kosong') {
						isi1.appendChild(tr);
					} else if (tabel1 === 'Penuh') {
						isi2.parentNode.style.visibility = 'visible';
						isi2.appendChild(tr);
					};
					for (var ii = 0; ii < database[i].length; ii++) {
						var td = document.createElement('td');
						if (ii == 0) {
							td.textContent = i+1
						} else {
							td.textContent = database[i][ii]
						};
						tr.appendChild(td)
					}
				}
			}
		};
		function HAL(nomor) {
			halaman.innerHTML = '';
			for (var i = 0; i < 8; i++) {
				if (i+nomor <= ((database.length-2)/40)+1) {
					var div = document.createElement('div');
					halaman.appendChild(div);
					if (i == 0) {div.setAttribute('aktif', 0)};
					div.innerHTML = i+nomor;
					halaman.childNodes[i].onclick = function() {
						for (var ii = 0; ii < halaman.childNodes.length; ii++) {
							if (halaman.childNodes[ii].getAttribute('aktif', 0)) {
								halaman.childNodes[ii].removeAttribute('aktif', 0)
							};
							this.setAttribute('aktif', 0)
						};
						TABEL((parseInt(this.innerHTML)-1)*40)
					}
				}
			};
			if (halaman.innerHTML == '') {
				mundur.parentNode.style.visibility = 'hidden'
			} else {
				mundur.parentNode.style.visibility = 'visible'
			}
		};
		TABEL(noAtas);
		HAL(noHal);
		mundur.onclick = function() {
			if (noHal > 1) {
				TABEL(noAtas-=320);
				HAL(noHal -= 8)
			}
		};
		maju.onclick = function() {
			if (noHal+7 < (database.length)/40) {
				TABEL(noAtas+=320);
				HAL(noHal += 8)
			}
		};
		olahData.removeAttribute('aktif', 0);
		tambahData.removeAttribute('aktif', 0);
		ubahData.removeAttribute('aktif', 0);
		hapusData.removeAttribute('aktif', 0);
		cetakData.removeAttribute('aktif', 0);
		ubahPengguna.removeAttribute('aktif', 0);
		olahData.onclick = function() {
			if (toggleOlahData == 0) {
				toggleOlahData = 1;
				this.setAttribute('aktif', 0);
				this.parentNode.removeAttribute('disabled', 0)
			} else {
				toggleOlahData = 0;
				this.removeAttribute('aktif', 0);
				this.parentNode.setAttribute('disabled', 0)
			}
		};
		mulaiHari.onkeyup = function() {
			lamaPeriode.value = '';
			if (this.value/this.value == 1) {
				if (parseInt(this.value) > database.length-2) {
					this.value = (database.length-2);
					PESAN('Melebihi Jumlah Data',0)
				} else {
					lamaPeriode.removeAttribute('disabled', 0)
				}
			} else {
				this.value = '';
				lamaPeriode.setAttribute('disabled', 0)
			}
		};
		if (lamaPeriode.value == '') {
			lamaPeriode.setAttribute('disabled', 0)
		};
		lamaPeriode.onkeyup = function() {
			if (this.value/this.value == 1) {
				if (parseInt(this.value) > database.length - mulaiHari.value) {
					this.value = database.length - mulaiHari.value;
					PESAN('Melebihi Jumlah Data',0)
				}
			} else {
				this.value = ''
			}
		};
		permintaan.onkeyup = function() {
			if (this.value/this.value !== 1) {
				this.value = ''
			}
		};
		persediaan.onkeyup = function() {
			if (this.value/this.value !== 1) {
				this.value = ''
			}
		};
		metode1.onclick = function() {
			this.setAttribute('aktif', 0);
			metode2.removeAttribute('aktif', 0);
			metode3.removeAttribute('aktif', 0);
			metode4.removeAttribute('aktif', 0);
		};
		metode2.onclick = function() {
			this.setAttribute('aktif', 0);
			metode1.removeAttribute('aktif', 0);
			metode3.removeAttribute('aktif', 0);
			metode4.removeAttribute('aktif', 0);
		};
		metode3.onclick = function() {
			this.setAttribute('aktif', 0);
			metode2.removeAttribute('aktif', 0);
			metode1.removeAttribute('aktif', 0);
			metode4.removeAttribute('aktif', 0);
		};
		metode4.onclick = function() {
			this.setAttribute('aktif', 0);
			metode2.removeAttribute('aktif', 0);
			metode3.removeAttribute('aktif', 0);
			metode1.removeAttribute('aktif', 0);
		};
		tombolOlah.onclick = function() {
			this.blur();
			if (mulaiHari.value !== '' && lamaPeriode.value !== '' && permintaan.value !== '' && persediaan.value !== '' && ttdOlah1.value !== '' && ttdOlah2.value !== '') {
				var mulai = parseInt(mulaiHari.value)-1,
				sampai = mulai + parseInt(lamaPeriode.value),
				Xmax, Xmin, Ymax, Ymin, Zmax, Zmin,
				X = parseInt(permintaan.value),
				Y = parseInt(persediaan.value);
				data = [];
				data['X'] = [];
				data['Y'] = [];
				data['Z'] = [];
				var ii = 0;
				for (var i = mulai; i < sampai; i++) {
					data['X'][ii] = database[i][2];
					data['Y'][ii] = database[i][3];
					data['Z'][ii++] = database[i][4]
				};
				Xmax = Math.max.apply(null, data['X']);
				Xmin = Math.min.apply(null, data['X']);
				Ymax = Math.max.apply(null, data['Y']);
				Ymin = Math.min.apply(null, data['Y']);
				Zmax = Math.max.apply(null, data['Z']);
				Zmin = Math.min.apply(null, data['Z']);
				if (metode1.getAttribute('aktif', 0) !== null) {
					Olah(Xmax, Xmin, Ymax, Ymin, Zmax, Zmin, X, Y, 'Tsukamoto 1', dataTgl, ttdOlah1.value, ttdOlah2.value)
				} else if (metode2.getAttribute('aktif', 0) !== null) {
					Olah(Xmax, Xmin, Ymax, Ymin, Zmax, Zmin, X, Y, 'Tsukamoto 2', dataTgl, ttdOlah1.value, ttdOlah2.value)
				} else if (metode3.getAttribute('aktif', 0) !== null) {
					Olah(Xmax, Xmin, Ymax, Ymin, Zmax, Zmin, X, Y, 'Tsukamoto 3', dataTgl, ttdOlah1.value, ttdOlah2.value)
				} else if (metode4.getAttribute('aktif', 0) !== null) {
					Olah(Xmax, Xmin, Ymax, Ymin, Zmax, Zmin, X, Y, 'Mamdani', dataTgl, ttdOlah1.value, ttdOlah2.value)
				} else {
					PESAN('Metode pengolahan belum dipilih', 0)
				}
			} else {
				PESAN('Isian masih ada yang kosong', 0)
			}
		};
		tambahData.onclick = function() {
			if (toggleTambahData == 0) {
				toggleTambahData = 1;
				this.setAttribute('aktif', 0);
				this.parentNode.removeAttribute('disabled', 0)
			} else {
				toggleTambahData = 0;
				this.removeAttribute('aktif', 0);
				this.parentNode.setAttribute('disabled', 0)
			};
		};
		tglTambah.onclick = function(e) {
			KALENDER('Kalender',0,e);
		};
		tambahPermintaan.onkeyup = function() {
			if (this.value/this.value !== 1) {
				this.value = '';
				TOOLTIP(ubahPermintaan, '', 0);
			} else {
				TOOLTIP(ubahPermintaan, 'Tambah Permintaan', '100px');
			}
		};
		tambahPersediaan.onkeyup = function() {
			if (this.value/this.value !== 1) {
				this.value = '';
				TOOLTIP(ubahPersediaan, '', 0);
			} else {
				TOOLTIP(ubahPersediaan, 'Tambah Persediaan', '100px');
			}
		};
		tambahProduksi.onkeyup = function() {
			if (this.value/this.value !== 1) {
				this.value = '';
				TOOLTIP(ubahPermintaan, '', 0);
			} else {
				TOOLTIP(ubahProduksi, 'Tambah Produksi', '100px');
			}
		};
		tombolTambah.onclick = function() {
			this.blur();
			if (tambahPermintaan.value !== '' && tambahPersediaan.value !== '' && tambahProduksi.value !== '') {
				var tgl = explode('-', tglTambah.value),
				tglSekarang = explode('-', KALENDER('Tanggal Sekarang',0)),
				tgl1 = parseInt(tgl[0]+tgl[1]+tgl[2]),
				tglSekarang = parseInt(tglSekarang[0]+tglSekarang[1]+tglSekarang[2]),
				cek = KALENDER('Cek', tglTambah.value);
				if ( cek == 'Valid') {
					if (tgl1 <= tglSekarang) {
						if (dataTgl.indexOf(tglTambah.value) == -1) {
							GET('Sistem/Database.php', 0, 'Buka', 'Tambah;'+tglTambah.value+'|'+tambahPermintaan.value+'|'+tambahPersediaan.value+'|'+tambahProduksi.value+'|Rokok', 'YA');
						} else {
							PESAN('Data pada tanggal:'+tglTambah.value+' sudah ada', 0);
						}
					} else {
						PESAN('Tanggal:'+tglTambah.value+' melebihi tanggal sekarang', 0);
					}
				} else {
					PESAN('Format tanggal tidak valid', 0);
				}
			} else {
				PESAN('Isian masih ada yang kosong', 0);
			}

		};
		ubahData.onclick = function() {
			if (dataTgl.indexOf(KALENDER('Tanggal Sekarang',0)) !== -1) {
				TOOLTIP(this.parentNode, '', 0);
				if (toggleUbahData == 0) {
					toggleUbahData = 1;
					this.setAttribute('aktif', 0);
					this.parentNode.removeAttribute('disabled', 0)
				} else {
					toggleUbahData = 0;
					this.removeAttribute('aktif', 0);
					this.parentNode.setAttribute('disabled', 0)
				}
			}
		};
		if (dataTgl.indexOf(KALENDER('Tanggal Sekarang',0)) !== -1) {
			tglUbah.textContent = 'Ubah Data:\u0020'+KALENDER('Tanggal Sekarang',0);
			var i = dataTgl.indexOf(KALENDER('Tanggal Sekarang',0));
			ubahPermintaan.value = dataPermintaan[i];
			ubahPersediaan.value = dataPersediaan[i];
			ubahProduksi.value = dataProduksi[i];
			TOOLTIP(ubahPermintaan, 'Ubah Permintaan', '100px');
			TOOLTIP(ubahPersediaan, 'Ubah Persediaan', '100px');
			TOOLTIP(ubahProduksi, 'Ubah Produksi', '100px');
			TOOLTIP(ubahData.parentNode, '', 0);
		} else {
			ubahPermintaan.value = '';
			ubahPersediaan.value = '';
			ubahProduksi.value = '';
			TOOLTIP(ubahPermintaan, '', 0);
			TOOLTIP(ubahPersediaan, '', 0);
			TOOLTIP(ubahProduksi, '', 0);
			TOOLTIP(ubahData.parentNode, 'Hari ini belum ada data', '150px');
		};
		ubahPermintaan.onkeyup = function() {
			if (this.value/this.value !== 1) {
				this.value = '';
				TOOLTIP(ubahPermintaan, '', 0);
			} else {
				TOOLTIP(ubahPermintaan, 'Ubah Permintaan', '100px');
			}
		};
		ubahPersediaan.onkeyup = function() {
			if (this.value/this.value !== 1) {
				this.value = '';
				TOOLTIP(ubahPersediaan, '', 0);
			} else {
				TOOLTIP(ubahPersediaan, 'Ubah Persediaan', '100px');
			}
		};
		ubahProduksi.onkeyup = function() {
			if (this.value/this.value !== 1) {
				this.value = '';
				TOOLTIP(ubahPermintaan, '', 0);
			} else {
				TOOLTIP(ubahProduksi, 'Ubah Produksi', '100px');
			}
		};
		tombolUbah.onclick = function() {
			this.blur();
			if (passUbah.value.length >= 5 && passUbah.value.length <= 20) {
				if (passUbah.value == hex(document.key[0])) {
					passUbah.value = '';
					if (ubahPermintaan.value !== '' && ubahPersediaan.value !== '' && ubahProduksi.value !== '') {
						var i = dataTgl.indexOf(KALENDER('Tanggal Sekarang',0));
						GET('Sistem/Database.php', 0, 'Buka', 'Ubah;'+dataId[i]+'|'+ubahPermintaan.value+'|'+ubahPersediaan.value+'|'+ubahProduksi.value+'|Rokok', 'YA');
					} else {
						PESAN('Isian Masih ada yang Kosong', 0)
					}
				} else {
					PESAN('Password Salah', 0)
				}
			} else {
				PESAN('Password minimal 5 karakter, maksimal 20 karakter', 0)
			}
		};
		hapusData.onclick = function() {
			if (toggleHapusData == 0) {
				toggleHapusData = 1;
				this.setAttribute('aktif', 0);
				this.parentNode.removeAttribute('disabled', 0)
			} else {
				toggleHapusData = 0;
				this.removeAttribute('aktif', 0);
				this.parentNode.setAttribute('disabled', 0)
			}
		};
		hapusMulai.value = '';
		hapusMulai.onkeyup = function() {
			hapusSampai.value = '';
			tombolHapus.setAttribute('disabled', 0);
			if (this.value/this.value == 1) {
				if (parseInt(this.value) > database.length-1) {
					this.value = (database.length-1);
					PESAN('Melebihi Jumlah Data',0)
				} else {
					hapusSampai.removeAttribute('disabled', 0)
				}
			} else {
				this.value = '';
				hapusSampai.setAttribute('disabled', 0)
			}
		};
		hapusSampai.value = '';
		if (hapusSampai.value == '') {
			hapusSampai.setAttribute('disabled', 0);
		};
		hapusSampai.onkeyup = function() {
			if (this.value/this.value == 1) {
				tombolHapus.removeAttribute('disabled');
				if (parseInt(this.value) > database.length-1) {
					this.value = database.length-1;
					PESAN('Melebihi Jumlah Data',0)
				};
				if(parseInt(this.value) > parseInt(hapusMulai.value)+99) {
					this.value = parseInt(hapusMulai.value)+99;
					PESAN('Data yang dihapus maksimal 100.',0)
				}
			} else {
				this.value = ''
			}
		};
		if (hapusMulai.value == '' || hapusSampai == '') {
			tombolHapus.setAttribute('disabled', 0)
		};
		tombolHapus.onclick = function() {
			this.blur();
 			if (passHapus.value.length >= 5 && passHapus.value.length <= 20) {
				if (passHapus.value == hex(document.key[0])) {
					passHapus.value = '';
					if(parseInt(hapusSampai.value) < parseInt(hapusMulai.value)) {
						hapusSampai.value = hapusMulai.value;
						PESAN('Kurang dari No. mulai',0)
					} else {
						tombolHapus.setAttribute('disabled', 0);
						toggleHapusData = 0;
						this.parentNode.setAttribute('disabled', 0);
						var hapus = '';
						for (var i = parseInt(hapusMulai.value)-1; i < parseInt(hapusSampai.value); i++) {
							hapus += dataId[i]+'|'
						};
						GET('Sistem/Database.php', 0, 'Buka', 'Hapus;'+hapus+(parseInt(hapusSampai.value)-(parseInt(hapusMulai.value)-1)), 0)
					}
				} else {
					PESAN('Password Salah', 0)
				}
			} else {
				PESAN('Password minimal 5 karakter, maksimal 20 karakter', 0)
			}
		};
		cetakData.onclick = function() {
			if (toggleCetakData == 0) {
				toggleCetakData = 1;
				this.setAttribute('aktif', 0);
				this.parentNode.removeAttribute('disabled', 0)
			} else {
				toggleCetakData = 0;
				this.removeAttribute('aktif', 0);
				this.parentNode.setAttribute('disabled', 0)
			}
		};
		cetakMulai.value = 'Mulai';
		cetakMulai.onclick = function(e) {
			KALENDER('Kalender',0,e);
		};
		cetakSampai.value = 'Sampai';
		cetakSampai.onclick = function(e) {
			KALENDER('Kalender',0,e);
		};
		cetakTabel.onclick = function() {
			if (this.getAttribute('aktif') == null) {
				this.setAttribute('aktif', 0);
				cetakGrafik.removeAttribute('aktif');
			} else {
				this.removeAttribute('aktif');
			}
		};
		cetakGrafik.onclick = function() {
			if (this.getAttribute('aktif') == null) {
				this.setAttribute('aktif', 0);
				cetakTabel.removeAttribute('aktif');
			} else {
				this.removeAttribute('aktif');
			}
		};
		tombolCetak.onclick = function() {
			this.blur();
			if (cetakMulai.value == 'Mulai' || cetakSampai.value == 'Sampai') {
				PESAN('Tanggal belum dipilih',0)
			} else {
				var mulaiTgl = cetakMulai.value.split('-');
				var sampaiTgl = cetakSampai.value.split('-');
				if (ttdCetak1.value !== '' && ttdCetak2.value !== '') {
		 			if((mulaiTgl[0]*1000)+(mulaiTgl[1]*100)+mulaiTgl[2] > (sampaiTgl[0]*1000)+(sampaiTgl[1]*100)+sampaiTgl[2]) {
						cetakSampai.value = cetakMulai.value;
						PESAN('Pemilihan tanggal tidak Valid !',0)
					} else {
						if (cetakTabel.getAttribute('aktif') != null) {
							GET('Sistem/Database.php', 0, 'Buka', 'CetakTabel;'+cetakMulai.value+'|'+cetakSampai.value+';'+ttdCetak1.value+'|'+ttdCetak2.value, 'YA')
						} else if (cetakGrafik.getAttribute('aktif') != null) {
							GET('Sistem/Database.php', 0, 'Buka', 'CetakGrafik;'+cetakMulai.value+'|'+cetakSampai.value+';'+ttdCetak1.value+'|'+ttdCetak2.value, 'YA')
						} else {
							PESAN('Tolong pilih salah satu pilihan cetak',0)
						}
					}
				} else {
					PESAN('Nama Supervisor/Admin belum diisi',0)
				}
			}
		};
		ubahPengguna.onclick = function() {
			passLama.value = '';
			namaBaru.value = '';
			passBaru.value = '';
			if (toggleUbahPengguna == 0) {
				toggleUbahPengguna = 1;
				this.setAttribute('aktif', 0);
				this.parentNode.removeAttribute('disabled', 0)
			} else {
				toggleUbahPengguna = 0;
				this.removeAttribute('aktif', 0);
				this.parentNode.setAttribute('disabled', 0)
			}
		};
		tombolGanti.onclick = function() {
			this.blur();
			if (passLama.value.length < 5 || namaBaru.value.length < 5 || passBaru.value.length < 5 || passLama.value.length > 20 || namaBaru.value.length > 20 || passBaru.value.length > 20) {
				PESAN('Isian minimal 5 karakter, maksimal 20 karakter',0)
			} else {
				GET('Sistem/Database.php', 0, 'Buka', 'GantiPengguna;'+passLama.value+'|'+namaBaru.value+'|'+passBaru.value, 'YA');
				passLama.value = '';
				namaBaru.value = '';
				passBaru.value = '';
			}
		};
		bantuan.onclick = function() {
			var teks = '<div id="Bantuan">'+
				'<img src="Sistem/data/Bantuan_001.jpg"/>'+
				'<img src="Sistem/data/Bantuan_002.jpg"/>'+
				'<img src="Sistem/data/Bantuan_003.jpg"/>'+
				'<img src="Sistem/data/Bantuan_004.jpg"/>'+
				'<img src="Sistem/data/Bantuan_005.jpg"/>'+
				'<img src="Sistem/data/Bantuan_006.jpg"/>'+
				'<img src="Sistem/data/Bantuan_007.jpg"/>'+
				'<img src="Sistem/data/Bantuan_008.jpg"/>'+
				'<img src="Sistem/data/Bantuan_009.jpg"/>'+
				'<img src="Sistem/data/Bantuan_010.jpg"/>'+
				'<img src="Sistem/data/Bantuan_011.jpg"/>'+
				'</div>';
			PESAN(teks, 1)
		};
		keluar.onclick = function() {
			location.reload()
		}
	}
};