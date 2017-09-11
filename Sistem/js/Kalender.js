KALENDER = function(mode, data, e) {
	var tgl = new Date(),
	jumlahHari = [31,28,31,30,31,30,31,31,30,31,30,31],
	namaHari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum\'at','Sabtu'],
	namaBulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
	hariIni = tgl.getDate(),
	bulanIni = tgl.getMonth(),
	tahunIni = tgl.getFullYear();
	if (mode == 'Kalender') {
		var body = document.body,
		hari = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'],
		bulan = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des'],
		kalender = body.querySelector('#kalender'),
		UA = navigator.userAgent,
		isi = document.body.querySelector('.body');
		if (!kalender) {
			kalender = document.createElement('div');
			kalender.setAttribute('id', 'kalender');
			kalender.setAttribute('class', 'kalender');
			body.appendChild(kalender);
			kalender = body.querySelector('#kalender');
			kalender.innerHTML =	'<table>'+
							'<thead class="kalender">
								<tr class="kalender"><td id="mundur"></td><td id="head" mode="hari"></td><td id="maju"></td></tr>
							</thead>
							<tbody id="harian" class="kalender">
								<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
							</tbody>
							<tbody id="bulanan" class="kalender">
								<tr class="kalender"><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td></tr>
							</tbody>
							<tbody id="tahunan" class="kalender">
								<tr class="kalender"><td></td><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td><td></td></tr>
								<tr class="kalender"><td></td><td></td><td></td><td></td></tr>
							</tbody>'
						+'</table>';
		};
		if (UA.indexOf('Firefox') != -1) {
			kalender.style.transition = 'opacity .4s, transform .4s';
		} else if (UA.indexOf('Chrome') != -1) {
			kalender.style.transition = 'opacity .4s';
		};
		onclick = function(e) {
			if (e.target.parentNode.className != 'kalender' && e.target.getAttribute('type', 'button') == null) {
				kalenderHilang();
			} else {
				if(kalender.style.opacity == 1 && UA.indexOf('Chrome') != -1) {
					kalender.style.transition = 'opacity .4s, transform .4s';
				}
			}
		};
		function kalenderHilang(){
			kalender.style.opacity = 0;
			isi.style.filter = 'blur(0)';
			if (UA.indexOf('Chrome') != -1) {
				kalender.style.transition = 'opacity .4s';
				setTimeout(function(){
					kalender.style.transform = 'scale(0,0)';
				},400);
			} else {
				kalender.style.transform = 'scale(0,0)';
			}
		};
		function kalenderTampil() {
			kalender.style.opacity = 1;
			kalender.style.transform = 'scale(1, 1)';
			isi.style.filter = 'blur(3px)';
			var x = e.clientX, y = e.clientY, w = kalender.clientWidth, h = kalender.clientHeight;
			if (x <= 100 && y <= 100) {
				kalender.style.transform = 'translate('+x+'px, '+y+'px)';
			} else if (x <= 100 && y > 100 && y <= innerHeight-100) {
				kalender.style.transform = 'translate('+x+'px, '+(y-(h*.5))+'px)';
			} else if (x <= 100 && y > innerHeight-100) {
				kalender.style.transform = 'translate('+x+'px, '+(y-h)+'px)';
			} else if (x > 100 && x <= innerWidth-100 && y <= 100) {
				kalender.style.transform = 'translate('+(x-(w*.5))+'px, '+y+'px)';
			} else if (x > 100 && x <= innerWidth-100 && y > 100 && y <= innerHeight-100) {
				kalender.style.transform = 'translate('+(x-(w*.5))+'px, '+(y-(h*.5))+'px)';
			} else if (x > 100 && x <= innerWidth-100 && y > innerHeight-100) {
				kalender.style.transform = 'translate('+(x-(w*.5))+'px, '+(y-h)+'px)';
			} else if (x > innerWidth-100 && y <= 100) {
				kalender.style.transform = 'translate('+(x-w)+'px, '+y+'px)';
			} else if (x > innerWidth-100 && y > 100 && y <= innerHeight-100) {
				kalender.style.transform = 'translate('+(x-w)+'px, '+(y-(h*.5))+'px)';
			} else if (x > innerWidth-100 && y > innerHeight-100) {
				kalender.style.transform = 'translate('+(x-w)+'px, '+(y-h)+'px)';
			};
			Kalender(e);
		};
		kalenderTampil();
		function Kalender(e) {
			var head = kalender.querySelector("#head"),
			mundur = kalender.querySelector("#mundur"),
			maju = kalender.querySelector("#maju"),
			harian = kalender.querySelector("#harian"),
			bulanan = kalender.querySelector("#bulanan"),
			tahunan = kalender.querySelector("#tahunan"),
			tanggal = [0,0,0,0,0,0,0,0,0,0,0,0],
			value = e.target.value.split('-'),
			thn = parseInt(value[0]),
			bln = parseInt(value[1]),
			hr = parseInt(value[2]),
			kabisat = value.length==3&&thn!=0&&bln!=0&&bln<=12&&hr!=0?hr<=jumlahHari[bln-1]?thn%4==0&&bln==2?1:bln==2?hr>28?null:0:0:null:null;
			kabisat==null?value=[tahunIni,bulanIni+1,hariIni]:value=[thn,bln,hr];
			function kalenderUbah() {
				jumlahHari[1]=value[0]%4!=0?28:29;
				tanggal[0]=((365*(value[0]-1))+Math.floor((value[0]-1)/4))%7;
				for(var i=0;i<tanggal.length;i++)if(i!=0)tanggal[i]=(tanggal[i-1]+jumlahHari[i-1])%7;
				if (head.getAttribute('mode') == 'hari') {
					for(var i=0;i<hari.length;i++)harian.children[0].children[i].textContent=hari[i];
					for (var i=1,ii=1,iii=0,iv=tanggal[value[1]-1],v=1,vi=1;i<=42;i++) {
						if (iii>6) {
							iii = 0;
							if(ii<6)ii++;
						};
						if(i<=iv){
							harian.children[ii].children[iii].setAttribute('disabled',0);
							harian.children[ii].children[iii].removeAttribute('aktif');
							harian.children[ii].children[iii].textContent=(!isNaN(jumlahHari[value[1]-2])?jumlahHari[value[1]-2]:jumlahHari[11])-(iv-i);
							harian.children[ii].children[iii].onclick = null;
						}else if(i>iv){
							if (v<=jumlahHari[value[1]-1]) {
								harian.children[ii].children[iii].textContent=v;
								if (((value[0]*1000)+(value[1]*100)+(i-iv)) > ((tahunIni*1000)+((bulanIni+1)*100)+hariIni)) {
									harian.children[ii].children[iii].setAttribute('disabled',0);
									harian.children[ii].children[iii].removeAttribute('aktif');
									harian.children[ii].children[iii].onclick = null;
								} else {
									harian.children[ii].children[iii].removeAttribute('disabled');
									harian.children[ii].children[iii].onclick = function(){
										kalenderHilang();
										value[2] = parseInt(this.textContent);
										var hasilBln = value[1]<10?'0'+value[1]:value[1],
										hasilHr = value[2]<10?'0'+value[2]:value[2];
										e.target.value = value[0]+'-'+hasilBln+'-'+hasilHr;
									};
									if(v==value[2]) {
										harian.children[ii].children[iii].setAttribute('aktif',0);
									} else {
										harian.children[ii].children[iii].removeAttribute('aktif');
									}
								}
							} else {
								harian.children[ii].children[iii].setAttribute('disabled',0);
								harian.children[ii].children[iii].removeAttribute('aktif');
								harian.children[ii].children[iii].textContent=vi++;
								harian.children[ii].children[iii].onclick = null;
							};
							v++
						};
						iii++
					}
				} else if (head.getAttribute('mode') == 'bulan') {
					for (var i=0,ii=0,iii=0;i<12;i++) {
						if (iii>2) {
							iii = 0;
							if(ii<4)ii++;
						};
						bulanan.children[ii].children[iii].setAttribute('value',i);
						bulanan.children[ii].children[iii].textContent=bulan[i];
						if (((value[0]*100)+i+1) > ((tahunIni*100)+(bulanIni+1))) {
							bulanan.children[ii].children[iii].setAttribute('disabled',0);
							bulanan.children[ii].children[iii].removeAttribute('aktif');
							bulanan.children[ii].children[iii].onclick = null;
						} else {
							bulanan.children[ii].children[iii].removeAttribute('disabled');
							if(value[1]==i+1){
								bulanan.children[ii].children[iii].setAttribute('aktif',0);
							} else {
								bulanan.children[ii].children[iii].removeAttribute('aktif');
							};
							bulanan.children[ii].children[iii].onclick = function(){
								head.setAttribute('mode', 'hari');
								value[1] = parseInt(this.getAttribute('value'))+1;
								kalenderMode();
							}
						};
						iii++
					}
				} else if (head.getAttribute('mode') == 'tahun') {
					var tahun = head.textContent.split(' - ');
					tahun[0] = parseInt(tahun[0]);
					tahun[1] = parseInt(tahun[1]);
					for (var i=0,ii=0,iii=0;i<20;i++) {
						if (iii>3) {
							iii = 0;
							if(ii<5)ii++;
						};
						tahunan.children[ii].children[iii].textContent=tahun[0]+i;
						if (tahun[0]+i > tahunIni) {
							tahunan.children[ii].children[iii].setAttribute('disabled',0);
							tahunan.children[ii].children[iii].removeAttribute('aktif');
							tahunan.children[ii].children[iii].onclick = null;
						} else {
							tahunan.children[ii].children[iii].removeAttribute('disabled');
							if(value[0]==tahun[0]+i){
								tahunan.children[ii].children[iii].setAttribute('aktif',0);
							} else {
								tahunan.children[ii].children[iii].removeAttribute('aktif');
							};
							tahunan.children[ii].children[iii].onclick = function(){
								head.setAttribute('mode', 'bulan');
								value[0] = parseInt(this.textContent);
								kalenderMode();
							}
						};
						iii++
					}
				}
			};
			mundur.onclick = function(){
				if (head.getAttribute('mode') == 'hari') {
					if(value[1]>1){
						value[1]--;
					} else if(value[1]<=1 && value[0]>1){
						value[1] = 12;
						value[0]--;
					};
					head.textContent = namaBulan[(value[1])-1]+' '+value[0];
				} else if (head.getAttribute('mode') == 'bulan') {
					if(value[0]>1)value[0]--;
					head.textContent = value[0];
				} else if (head.getAttribute('mode') == 'tahun') {
					if(value[0]>20)value[0]-=20;
					var teks = Math.floor((value[0])/20)*20;
					head.textContent=teks==value[0]?(teks-19)+' - '+teks:(teks+1)+' - '+(teks+20);
				};
				kalenderUbah();
			};
			maju.onclick = function(){
				if (head.getAttribute('mode') == 'hari') {
					if(value[1]<12){
						value[1]++;
					} else if(value[1]>=12 && value[0]<=20000) {
						value[1]=1;
						value[0]++;
					};
					head.textContent = namaBulan[(value[1])-1]+' '+value[0];
				} else if (head.getAttribute('mode') == 'bulan') {
					if(value[0]<=20000)value[0]++;
					head.textContent = value[0];
				} else if (head.getAttribute('mode') == 'tahun') {
					if(value[0]<=20000)value[0]+=20;
					var teks = Math.floor((value[0])/20)*20;
					head.textContent = teks==value[0]?(teks-19)+' - '+teks:(teks+1)+' - '+(teks+20);
				};
				kalenderUbah();
			};
			function kalenderMode() {
				if (head.getAttribute('mode') == 'hari') {
					harian.style.zIndex = '200';
					harian.style.opacity = '1';
					harian.style.transform = 'scale(1,1)';
					bulanan.style.zIndex = '100';
					bulanan.style.opacity = '0';
					bulanan.style.transform = 'scale(1.5,1.5)';
					tahunan.style.zIndex = '100';
					tahunan.style.opacity = '0';
					tahunan.style.transform = 'scale(1.5,1.5)';
					head.textContent = namaBulan[(value[1])-1]+' '+value[0];
				} else if (head.getAttribute('mode') == 'bulan') {
					harian.style.zIndex = '100';
					harian.style.opacity = '0';
					harian.style.transform = 'scale(.5,.5)';
					bulanan.style.zIndex = '200';
					bulanan.style.opacity = '1';
					bulanan.style.transform = 'scale(1,1)';
					tahunan.style.zIndex = '100';
					tahunan.style.opacity = '0';
					tahunan.style.transform = 'scale(1.5,1.5)';
					head.textContent = value[0];
				} else if (head.getAttribute('mode') == 'tahun') {
					harian.style.zIndex = '100';
					harian.style.opacity = '0';
					harian.style.transform = 'scale(.5,.5)';
					bulanan.style.zIndex = '100';
					bulanan.style.opacity = '0';
					bulanan.style.transform = 'scale(.5,.5)';
					tahunan.style.zIndex = '200';
					tahunan.style.opacity = '1';
					tahunan.style.transform = 'scale(1,1)';
					var teks = Math.floor((value[0])/20)*20;
					head.textContent = teks==value[0]?(teks-19)+' - '+teks:(teks+1)+' - '+(teks+20);
				};
				kalenderUbah();
			};
			head.setAttribute('mode', 'hari');
			kalenderMode();
			head.onclick = function() {
				if (this.getAttribute('mode') == 'hari') {
					this.setAttribute('mode', 'bulan');
					kalenderMode();
				} else if (this.getAttribute('mode') == 'bulan') {
					this.setAttribute('mode', 'tahun');
					kalenderMode();
				}
			}
		}
	} else if (mode == 'Tanggal Sekarang') {
		var noHari, noBulan;
		hariIni<10?noHari='0'+hariIni:noHari=hariIni;
		bulanIni<9?noBulan='0'+(bulanIni+1):noBulan=bulanIni+1;
		return tahunIni+'-'+noBulan+'-'+noHari
	} else if (mode == 'Cek') {
		var tg = explode('-', data),
		thn = parseInt(tg[0]),
		bln = parseInt(tg[1]),
		hr = parseInt(tg[2]),
		kabisat = thn/4;
		if (strpos(kabisat.toString(), '.') == -1) {
			kabisat = 'ya'
		} else {
			kabisat = 0
		};
		if (tg.length == 3 && tg[0].length == 4 && tg[1].length == 2 && tg[2].length == 2 && bln > 0 && bln <= 12 && hr > 0) {
			if (bln == 1 || bln == 3 || bln == 5 || bln == 7 || bln == 8 || bln == 10 || bln == 12) {
				if (hr <= 31) {
					return 'Valid'
				} else {
					return 0
				}
			} else if (bln == 4 || bln == 6 || bln == 9 || bln == 11) {
				if (hr <= 30) {
					return 'Valid'
				} else {
					return 0
				}
			} else if (bln == 2) {
				if (kabisat == 'ya') {
					if (hr <= 29) {
						return 'Valid'
					} else {
						return 0
					}
				} else {
					if (hr <= 28) {
						return 'Valid'
					} else {
						return 0
					}
				}
			}
		} else {
			return 0
		}
	}
};