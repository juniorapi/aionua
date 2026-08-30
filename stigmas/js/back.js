// Кнопка «Назад» на головну сайту.
//
// history.back() має сенс лише тоді, коли попередня сторінка — наша.
// Інакше (прямий захід, перехід із пошуку) повертаємося на головну:
// сама лише history.length > 1 тут не рятує, бо у свіжому вікні в історії
// вже може лежати сторінка нової вкладки чи пошук — і «назад» повело б
// геть із сайту.
(function () {
	var HOME = '/aionua/';

	function goHome() {
		var cameFromSite = false;
		try {
			var from = new URL(document.referrer);
			cameFromSite = from.origin === window.location.origin
				&& from.pathname.indexOf(HOME) === 0;
		} catch (e) { /* порожній або некоректний referrer — зайшли напряму */ }

		if (cameFromSite && window.history.length > 1) window.history.back();
		else window.location.href = HOME;
	}

	function init() {
		var button = document.querySelector('.back-button');
		if (button) button.addEventListener('click', goHome);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
