Olah = function(Xmax, Xmin, Ymax, Ymin, Zmax, Zmin, XNow, YNow, Metode, dataTgl, ttdSupervisor, ttdAdmin) {
	var hitungU = 1;
	if (Metode == 'Tsukamoto 1') {
		hitungU = 2;
	} else if (Metode == 'Tsukamoto 2') {
		hitungU = 3;
	} else if (Metode == 'Tsukamoto 3') {
		hitungU = 4;
	} else if (Metode == 'Mamdani') {
		hitungU = 2;
	};
	var dialogOlah = document.body.querySelector('#dialogOlah'),
	isi = document.body.querySelector('.body');
	isi.style.filter = 'blur(3px)';
	if (!dialogOlah) {
		var div = document.createElement('div');
		div.setAttribute('id', 'dialogOlah');
		document.body.appendChild(div);
		dialogOlah = document.body.querySelector('#dialogOlah');
		dialogOlah.innerHTML = '<canvas id="Permintaan" width="400" height="150"></canvas><canvas id="Persediaan" width="400" height="150"></canvas><canvas id="Produksi" width="800" height="500"></canvas>';
		dialogOlah.innerHTML += '<div><input type="button" id="Tanggal" value="Tanggal"><input type="button" id="Cetak" value="Cetak"><input type="button" id="Simpan" value="Simpan"><input type="button" id="Tutup" value="Tutup"></div>';
		document.translate=1;
	};
	dialogOlah.style.opacity = 1;
	dialogOlah.style.transform = 'scale(1,1)';
	var Xtarget = dialogOlah.querySelector('#Permintaan'),
	Ytarget = dialogOlah.querySelector('#Persediaan'),
	Ztarget = dialogOlah.querySelector('#Produksi'),
	Tanggal = dialogOlah.querySelector('#Tanggal'),
	Cetak = dialogOlah.querySelector('#Cetak'),
	Simpan = dialogOlah.querySelector('#Simpan'),
	Tutup = dialogOlah.querySelector('#Tutup'),
	ZNow = null;
	Kecepatan = 10,
	bg = "#FFF",
	blueD = "#00F5",
	blueL = "#00F0",
	greenD = "#0F05",
	greenL = "#0F00",
	redD = "#F005",
	redL = "#F000",
	font = "normal 10px Segoe UI",
	uGrafik = function(Max, Min, Now, Target, Objek) {
		if (Now < Min) {
			Now = Min;
		} else if (Now > Max) {
			Now = Max;
		};
		var canvas = Target,
		c = canvas.getContext('2d'),
		w = canvas.width,
		h = canvas.height,
		l = canvas.width-200,
		p = canvas.height-50,
		pix = (Max-Min)/l,
		xNow = (Now-Min)/pix,
		x = 0,
		X = Min,
		Xt = (Max-Min)/2,
		Xc = Xt+Min,
		Turun = 'Tidak',
		uTurun = 1,
		uTetap = 0,
		uNaik = 0,
		yTurun = 0,
		yTetap = p,
		yNaik = p,
		duaPI = 2*Math.PI;
		c.fillStyle = "white";
		c.fillRect(0,0,w,h);
		if(document.translate <= 2)c.translate(50,25);
		document.translate++;
		c.font = font;
		c.lineWidth = 1;
		c.fillStyle = "#0002";
		c.fillRect(0,(p/2),l,1);
		c.fillStyle = "black";
		c.strokeRect(0,-1,l,p+1);
		c.fillStyle = "white";
		c.fillRect(0,-25,l,24);
		c.fillStyle = 'blue';
		c.textAlign = 'left';
		c.fillText('Turun', 0, -4);
		if (hitungU === 3 || hitungU === 4) {
			c.fillStyle = 'green';
			c.textAlign = 'center';
			c.fillText('Tetap', l/2, -4);
		};
		c.fillStyle = 'red';
		c.textAlign = 'right';
		c.fillText('Naik', l, -4);

		var Anim = setInterval(function() {
			X+=pix;
			x++;
			c.fillStyle = 'white';
			c.fillRect(-25,p,l+25,p+25);
			c.fillRect(-15,-25,15,w);
			c.fillRect(l,-25,150,w);
			c.beginPath();
			c.lineWidth = 1;
			c.strokeStyle = 'black';
			if (x*pix > Now-Min) {
				c.moveTo(xNow,p);
				c.lineTo(xNow,p+10);
			} else {
				c.moveTo(x,p);
				c.lineTo(x,p+10);
			};
			c.stroke();
			c.fillStyle = 'black';
			c.textAlign = 'right';
			c.fillText(1, -1, 6);
			c.fillText(0.5, -1, (p/2)+3);
			c.fillText(0, -1, p);
			c.fillStyle = 'blue';
			c.textAlign = 'left';
			c.fillText(Min, 0, p+10);
			if (hitungU === 3 || hitungU === 4) {
				c.fillStyle = 'green';
				c.textAlign = 'center';
				c.fillText(Xc, l/2, p+10);
			};
			c.fillStyle = 'red';
			c.textAlign = 'right';
			c.fillText(Max, l, p+10);
			c.fillStyle = 'black';
			c.textAlign = 'center';
			if (x*pix > Now-Min) {
				c.fillText(Now, xNow, p+20);
			} else {
				c.fillText(Math.round(X), x, p+20);
			};
			/*uTurun*/
			c.beginPath();
			c.lineWidth = 1;
			if (x*pix > Now-Min) {
				c.strokeStyle = blueL
			} else {
				c.strokeStyle = blueD
			};
			c.moveTo(x,p);
			c.lineTo(x,yTurun);
			c.stroke();
			c.beginPath();
			if (x*pix > Now-Min && x*pix <= (Now-Min)+pix) {
				c.arc(x, yTurun, 3,0,duaPI);
			} else {
				c.arc(x, yTurun, .5, 0, duaPI);
			};
			c.fillStyle = 'blue';
			c.fill();
			if (hitungU === 3 || hitungU === 4) {
				/*uTetap*/
				c.beginPath();
				c.lineWidth = 1;
				if (x*pix > Now-Min) {
					c.strokeStyle = greenL
				} else {
					c.strokeStyle = greenD
				};
				c.moveTo(x,p);
				c.lineTo(x,yTetap);
				c.stroke();
				c.beginPath();
				if (x*pix > Now-Min && x*pix <= (Now-Min)+pix) {
					c.arc(x, yTetap, 3,0,duaPI);
				} else {
					c.arc(x, yTetap, .5, 0, duaPI);
				};
				c.fillStyle = 'green';
				c.fill();
			};
			/*uNaik*/
			c.beginPath();
			c.lineWidth = 1;
			if (x*pix > Now-Min) {
				c.strokeStyle = redL
			} else {
				c.strokeStyle = redD
			};
			c.moveTo(x,p);
			c.lineTo(x,yNaik);
			c.stroke();
			c.beginPath();
			if (x*pix > Now-Min && x*pix <= (Now-Min)+pix) {
				c.arc(x, yNaik, 3,0,duaPI);
			} else {
				c.arc(x, yNaik, .5, 0, duaPI);
			};
			c.fillStyle = 'red';
			c.fill();
			if (hitungU === 3 || hitungU === 4) {
				if (X < Xc) {
					if (hitungU === 3) {
						yTurun = p*(1-((Xc-X)/(Xc-Min)));
						uNaik = 0
					};
					yTetap = p*((Xc-X)/(Xc-Min));
					if (x*pix <= Now-Min) {
						if (hitungU === 3) {
							uTurun = (Xc-X)/(Xc-Min);
						};
						uTetap = 1-((Xc-X)/(Xc-Min));
					} else {
						if (hitungU === 3) {
							Turun = 'Ya';
							uTurun = (Xc-Now)/(Xc-Min);
						};
						uTetap = 1-((Xc-Now)/(Xc-Min));
					};
				} else if (X > Xc) {
					if (hitungU === 3) {
						yNaik = p*(1-((X-Xc)/(Max-Xc)));
						if(Now>=Xc)uTurun = 0
					};
					yTetap = p*((X-Xc)/(Max-Xc));
					if (Turun == 'Tidak') {
						if (x*pix > Now-Min) {
							if (hitungU === 3) {
								uNaik = (Now-Xc)/(Max-Xc)
							};
							if(Now>=Xc)uTetap = 1-((Now-Xc)/(Max-Xc));
						} else {
							if (hitungU === 3) {
								uNaik = (X-Xc)/(Max-Xc)
							};
							if(Now>=Xc)uTetap = 1-((X-Xc)/(Max-Xc));
						}
					}
				} else if (X == Xc) {
					yTetap = 0;
					if(Now>=Xc)uTetap = 1;
				}
			};
			if (hitungU === 2 || hitungU === 4) {
				if (X <= Min) {
					yTurun = 0;
					yNaik = p;
					if (Now == Min) {
						uTurun = 1;
						uNaik = 0
					}
				} else if (X >= Max) {
					yTurun = p;
					yNaik = 0;
					if (Now == Max) {
						uTurun = 0;
						uNaik = 1
					}
				} else {
					yTurun = p*(1-((Max-X)/(Max-Min)));
					yNaik = p*(1-((X-Min)/(Max-Min)));
					if (x*pix > Now-Min) {
						uTurun = (Max-Now)/(Max-Min);
						uNaik = (Now-Min)/(Max-Min)	
					} else {
						uTurun = (Max-X)/(Max-Min);
						uNaik = (X-Min)/(Max-Min)
					}
				}
			};
			if (x > l) {
				clearInterval(Anim);
				c.textAlign = 'left';
				if (Objek === 'Permintaan') {
					c.fillStyle = 'blue';
					c.fillText('\u00B5PermintaanTurun :', l+30, (p*.2)-5);
					if (hitungU === 3 || hitungU === 4) {
						c.fillStyle = 'green';
						c.fillText('\u00B5PermintaanTetap :', l+30, (p*.5)-5);
					};
					c.fillStyle = 'red';
					c.fillText('\u00B5PermintaanNaik :', l+30, (p*.8)-5);
				} else if(Objek === 'Persediaan') {
					c.fillStyle = 'blue';
					c.fillText('\u00B5PersediaanTurun :', l+30, (p*.2)-5);
					if (hitungU === 3 || hitungU === 4) {
						c.fillStyle = 'green';
						c.fillText('\u00B5PersediaanTetap :', l+30, (p*.5)-5);
					};
					c.fillStyle = 'red';
					c.fillText('\u00B5PersediaanNaik :', l+30, (p*.8)-5);
				};
				c.fillStyle = 'blue';
				c.fillText(uTurun, l+30, (p*.2)+5);
				c.fillRect(l+25, (p*.2)-15, 2, 22);
				if (hitungU === 3 || hitungU === 4) {
					c.fillStyle = 'green';
					c.fillText(uTetap, l+30, (p*.5)+5);
					c.fillRect(l+25, (p*.5)-15, 2, 22);
				};
				c.fillStyle = 'red';
				c.fillText(uNaik, l+30, (p*.8)+5);
				c.fillRect(l+25, (p*.8)-15, 2, 22);
				if (hitungU === 3 || hitungU === 4) {
					if (Now < Xc) {
						if (hitungU === 3) {
							yTurun = p*(1-((Xc-Now)/(Xc-Min)));
							yNaik = p-1
						};
						yTetap = p*((Xc-Now)/(Xc-Min));
					} else if (Now > Xc) {
						if (hitungU === 3) {
							yNaik = 0;
							yNaik = p*(1-((Now-Xc)/(Max-Xc)))
						};
						yTetap = p*((Now-Xc)/(Max-Xc));
					} else if (Now == Xc) {
						if (hitungU === 3) {
							yTurun = p-1;
							yNaik = p-1
						};
						yTetap = 0;
					}
				};
				if(hitungU === 2 || hitungU === 4) {
					if (Now <= Min ) {
						yTurun = 0;
						yNaik = p-1
					} else if (Now >= Max) {
						yTurun = p-1;
						yNaik = 0
					} else if (Now == Xc) {
						yTurun = p/2;
						yNaik = p/2
					} else {
						yTurun = p*(1-((Max-Now)/(Max-Min)));
						yNaik = p*(1-((Now-Min)/(Max-Min)))
					}
				};
				c.beginPath();
				c.strokeStyle = 'blue';
				c.moveTo(xNow,yTurun);
				c.lineTo(l,yTurun);
				c.lineTo(l+25,(p*.2)-5);
				c.stroke();
				if (hitungU === 3 || hitungU === 4) {
					c.beginPath();
					c.strokeStyle = 'green';
					c.moveTo(xNow,yTetap);
					c.lineTo(l,yTetap);
					c.lineTo(l+25,(p*.5)-5);
					c.stroke();
				};
				c.beginPath();
				c.strokeStyle = 'red';
				c.moveTo(xNow,yNaik);
				c.lineTo(l,yNaik);
				c.lineTo(l+25,(p*.8)-5);
				c.stroke();
			};
		},Kecepatan)
	},
	Zgrafik = function(Target) {
		var X = XNow, Y = YNow,
		canvas = Target,
		c = canvas.getContext('2d'),
		w = canvas.width,
		h = canvas.height-100;
		c.fillStyle = 'white';
		c.fillRect(0, 0, w, h+100);
		c.fillStyle = 'black';
		c.textAlign = 'center';
		c.font = "normal 12px Segoe UI";
		c.fillText('Supervisor', w*.25, h);
		c.fillText('Admin', w*.75, h);
		c.font = "bold 12px Segoe UI";
		c.fillText(ttdSupervisor, w*.25, h+90);
		c.fillText(ttdAdmin, w*.75, h+90);

		if (Metode == 'Tsukamoto 1') {
			var uXsedikit, uXbanyak, uYsedikit, uYbanyak,
			a1, z1, a2, z2, a3, z3, a4, z4, Z;
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
			a1 = Math.min(uXsedikit, uYbanyak);
			z1 = Zmax - ((Zmax - Zmin) * a1);
			a2 = Math.min(uXsedikit, uYsedikit);
			z2 = Zmax - ((Zmax - Zmin) * a2);
			a3 = Math.min(uXbanyak, uYbanyak);
			z3 = ((Zmax - Zmin) * a3) + Zmin;
			a4 = Math.min(uXbanyak, uYsedikit);
			z4 = ((Zmax - Zmin) * a4) + Zmin;
			Z = ((a1 * z1) + (a2 * z2) + (a3 * z3) + (a4 * z4)) / (a1 + a2 + a3 + a4);

			c.fillStyle = 'black';
			c.textAlign = 'center';
			c.font = "bold 11px Segoe UI";
			c.fillText('Metode\x20:\x20Fuzzy Tsukamoto 1', w*.5, h*.05);
			c.textAlign = 'left';
			c.font = "normal 11px Segoe UI";
			c.fillText('Permintaan Minimal = '+Xmin, w*.05, h*.1);
			c.fillText('Permintaan Maksimal = '+Xmax, w*.05, h*.15);
			c.fillText('Persediaan Minimal = '+Ymin, w*.05, h*.2);
			c.fillText('Persediaan Maksimal = '+Ymax, w*.05, h*.25);
			c.fillText('\u00B5PermintaanTurun = '+uXsedikit, w*.05, h*.3);
			c.fillText('\u00B5PermintaanNaik = '+uXbanyak, w*.05, h*.35);
			c.fillText('\u00B5PersediaanTurun = '+uYsedikit, w*.05, h*.4);
			c.fillText('\u00B5PersediaanNaik = '+uYbanyak, w*.05, h*.45);
			c.fillText('a1 = '+a1, w*.05, h*.5);
			c.fillText('z1 = '+z1, w*.05, h*.55);
			c.fillText('a2 = '+a2, w*.05, h*.6);
			c.fillText('z2 = '+z2, w*.05, h*.65);
			c.fillText('a3 = '+a3, w*.05, h*.7);
			c.fillText('z3 = '+z3, w*.05, h*.75);
			c.fillText('a4 = '+a4, w*.05, h*.8);
			c.fillText('z4 = '+z4, w*.05, h*.85);
			c.fillText('Z = '+Z, w*.05, h*.9);
			c.fillRect(w*.5, h*.07, 1, h*.85);
			/*c.fillRect(w*.5, h*.07, w*.95, 1);*/
			if (X < Xmin || X > Xmax || Y < Ymin || Y > Ymax) {
				c.fillText('Jika Permintaan atau Persediaan saat ini kurang dari data minimalnya', w*.55, h*.15);
				c.fillText('atau melebihi data maksimalnya,\x20maka hasil pengolahan di atas tidak', w*.55, h*.2);
				c.fillText('bisa di gunakan.', w*.55, h*.25);
				ZNow = false;
			} else {
				c.fillText('Berdasarkan hasil pengolahan,\x20maka jumlah barang yang sebaiknya', w*.55, h*.15);
				c.fillText('diproduksi adalah '+Z+'.', w*.55, h*.2);
				ZNow = Z;
			};
		} else if (Metode == 'Tsukamoto 2') {
			var uXsedikit, uXtetap, uXbanyak, uYsedikit, uYtetap, uYbanyak,
			Xt, Yt, Zt, a1, z1, a2, z2, a3, z3, a4, z4, a5, z5, a6, z6, a7, z7, a8, z8, a9, z9, Z;
			Xt = ((Xmax + Xmin)/2);
			Yt = ((Ymax + Ymin)/2);
			Zt = ((Zmax + Zmin)/2);
			if (X <= Xmin) {
				uXsedikit = 1;
				uXtetap = 0;
				uXbanyak = 0;
			} else if (X >= Xmax) {
				uXsedikit = 0;
				uXtetap = 0;
				uXbanyak = 1;
			} else {
				if (X < Xt) {
					uXsedikit = (Xt - X) / (Xt - Xmin);
					uXtetap = (X - Xmin) / (Xt - Xmin);
					uXbanyak = 0
				} else if ( X > Xt) {
					uXsedikit = 0;
					uXtetap = (Xmax - X) / (Xmax - Xt);
					uXbanyak = (X - Xt) / (Xmax - Xt);
				} else {
					uXsedikit = 0;
					uXtetap = 1;
					uXbanyak = 0
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
				if (Y < Yt) {
					uYsedikit = (Yt - Y) / (Yt - Ymin);
					uYtetap = (Y - Ymin) / (Yt - Ymin);
					uYbanyak = 0
				} else if ( Y > Yt) {
					uYsedikit = 0;
					uYtetap = (Ymax - Y) / (Ymax - Yt);
					uYbanyak = (Y - Yt) / (Ymax - Yt);
				} else {
					uYsedikit = 0;
					uYtetap = 1;
					uYbanyak = 0;
				}
			};
			a1 = Math.min(uXsedikit, uYbanyak);
			z1 = Zt - ((Zt - Zmin) * a1);
			a2 = Math.min(uXsedikit, uYtetap);
			z2 = Zt - ((Zt - Zmin) * a2);
			a3 = Math.min(uXsedikit, uYsedikit);
			z3 = Zt - ((Zt - Zmin) * a3);
			a4 = Math.min(uXtetap, uYbanyak);
			z4 = Zt - ((Zt - Zmin) * a4);
			a5 = Math.min(uXtetap, uYtetap);
			z5 = Zt;
			a6 = Math.min(uXtetap, uYsedikit);
			z6 = ((Zmax - Zt) * a6) + Zt;
			a7 = Math.min(uXbanyak, uYbanyak);
			z7 = ((Zmax - Zt) * a7) + Zt;
			a8 = Math.min(uXbanyak, uYtetap);
			z8 = ((Zmax - Zt) * a8) + Zt;
			a9 = Math.min(uXbanyak, uYsedikit);
			z9 = ((Zmax - Zt) * a9) + Zt;
			Z = ((a1 * z1) + (a2 * z2) + (a3 * z3) + (a4 * z4) + (a5 * z5) + (a6 * z6) + (a7 * z7) + (a8 * z8) + (a9 * z9)) / (a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9);

			c.fillStyle = 'black';
			c.textAlign = 'center';
			c.font = "bold 11px Segoe UI";
			c.fillText('Metode\x20:\x20Fuzzy Tsukamoto 2', w*.5, h*.05);
			c.textAlign = 'left';
			c.font = "normal 11px Segoe UI";
			c.fillText('Permintaan Minimal = '+Xmin, w*.05, h*.1);
			c.fillText('Permintaan Tengah = '+Xt, w*.05, h*.15);
			c.fillText('Permintaan Maksimal = '+Xmax, w*.05, h*.2);
			c.fillText('Persediaan Minimal = '+Ymin, w*.05, h*.25);
			c.fillText('Persediaan Tengah = '+Yt, w*.05, h*.3);
			c.fillText('Persediaan Maksimal = '+Ymax, w*.05, h*.35);
			c.fillText('\u00B5PermintaanTurun = '+uXsedikit, w*.05, h*.4);
			c.fillText('\u00B5PermintaanTetap = '+uXtetap, w*.05, h*.45);
			c.fillText('\u00B5PermintaanNaik = '+uXbanyak, w*.05, h*.5);
			c.fillText('\u00B5PersediaanTurun = '+uYsedikit, w*.05, h*.55);
			c.fillText('\u00B5PersediaanTetap = '+uYtetap, w*.05, h*.6);
			c.fillText('\u00B5PersediaanNaik = '+uYbanyak, w*.05, h*.65);
			c.fillText('a1 = '+a1, w*.05, h*.7);
			c.fillText('z1 = '+z1, w*.05, h*.75);
			c.fillText('a2 = '+a2, w*.05, h*.8);
			c.fillText('z2 = '+z2, w*.05, h*.85);
			c.fillText('a3 = '+a3, w*.05, h*.9);
			c.fillText('z3 = '+z3, w*.05, h*.95);
			c.fillRect(w*.5, h*.07, 1, h*.85);
			c.fillText('a4 = '+a4, w*.55, h*.1);
			c.fillText('z4 = '+z4, w*.55, h*.15);
			c.fillText('a5 = '+a5, w*.55, h*.2);
			c.fillText('z5 = '+z5, w*.55, h*.25);
			c.fillText('a6 = '+a6, w*.55, h*.3);
			c.fillText('z6 = '+z6, w*.55, h*.35);
			c.fillText('a7 = '+a7, w*.55, h*.4);
			c.fillText('z7 = '+z7, w*.55, h*.45);
			c.fillText('a8 = '+a8, w*.55, h*.5);
			c.fillText('z8 = '+z8, w*.55, h*.55);
			c.fillText('a9 = '+a9, w*.55, h*.6);
			c.fillText('z9 = '+z9, w*.55, h*.65);
			c.fillText('Z = '+Z, w*.55, h*.7);
			/*c.fillRect(w*.5, h*.72, w*.95, 1);*/
			if (X < Xmin || X > Xmax || Y < Ymin || Y > Ymax) {
				c.fillText('Jika Permintaan atau Persediaan saat ini kurang dari data minimalnya', w*.55, h*.8);
				c.fillText('atau melebihi data maksimalnya,\x20maka hasil pengolahan di atas tidak', w*.55, h*.85);
				c.fillText('bisa di gunakan.', w*.55, h*.9);
				ZNow = false;
			} else {
				c.fillText('Berdasarkan hasil pengolahan,\x20maka jumlah barang yang sebaiknya', w*.55, h*.8);
				c.fillText('diproduksi adalah '+Z+'.', w*.55, h*.85);
				ZNow = Z;
			};
		} else if (Metode == 'Tsukamoto 3') {
			var uXsedikit, uXtetap, uXbanyak, uYsedikit, uYtetap, uYbanyak,
			Xt, Yt, Zt, a1, z1, a2, z2, a3, z3, a4, z4, a5, z5, a6, z6, a7, z7, a8, z8, a9, z9, Z;
			Xt = ((Xmax + Xmin)/2);
			Yt = ((Ymax + Ymin)/2);
			Zt = ((Zmax + Zmin)/2);
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

			c.fillStyle = 'black';
			c.textAlign = 'center';
			c.font = "bold 11px Segoe UI";
			c.fillText('Metode\x20:\x20Fuzzy Tsukamoto', w*.5, h*.05);
			c.textAlign = 'left';
			c.font = "normal 11px Segoe UI";
			c.fillText('Permintaan Minimal = '+Xmin, w*.05, h*.1);
			c.fillText('Permintaan Tengah = '+Xt, w*.05, h*.15);
			c.fillText('Permintaan Maksimal = '+Xmax, w*.05, h*.2);
			c.fillText('Persediaan Minimal = '+Ymin, w*.05, h*.25);
			c.fillText('Persediaan Tengah = '+Yt, w*.05, h*.3);
			c.fillText('Persediaan Maksimal = '+Ymax, w*.05, h*.35);
			c.fillText('\u00B5PermintaanTurun = '+uXsedikit, w*.05, h*.4);
			c.fillText('\u00B5PermintaanTetap = '+uXtetap, w*.05, h*.45);
			c.fillText('\u00B5PermintaanNaik = '+uXbanyak, w*.05, h*.5);
			c.fillText('\u00B5PersediaanTurun = '+uYsedikit, w*.05, h*.55);
			c.fillText('\u00B5PersediaanTetap = '+uYtetap, w*.05, h*.6);
			c.fillText('\u00B5PersediaanNaik = '+uYbanyak, w*.05, h*.65);
			c.fillText('a1 = '+a1, w*.05, h*.7);
			c.fillText('z1 = '+z1, w*.05, h*.75);
			c.fillText('a2 = '+a2, w*.05, h*.8);
			c.fillText('z2 = '+z2, w*.05, h*.85);
			c.fillText('a3 = '+a3, w*.05, h*.9);
			c.fillText('z3 = '+z3, w*.05, h*.95);
			c.fillRect(w*.5, h*.07, 1, h*.85);
			c.fillText('a4 = '+a4, w*.55, h*.1);
			c.fillText('z4 = '+z4, w*.55, h*.15);
			c.fillText('a5 = '+a5, w*.55, h*.2);
			c.fillText('z5 = '+z5, w*.55, h*.25);
			c.fillText('a6 = '+a6, w*.55, h*.3);
			c.fillText('z6 = '+z6, w*.55, h*.35);
			c.fillText('a7 = '+a7, w*.55, h*.4);
			c.fillText('z7 = '+z7, w*.55, h*.45);
			c.fillText('a8 = '+a8, w*.55, h*.5);
			c.fillText('z8 = '+z8, w*.55, h*.55);
			c.fillText('a9 = '+a9, w*.55, h*.6);
			c.fillText('z9 = '+z9, w*.55, h*.65);
			c.fillText('Z = '+Z, w*.55, h*.7);
			/*c.fillRect(w*.5, h*.72, w*.95, 1);*/
			if (X < Xmin || X > Xmax || Y < Ymin || Y > Ymax) {
				c.fillText('Jika Permintaan atau Persediaan saat ini kurang dari data minimalnya', w*.55, h*.8);
				c.fillText('atau melebihi data maksimalnya,\x20maka hasil pengolahan di atas tidak', w*.55, h*.85);
				c.fillText('bisa di gunakan.', w*.55, h*.9);
				ZNow = false;
			} else {
				c.fillText('Berdasarkan hasil pengolahan,\x20maka jumlah barang yang sebaiknya', w*.55, h*.8);
				c.fillText('diproduksi adalah '+Z+'.', w*.55, h*.85);
				ZNow = Z;
			};
		} else if (Metode == 'Mamdani') {
			var uXsedikit, uXbanyak, uYsedikit, uYbanyak,
			p1, p2, p3, p4,
			Min, Max,
			a1, a2,
			M1, M2, M3,
			A1, A2, A3,
			Z;
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
			Min = Math.min(p1, p2, p3, p4);
			Max = Math.max(p1, p2, p3, p4);
			a1 = ( Min * (Zmax - Zmin) ) + (Zmax - Xmax);
			a2 = ( Max * (Zmax - Zmin) ) + (Zmax - Xmax);
			M1 = (Min / 2) * (Math.pow(a1, 2));
			M2 =	(
					(((1 / (Zmax - Zmin)) / 3) * Math.pow(a2, 3))
					- ((Zmin / (Zmax - Zmin)) / 2) * Math.pow(a2, 2)
				) - (
					(((1 / (Zmax - Zmin)) / 3) * Math.pow(a1, 3))
					- ((Zmin / (Zmax - Zmin)) / 2) * Math.pow(a1, 2)
				);
			M3 =	((Max * Math.pow(Zmax, 2)) / 2) - (((Max * (Zmax - Zmin)) / 2) * (Zmax - Zmin));
			A1 = a1 * Min;
			A2 = ((Min + Max) * (a2 - a1)) / 2;
			A3 = (Zmax - (Zmax - Zmin)) * Max;
			Z = (M1 + M2 + M3) / (A1 + A2 + A3);
			c.fillStyle = 'black';
			c.textAlign = 'center';
			c.font = "bold 11px Segoe UI";
			c.fillText('Metode\x20:\x20Mamdani', w*.5, h*.05);
			c.textAlign = 'left';
			c.font = "normal 11px Segoe UI";
			c.fillText('Permintaan Minimal = '+Xmin, w*.05, h*.1);
			c.fillText('Permintaan Maksimal = '+Xmax, w*.05, h*.15);
			c.fillText('Persediaan Minimal = '+Ymin, w*.05, h*.2);
			c.fillText('Persediaan Maksimal = '+Ymax, w*.05, h*.25);
			c.fillText('\u00B5PermintaanTurun = '+uXsedikit, w*.05, h*.3);
			c.fillText('\u00B5PermintaanNaik = '+uXbanyak, w*.05, h*.35);
			c.fillText('\u00B5PersediaanTurun = '+uYsedikit, w*.05, h*.4);
			c.fillText('\u00B5PersediaanNaik = '+uYbanyak, w*.05, h*.45);
			c.fillText('p1 = '+p1, w*.05, h*.5);
			c.fillText('p2 = '+p2, w*.05, h*.55);
			c.fillText('p3 = '+p3, w*.05, h*.6);
			c.fillText('p4 = '+p4, w*.05, h*.65);
			c.fillText('Min = '+Min, w*.05, h*.7);
			c.fillText('Max = '+Max, w*.05, h*.75);
			c.fillText('a1 = '+a1, w*.05, h*.8);
			c.fillText('a2 = '+a2, w*.05, h*.85);
			c.fillRect(w*.5, h*.07, 1, h*.85);
			c.fillText('M1 = '+M1, w*.55, h*.1);
			c.fillText('M2 = '+M2, w*.55, h*.15);
			c.fillText('M3 = '+M3, w*.55, h*.2);
			c.fillText('A1 = '+A1, w*.55, h*.25);
			c.fillText('A2 = '+A2, w*.55, h*.3);
			c.fillText('A3 = '+A3, w*.55, h*.35);
			c.fillText('Z = '+Z, w*.55, h*.4);
			/*c.fillRect(w*.5, h*.27, w*.95, 1);*/
			if (X < Xmin || X > Xmax || Y < Ymin || Y > Ymax) {
				c.fillText('Jika Permintaan atau Persediaan saat ini kurang dari data minimalnya', w*.55, h*.5);
				c.fillText('atau melebihi data maksimalnya,\x20maka hasil pengolahan di atas tidak', w*.55, h*.55);
				c.fillText('bisa di gunakan.', w*.55, h*.6);
				ZNow = false;
			} else {
				c.fillText('Berdasarkan hasil pengolahan,\x20maka jumlah barang yang sebaiknya', w*.55, h*.5);
				c.fillText('diproduksi adalah '+Z+'.', w*.55, h*.55);
				ZNow = Z;
			}
		}
	};
	uGrafik(Xmax, Xmin, XNow, Xtarget, 'Permintaan');
	uGrafik(Ymax, Ymin, YNow, Ytarget, 'Persediaan');
	Zgrafik(Ztarget);
	Tanggal.onclick = function(e) {
		KALENDER('Kalender',0,e);
	};
	Cetak.onclick = function() {
		var Xurl = Xtarget.toDataURL('image/png', 1),
		Yurl = Ytarget.toDataURL('image/png', 1),
		Zurl = Ztarget.toDataURL('image/png', 1),
		dataCetak =	'<!DOCTYPE html>
					<html>
					<head>
						<title>Metode</title>
						<meta charset="utf-8">
						<style>
							body{
								text-align: center;
							}
							#X, #Y{
								margin: 0;
								width: 400px;
								height: 150px;
							}
							#Z{
								margin: 0;
								width: 800px;
								height: 500px;
							}
						</style>
						<script>
							function buatHasil(X, Y, Z) {
								var body = document.body,
								imgX = body.querySelector("#X"),
								imgY = body.querySelector("#Y"),
								imgZ = body.querySelector("#Z");
								imgX.setAttribute("src", X);
								imgY.setAttribute("src", Y);
								imgZ.setAttribute("src", Z);
								alert("Gunakan mode \'Landscape\' untuk mencetak !");
								body.onload = function() {
									window.print();
								}
							}
						</script>
					</head>
					<body>
					<img id="X" src="blank">
					<img id="Y" src="blank">
					<img id="Z" src="blank">
					</body>
					<script>
						buatHasil("'+Xurl+'","'+Yurl+'","'+Zurl+'");
					</script>
					</html>',
		buat = new Blob([dataCetak], {type: 'text/html'});
		var buatURL = URL.createObjectURL(buat);
		open(buatURL);
	};
	Simpan.onclick = function() {
		if (KALENDER('Cek', Tanggal.value) == 'Valid') {
			if (dataTgl.indexOf(Tanggal.value) == -1) {
				if (ZNow) {
					GET('Sistem/Database.php', 0, 'Buka', 'Tambah;'+Tanggal.value+'|'+XNow+'|'+YNow+'|'+ZNow+'|Rokok', 'YA');
					isi.style.filter = 'blur(0)';
					dialogOlah.style.opacity = 0;
					dialogOlah.style.transform = 'scale(0,0)';
				} else {
					PESAN('Hasil pengolahan data tidak bisa digunakan', 0);
				}
			} else {
				PESAN('Data pada tanggal:'+Tanggal.value+' sudah ada', 0);
			}
		} else {
			PESAN('Tanggal tidak valid',0);
		}
	};
	Tutup.onclick = function() {
		isi.style.filter = 'blur(0)';
		dialogOlah.style.opacity = 0;
		dialogOlah.style.transform = 'scale(0,0)';
	};
};