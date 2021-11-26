/*
	Dev:		Bill From IT (ZeroFecks)
	Repo:		https://github.com/phuxclusive
	Desc.:	Internal 'One-Page' Website Template
					Removed the use of an iFrame, utilized jQuery's 'load' function,
					and brought the project up to current standards. All 'includes'
					pages can now be styled directly from the
					/assets/css/style.css stylesheet, instead of being forced to
					style each page individually.

	Usage:
				$('[descriptor_class]').click(function() {
					$('#[div_id]').load([storage] + '[source]');
				});

	Removed Outdated iFrame Code:
				function show_[descriptor]() {
					document.getElementById('[iFrame_id]').src="[source]";
					document.getElementById('[iFrame_id]').style.height="[size]";
				}
*/

/*
	Navigation
*/

$(document).ready(function(){
	$(function() {
		var tDomain = 'https://localhost';
		window.localBin = tDomain + '/includes/';
		window.internalFiles = tDomain + '/internal_files/';
		/* Get the front page presentation pdf */
		$('#path_frame').load(localBin + 'front_page.html');
		/* Check current month, and get birthdays accordingly */
		var d = new Date(),
				n = d.getMonth() + 1; /* Months start at 0 in JS, so we need to +1 */
		$('#birthdays').load(localBin + 'birthdays/'+ n +'.html');
		$('#latest_news').load(localBin + 'latest_news.html');
		// look for hash characters, so we can force reloads
		// and show content accordingly
		if (window.location.hash !== '') {
			onReload(window.location.hash);
		}
	});
	/*
		Navigation
	*/
	/* basic page load */
	$('.show_example').click(function() {
		$('#path_frame').load(localBin + 'example.html');
	});
	/* forced reload page */
	$('.show_gallery').click(function() {
		newLoad('r');
	});
	function onReload(pageChar) {
		switch(pageChar) {
			case '#r':
				$('#path_frame').load(localBin + 'gallery.html');
			default:
				return false;
		}
	}
});
// if for any reason you need to force a refresh, like i did,
// you can simply add a letter to the hash portion of the uri
// converted to switch statement for reusability
function newLoad(hashChar) {
	switch(hashChar) {
		case 'r':
			window.location.hash = 'r';
			window.location.reload(true);
		default:
			return false;
	}
}
/*
	Borrowed from cferdinandi : http://jsfiddle.net/cferdinandi/b13ctvd7/
	Append our Back to Top link to the page if content is out of viewport
*/
function chkViewPort() {
	var isOutOfViewport = function (elem) {
		// Get element's bounding
		var bounding = elem.getBoundingClientRect();
		// Check if it's out of the viewport on each side
		var out = {};
		out.top = bounding.top < 0;
		out.left = bounding.left < 0;
		out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
		out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
		out.any = out.top || out.left || out.bottom || out.right;
		return out;
	};
	var elem = document.querySelector('#path_frame');
	var isOut = isOutOfViewport(elem);
	if (isOut.bottom) {
		console.log('Bottom out of view');
		var goToTop = '<a class="back2Top" href="#">⮝&nbsp;Back to&nbsp;top&nbsp;⮝</a>';
		$('#path_frame').append(goToTop);
	}
}
