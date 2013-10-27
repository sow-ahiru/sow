/* =Check User Agent
-----------------------------------------------------------------------------*/
var nut = navigator.userAgent.toLowerCase();
var uaCheck = {
	'ie'		:nut.indexOf('msie') != -1,
	'ie6'		:nut.indexOf('msie 6') != -1,
	'ie7'		:nut.indexOf('msie 7') != -1,
	'ie8'		:nut.indexOf('msie 8') != -1,
	'ff'		:nut.indexOf('firefox') != -1,
	'safari'	:nut.indexOf('safari') != -1,
	'chrome'	:nut.indexOf('chrome') != -1,
	'opera'		:nut.indexOf('opera') != -1,
	'iphone'	:nut.match(/iPhone/i),
	'ipad'		:nut.match(/iPad/i),
	'ipod'		:nut.match(/iPod/i),
	'android'	:nut.match(/Android/i),
	'win'		:navigator.appVersion.indexOf('Win'),
	'mac'		:navigator.appVersion.indexOf('Macintosh'),
	'sp'		:nut.match(/iPhone/i) || nut.match(/iPad/i) || nut.match(/iPod/i) || nut.match(/Android/i)
};

function ua(target){
	return uaCheck[target];
}

/* =Check Browser Size
-----------------------------------------------------------------------------*/
function getBrowserWidth(){
	return ua("ie") ? document.documentElement.clientWidth : window.innerWidth;
}

function getBrowserHeight(){
	return ua("ie") ? document.documentElement.clientHeight : window.innerHeight;
}

/* =loading
-----------------------------------------------------------------------------*/
var d, sonic, container = document.getElementById('loading');
var loaders = [
	{
		width: 100,
		height: 100,

		stepsPerFrame: 1,
		trailLength: 1,
		pointDistance: .025,

		strokeColor: '#fff',

		fps: 20,

		setup: function() {
			this._.lineWidth = 2;
		},
		step: function(point, index) {

			var cx = this.padding + 50,
				cy = this.padding + 50,
				_ = this._,
				angle = (Math.PI/180) * (point.progress * 360);

			this._.globalAlpha = Math.max(.5, this.alpha);

			_.beginPath();
			_.moveTo(point.x, point.y);
			_.lineTo(
				(Math.cos(angle) * 35) + cx,
				(Math.sin(angle) * 35) + cy
			);
			_.closePath();
			_.stroke();

			_.beginPath();
			_.moveTo(
				(Math.cos(-angle) * 32) + cx,
				(Math.sin(-angle) * 32) + cy
			);
			_.lineTo(
				(Math.cos(-angle) * 27) + cx,
				(Math.sin(-angle) * 27) + cy
			);
			_.closePath();
			_.stroke();

		},
		path: [
			['arc', 50, 50, 40, 0, 360]
		]
	}
];
function showLoading() {
	for (var i = -1, l = loaders.length; ++i < l;) {
		d = document.createElement('div');
		d.className = 'l';

		sonic = new Sonic(loaders[i]);

		d.appendChild(sonic.canvas);
		container.appendChild(d);

		sonic.canvas.style.marginTop = (150 - sonic.fullHeight) / 2 + 'px';
		sonic.canvas.style.marginLeft = (150 - sonic.fullWidth) / 2 + 'px';

		sonic.play();
	}
}
function hideLoading() {
	sonic.stop();
	$('#loading').html('');
}

$(function() {
	// a fade
	$('#navi .gNavi a, .member a, .ib-main a').hover(
		function() {
			$(this).stop().animate({'opacity':'0.4'}, 300);
		},
		function() {
			$(this).stop().animate({'opacity':'1'}, 500);
		}
	);
});
