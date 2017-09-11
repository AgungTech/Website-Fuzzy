<?php
require 'Silent.php';
require 'Enkripsi.php';
require 'Kompres.php';
require 'Koneksi.php';

$a = $_GET['_'];
$_ = substr($a, (strlen($a)-190) );
$b = ENC( substr($a, 0, (strlen($a)-190) ), $_ );
$b = explode(';', $b);
$mode = $b[0];
$data = explode('|', $b[1]);
$koneksi = new MYSQLI( $host, $user, $pass, $db);
$database = array(
	'TP' => array('tbl_produksi','id','tanggal','permintaan','persediaan','produksi','barang'),
	'user' => array('user','nama','password')
);
function db($db, $data) {
	global $koneksi, $mode;
	if ($mode === 'Dapat') {
		$a = $koneksi->query("SELECT * FROM $db[0] WHERE $db[6] = 'Rokok' ORDER BY $db[2]");
	} elseif ($mode === 'Tambah') {
		$a = $koneksi->query("INSERT INTO $db[0] ($db[2], $db[3], $db[4], $db[5], $db[6]) VALUES ('$data[0]', '$data[1]', '$data[2]', '$data[3]', '$data[4]')");
	} elseif ($mode === 'Ubah') {
		$a = $koneksi->query("UPDATE $db[0] SET $db[3] = '$data[1]', $db[4] = '$data[2]', $db[5] = '$data[3]', $db[6] = '$data[4]' WHERE $db[1] = '$data[0]'");
	} elseif ($mode === 'Hapus') {
		$a = $koneksi->query("DELETE FROM $db[0] WHERE $db[1] = '$data[0]'");
	} elseif ($mode === 'GantiPengguna') {
		$a = $koneksi->query("UPDATE $db[0] SET $db[1] = '$data[1]', $db[2] = '$data[2]' WHERE 1");
	};
	return($a);
};
if ($mode === 'Dapat') {
	$tabel = db($database['TP']);
	$hasil = '';
	while($i = mysqli_fetch_assoc($tabel)) {
		$hasil .= $i['id'].'|'.$i['tanggal'].'|'.$i['permintaan'].'|'.$i['persediaan'].'|'.$i['produksi'].';';
	}
	echo ENC(bin2hex('ADMIN("Siap", "'.$hasil.'")'), $_);
} elseif ($mode === 'Tambah') {
	if( db($database['TP'], $data) ) {
		echo ENC(bin2hex('GET("Sistem/Database.php", 0, "Buka", "Dapat;0","YA")'), $_);
	} else {
		echo ENC(bin2hex('PESAN("Gagal menambah database.",0)'), $_);
	}
} elseif ($mode === 'Ubah') {
	if( db($database['TP'], $data) ) {
		echo ENC(bin2hex('GET("Sistem/Database.php", 0, "Buka", "Dapat;0","YA")'), $_);
	} else {
		echo ENC(bin2hex('PESAN("Database gagal diubah.",0)'), $_);
	}
} elseif ($mode === 'Hapus') {
	for ($i=1; $i < count($data)-1; $i++) { 
		$hapus .= $data[$i].'|';
	}
	$proses = round((1-((count($data)-1)/($data[count($data)-1])))*100);
	if (count($data) > 1) {
		if( db($database['TP'], $data) ) {
			echo ENC(bin2hex('GET("Sistem/Database.php", 0, "Buka", "Hapus;'.$hapus.$data[count($data)-1].'", 0);PESAN("Proses : '.$proses.'%",0)'), $_);
		} else {
			echo ENC(bin2hex('PESAN("Database gagal dihapus. Error Kode:'.$hapus.'",0)'), $_);
		}
	} else {
		echo ENC(bin2hex('GET("Sistem/Database.php", 0, "Buka", "Dapat;0", "YA")'), $_);
	}
} elseif ($mode === 'CetakHasil') {
	$hasil = "data:text/html;base64,".base64_encode(file_get_contents('html/CetakHasil.html')."buatHasil('".$data[0]."','".$data[1]."','".$data[2]."');</script></html>");
	echo ENC(bin2hex("open('$hasil')"), $_);
} elseif ($mode === 'CetakTabel') {
	$ttd = explode('|', $b[2]);
	$a = $koneksi->query("SELECT * FROM tbl_produksi WHERE barang = 'Rokok' AND tanggal BETWEEN '$data[0]' AND '$data[1]' ORDER BY tanggal");
	$hasil = '';
	while($i = mysqli_fetch_assoc($a)) {
		$hasil .= $i['tanggal'].'|'.$i['permintaan'].'|'.$i['persediaan'].'|'.$i['produksi'].';';
	}
	$hasil = "data:text/html;base64,".base64_encode(file_get_contents('html/CetakTabel.html')."buatTabel('$hasil','".$ttd[0]."','".$ttd[1]."');</script></html>");
	echo ENC(bin2hex("open('$hasil')"), $_);
} elseif ($mode === 'CetakGrafik') {
	$ttd = explode('|', $b[2]);
	$a = $koneksi->query("SELECT * FROM tbl_produksi WHERE barang = 'Rokok' AND tanggal BETWEEN '$data[0]' AND '$data[1]' ORDER BY tanggal");
	$hasil = '';
	while($i = mysqli_fetch_assoc($a)) {
		$hasil .= $i['tanggal'].'|'.$i['permintaan'].'|'.$i['persediaan'].'|'.$i['produksi'].';';
	}
	$hasil = "data:text/html;base64,".base64_encode(file_get_contents('html/CetakGrafik.html')."buatGrafik('$hasil','".$ttd[0]."','".$ttd[1]."');</script></html>");
	echo ENC(bin2hex("open('$hasil')"), $_);
} elseif ($mode === 'GantiPengguna') {
	$cek = $koneksi->query("SELECT * FROM user WHERE password = '$data[0]'");
	if($cek->num_rows !== 0) {
		if( db($database['user'], $data) ) {
			echo ENC(bin2hex('PESAN("Nama dan Password telah diubah.",0)'), $_);
		} else {
			echo ENC(bin2hex('PESAN("Nama dan Password gagal diubah.",0)'), $_);
		}
	} else {
		echo ENC(bin2hex('PESAN("Password lama salah.",0)'), $_);
	}
}
$koneksi->close();
?>