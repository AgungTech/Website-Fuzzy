PESAN = function(teks, mode) {
	var bg = document.querySelector('.pesanBg'),
	box = document.querySelector('.pesanBox'),
	tombol = document.querySelector('.ok');
	if(!bg) {
		var div = document.createElement('div');
		div.setAttribute('class', 'pesanBg');
		div.style.position = 'fixed';
		div.style.left = '0';
		div.style.top = '0';
		div.style.right = '0';
		div.style.bottom = '0';
		div.style.zIndex = '999';
		div.style.background = 'rgba(255,255,255,.7)';
		div.style.textAlign = 'center';
		div.style.transitionDuration=".2s";
		div.style.opacity = '0';
		div.style.visibility = 'hidden';
		document.body.appendChild(div);
		bg = document.querySelector('.pesanBg');
		div = document.createElement('div');
		div.setAttribute('class', 'pesanBox');
		div.style.display = 'inline-block';
		div.style.maxWidth = window.innerWidth*.95+'px';
		div.style.maxHeight = window.innerHeight*.95+'px';
		div.style.padding = '5px';
		div.style.textAlign = 'center';
		div.style.transition="transform .2s";
		div.style.transform = "scale(0,0)";
		div.style.transformStyle = "preserve-3d";
		div.style.wordBreak = 'break-all';
		bg.appendChild(div);
		box = bg.querySelector('.pesanBox');
	};
	if (mode == 1) {
		box.innerHTML = teks;
		box.style.background = 'rgba(255,255,255,1)';
		box.style.boxShadow = '0 0 3px black';
		box.style.overflowX = 'hidden';
		box.style.overflowY = 'auto';
		var tombol = document.createElement('button');
		tombol.setAttribute('class', 'ok');
		tombol.style.display = 'block';
		tombol.style.textAlign = 'center';
		tombol.textContent = 'Tutup';
		box.appendChild(tombol);
		tombol.style.marginTop = '5px';
		tombol.style.marginLeft = ((box.clientWidth*.5)-(tombol.clientWidth*.5))-6+'px';
		box.style.marginTop =  window.innerHeight*.025+'px';
		tombol.focus;
		tombol.onclick = function() {
			HILANG(bg);
			box.style.transform = "scale(0,0)"
		}
	} else if (mode == 0) {
		box.textContent = teks;
		box.style.background = 'rgba(255,255,255,1)';
		box.style.boxShadow = '0 0 3px black';
		var tombol = document.createElement('button');
		tombol.setAttribute('class', 'ok');
		tombol.style.display = 'block';
		tombol.style.textAlign = 'center';
		tombol.textContent = 'Oke';
		box.appendChild(tombol);
		tombol.style.marginTop = '5px';
		tombol.style.marginLeft = ((box.clientWidth*.5)-(tombol.clientWidth*.5))-6+'px';
		box.style.marginTop = (window.innerHeight*.5)-(box.clientHeight*.5)+'px';
		tombol.focus;
		bg.onclick = function() {
			HILANG(this);
			box.style.transform = "scale(0,0)"
		}
	} else if (mode == 'Loading') {
		var w = (window.innerWidth*.95)+4;
		box.style.background = 'transparent';
		box.style.boxShadow = 'none';
		box.innerHTML = '<p style="font-size: 14px;font-weight: bold">Loading Data...</p>';
		box.innerHTML += '
			<svg height="8" width="'+(w-4)+'">
				<circle cx="0" cy="4" r="4" fill="rgba(0,180,255,1)">
					<animate attributeName="cx" begin="0s" dur="15s" values="-4;'+w+';'+w+';-4;-4;-4;-4" keySplines="0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2" calcMode="spline" repeatCount="indefinite" />
				</circle>
				<circle cx="0" cy="4" r="4" fill="rgba(0,180,255,1)">
					<animate attributeName="cx" begin="0.1s" dur="15s" values="-4;'+w+';'+w+';-4;-4;-4;-4" keySplines="0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2" calcMode="spline" repeatCount="indefinite" />
				</circle>
				<circle cx="0" cy="4" r="4" fill="rgba(0,180,255,1)">
					<animate attributeName="cx" begin="0.2s" dur="15s" values="-4;'+w+';'+w+';-4;-4;-4;-4" keySplines="0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2" calcMode="spline" repeatCount="indefinite" />
				</circle>
				<circle cx="0" cy="4" r="4" fill="rgba(0,180,255,1)">
					<animate attributeName="cx" begin="0.3s" dur="15s" values="-4;'+w+';'+w+';-4;-4;-4;-4" keySplines="0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2" calcMode="spline" repeatCount="indefinite" />
				</circle>
				<circle cx="0" cy="4" r="4" fill="rgba(0,180,255,1)">
					<animate attributeName="cx" begin="0.4s" dur="15s" values="-4;'+w+';'+w+';-4;-4;-4;-4" keySplines="0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2" calcMode="spline" repeatCount="indefinite" />
				</circle>
				<circle cx="0" cy="4" r="4" fill="rgba(0,180,255,1)">
					<animate attributeName="cx" begin="0.5s" dur="15s" values="-4;'+w+';'+w+';-4;-4;-4;-4" keySplines="0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2" calcMode="spline" repeatCount="indefinite" />
				</circle>
				<circle cx="0" cy="4" r="4" fill="rgba(0,180,255,1)">
					<animate attributeName="cx" begin="0.6s" dur="15s" values="-4;'+w+';'+w+';-4;-4;-4;-4" keySplines="0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2" calcMode="spline" repeatCount="indefinite" />
				</circle>
				<circle cx="0" cy="4" r="4" fill="rgba(0,180,255,1)">
					<animate attributeName="cx" begin="0.7s" dur="15s" values="-4;'+w+';'+w+';-4;-4;-4;-4" keySplines="0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2" calcMode="spline" repeatCount="indefinite" />
				</circle>
				<circle cx="0" cy="4" r="4" fill="rgba(0,180,255,1)">
					<animate attributeName="cx" begin="0.8s" dur="15s" values="-4;'+w+';'+w+';-4;-4;-4;-4" keySplines="0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2" calcMode="spline" repeatCount="indefinite" />
				</circle>
				<circle cx="0" cy="4" r="4" fill="rgba(0,180,255,1)">
					<animate attributeName="cx" begin="0.9s" dur="15s" values="-4;'+w+';'+w+';-4;-4;-4;-4" keySplines="0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2;0.3 0.7 0.7 0.2" calcMode="spline" repeatCount="indefinite" />
				</circle>
			</svg>
		';
		box.style.marginTop = (window.innerHeight*.5)-(box.clientHeight*.5)+'px';
		bg.onclick = function() {
		}
	};
	if (mode === 'Hilang') {
		HILANG(bg);
		box.style.transform = "scale(0,0)"
	} else {
		TAMPIL(bg);
		box.style.transform = "scale(1,1)"
	}
};