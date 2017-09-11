<?php

function ENKRIPSI( $KUNCI, $DATA ) {
	return( base64_encode( mcrypt_encrypt( MCRYPT_RIJNDAEL_256, md5( $KUNCI ), $DATA, MCRYPT_MODE_CBC, md5( md5( $KUNCI ) ) ) ) );
}

function DEKRIPSI( $KUNCI, $DATA ) {
	return( rtrim( mcrypt_decrypt( MCRYPT_RIJNDAEL_256, md5( $KUNCI ), base64_decode( $DATA ), MCRYPT_MODE_CBC, md5( md5( $KUNCI ) ) ), "\0") );
}

function COOKIE($kode) {
	if ($kode === 'YA') {
		$_ = 'er$%xcv!@12\'zyuiob./s^&*t~df=qw#()_+`p[]\\a345;lnm,g67890-hjkASDFL:"Z{}|XCVWJKOPBQUIGH?M<>NERTY ';
		$ACAK = random_int(1, strlen($_)-1);
		$a = substr($_, $ACAK, strlen($_)).substr($_, 0, $ACAK);
		$a = str_replace( "\\", "\\\\", $a );
		$a = str_replace( "'", "\'", $a );
		$a = bin2hex($a);
		$a = bin2hex("='".$a."';");
	} else {
		$a = hex2bin($kode);
	}
	return $a;
}
function ENC($x, $kode) {
	$_ = COOKIE($kode);
	$a = '~!@#$%^&*()_+`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>? ';
	$b = null;
	$c = strlen($x);
	$d = '';
	$e = '`';
	$f = '';
	for ( $i = 0; $i < $c; $i++ ) {
		if ( $f == '?' ) {
			if ( $x[0] == $e ) {
				if($i !== $c-1)
					$b = $a[ substr( $x, ++$i, 2 ) ];
			} else {
				$b = strpos( $a, $x[$i] );
				if( strlen($b) < 2 ) {
					$b = '0'.$b;
				}
			};
			$d .= $b;
			$f = '';
		} else {
			if ( $x[0] == $e ) {
				if($i !== $c-1)
					$b = $_[ substr( $x, ++$i, 2 ) ];
			} else {
				$b = strpos( $_, $x[$i] );
				if( strlen($b) < 2 ) {
					$b = '0'.$b;
				}
			};
			$d .= $b;
			$f = '?';
		};
	};
	if ( $x[0] !== $e ) {
		$d = $e.$d;
	} else {
		$d = substr( $d, 0, strlen($d)-1 );
	}
	if ($x === '') {
		$d = '';
	}
	return $d;
}
?>