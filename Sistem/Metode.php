<?php
require 'Silent.php';
require 'Enkripsi.php';
require 'Kompres.php';
$HASIL = bin2hex(file_get_contents('js/Enkripsi.js'));
echo COOKIE('YA').JS($HASIL);
?>