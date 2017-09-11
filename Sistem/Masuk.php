<?php
require 'Enkripsi.php';
require 'Koneksi.php';
require 'Silent.php';
$z = $_GET['_'];
$y = substr($z, (strlen($z)-190) );
$data = ENC( substr($z, 0, (strlen($z)-190) ), $y );
$data = explode('|', $data);
$koneksi = new MYSQLI( $host, $user, $pass, $db);
if ($koneksi) {
	$cek = $koneksi->query("SELECT * FROM user");
	if ($cek->num_rows == 0) {
		$buatTabel = <<<DB
CREATE TABLE IF NOT EXISTS tbl_produksi (
 id int(5) NOT NULL AUTO_INCREMENT,
 tanggal varchar(10) NOT NULL,
 permintaan int(5) NOT NULL,
 persediaan int(5) NOT NULL,
 produksi int(5) NOT NULL,
 barang varchar(20) NOT NULL,
 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS user (
 nama varchar(20) NOT NULL,
 password varchar(20) NOT NULL,
 PRIMARY KEY (nama)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO user (nama, password) VALUES
('admin', 'admin');
DB;
		$hasil = $koneksi->multi_query($buatTabel);
		if ($hasil) {
			$hasil = $koneksi->query("SELECT * FROM user WHERE nama = '$data[0]' AND password = '$data[1]'");
			if ($hasil->num_rows !== 0) {
				echo ENC(bin2hex("ADMIN('Awal','".$data[1]."');"), $y );
			} else {
				echo ENC(bin2hex("PESAN('Nama / Password Salah',0)"), $y );
			}
		} else {
			echo ENC(bin2hex("PESAN('Gagal membuat tabel pada database',0)"), $y );
		}
	} else {
		$hasil = $koneksi->query("SELECT * FROM user WHERE nama = '$data[0]' AND password = '$data[1]'");
		if ($hasil->num_rows !== 0) {
			echo ENC(bin2hex("ADMIN('Awal','".$data[1]."')"), $y );
		} else {
			echo ENC(bin2hex("PESAN('Nama / Password Salah',0)"), $y );
		}
	}
} else {
	echo ENC(bin2hex("PESAN('Tidak bisa terkoneksi ke database, ubah pengaturan database pada server.',0)"), $y );
}
$koneksi->close();
?>
