TOOLTIP = function( OBJEK, NAMA, LEBAR ) {

	var TOOLTIP_BOX		= document.querySelector( '.tooltip' );
	var TOOLTIP_KONTEN	= document.querySelector( '.tooltipKonten' );

	function GANTI_TOOLTIP() {

		if( !TOOLTIP_BOX ) {

			var TOOLTIP_DIV = document.createElement( 'div' );
			TOOLTIP_DIV.setAttribute( 'class', 'tooltip' );
			TOOLTIP_DIV.style.top="0px";
			TOOLTIP_DIV.style.transitionDelay=".00001s";
			TOOLTIP_DIV.style.transitionDuration=".2s";
			TOOLTIP_DIV.style.transitionTimingFunction="cubic-bezier(0.25,0.1,0.25,1)";
			document.body.appendChild( TOOLTIP_DIV );
			
			TOOLTIP_BOX  = document.querySelector( '.tooltip' );
			var TOOLTIP_DIV2 = document.createElement( 'div' );
			TOOLTIP_DIV2.setAttribute( 'class', 'tooltipKonten' );
			TOOLTIP_BOX.appendChild( TOOLTIP_DIV2 );

			TOOLTIP_KONTEN = document.querySelector( '.tooltipKonten' );

			function TOOLTIP_PINDAH(e) {

				var X  = e.clientX || e.offsetX;
				var Y  = e.clientY || e.offsetY;
				var LEBAR		= window.innerWidth;
				var TINGGI	= window.innerHeight;
				var TEKS		= TOOLTIP_KONTEN.innerHTML;
				var TENGAH	= parseInt(TOOLTIP_KONTEN.style.width)/2;

				function ANIMASI(X2,Y2) {

					if( CEK_OBJEK(TOOLTIP_BOX) === 'TAMPIL' ) {

						TOOLTIP_BOX.style.transform = "translate("+(X+X2)+"px,"+(Y+Y2)+"px)";
					}
				}

				function POSISI(ATAS, KANAN, BAWAH, KIRI) {

					if( CEK_OBJEK(TOOLTIP_BOX) === 'TAMPIL' ) {

						TOOLTIP_KONTEN.style.top    = ATAS;
						TOOLTIP_KONTEN.style.right  = KANAN;
						TOOLTIP_KONTEN.style.bottom = BAWAH;
						TOOLTIP_KONTEN.style.left   = KIRI;
					}
				}

				if( X < (LEBAR*.15) && Y > (TINGGI*.15) ) {

					POSISI('auto','auto','0','0');
					ANIMASI(20,-30);

				} else if( X < (LEBAR*.15) && Y <= (TINGGI*.15) ) {

					POSISI('0','auto','auto','0');
					ANIMASI(20,30);

				} else if( X >= (LEBAR*.15) && X <= (LEBAR*.85) && Y <= (TINGGI*.15) ) {

					POSISI('0','0','auto','auto');
					ANIMASI(TENGAH,30);

				} else if( X > (LEBAR*.85) && Y <= (TINGGI*.15) ) {

					POSISI('0','0','auto','auto');
					ANIMASI(-20,30);

				} else if( X > (LEBAR*.85) && Y > (TINGGI*.15) ) {

					POSISI('auto','0','0','auto');
					ANIMASI(-20,-30);
				} else {

					POSISI('auto','0','0','auto');
					ANIMASI(TENGAH,-30);
				}
			}

			document.addEventListener( "mouseup", TOOLTIP_PINDAH );
			document.addEventListener( "mousemove", TOOLTIP_PINDAH );
			document.addEventListener( "keydown", TOOLTIP_PINDAH );
			
			HILANG(TOOLTIP_BOX);
		}
	}

	GANTI_TOOLTIP();

	function MOUSE_MASUK() {
		TOOLTIP_KONTEN.innerHTML= NAMA;
		TOOLTIP_KONTEN.style.width = LEBAR;
		if (LEBAR !== 0) {
			TAMPIL(TOOLTIP_BOX);
		} else {
			HILANG(TOOLTIP_BOX);
		}
	}

	function MOUSE_KELUAR() {
		HILANG(TOOLTIP_BOX);
	}

	OBJEK.addEventListener( "mouseover", MOUSE_MASUK );
	OBJEK.addEventListener( "mouseout", MOUSE_KELUAR );
};