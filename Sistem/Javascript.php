<?php
require 'Silent.php';
require 'Enkripsi.php';
require 'Kompres.php';
$BERKAS = array(
	'Ajax',
	'Status',
	'Pesan',
	'Tooltip',
	'Kalender',
	'Masuk',
	'Admin',
	'Olah'
	);
foreach( $BERKAS as $NAMA )
{
	$HASIL .= bin2hex(file_get_contents('js/'.$NAMA.'.js'));
}
echo ENC(  JS($HASIL), $_GET['_'] );
?>