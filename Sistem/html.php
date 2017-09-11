<?php
require 'Kompres.php';
require 'Enkripsi.php';
$HASIL = bin2hex(file_get_contents('html/'.$_GET['$'].'.html'));
echo ENC( HTML($HASIL), $_GET['_']);
?>