<?php
require 'Silent.php';
require 'Kompres.php';
require 'Enkripsi.php';
$HASIL = '';
$BERKAS = array(
	'Huruf',
	'Utama',
	'Admin',
	'Olah',
	'Kalender'
	);
foreach( $BERKAS as $NAMA ) {
	$HASIL .= file_get_contents('css/'.$NAMA.'.css');
}
echo ENC( CSS(bin2hex('<style>'.$HASIL.'</style>')), $_GET['_']);

?>