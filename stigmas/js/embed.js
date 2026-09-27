// Калькулятор відкрито всередині сторінки нового сайту (v2). Шапку, фон і перемикач мови там дає
// сама сторінка, тож тут вони ховаються, а посилання на збірку веде на сторінку v2.
(function () {
	if (window.parent === window) return;
	var share;
	try {
		share = window.parent.stigmaShareLink;
	} catch (e) {
		// Чужий сайт: сторінка лишається звичайною.
		return;
	}
	document.documentElement.className += ' embedded';
	if (typeof share === 'function') window.STIGMA_SHARE = share;
})();
