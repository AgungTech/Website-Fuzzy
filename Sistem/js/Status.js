CEK_OBJEK = function( OBJEK ) {
	
	if( OBJEK !== undefined || typeof OBJEK !== 'object' ) {

		if( OBJEK.style.visibility === 'hidden' || OBJEK.style.opacity === '0' || OBJEK.style.display === 'none' ) {
			return 'HILANG'
		} else {
			return 'TAMPIL'
		}
	}
};
HILANG = function( OBJEK ) {

	if( OBJEK !== undefined || typeof OBJEK !== 'object' ) {

		OBJEK.style.opacity = '0';

		function objekHilang() {
			OBJEK.style.visibility = 'hidden';
		};
		window.setTimeout( objekHilang(), 200 )
	}
};
TAMPIL = function( OBJEK ) {

	if( OBJEK !== undefined || typeof OBJEK !== 'object' ) {

		OBJEK.style.visibility = 'visible';
		OBJEK.style.opacity = '1'
	}
};
TOGGLE = function( OBJEK ) {

	if( OBJEK !== undefined || typeof OBJEK !== 'object' ) {

		if( CEK_OBJEK(OBJEK) === 'HILANG' ) {
			TAMPIL( OBJEK )
		} else {
			HILANG( OBJEK )
		}

	}
};
BUANG = function( OBJEK ) {

	if( OBJEK !== undefined || typeof OBJEK !== 'object' ) {

		OBJEK.style.opacity = '0';

		function objekBuang() {

			var PARENT = OBJEK.parentElement;
			PARENT.removeChild(OBJEK);
			HILANG(document.querySelector( '.tooltip' ));
		};
		window.setTimeout( objekBuang(), 200 )
	}
};