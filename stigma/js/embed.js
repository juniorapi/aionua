// Калькулятор відкрито в рамці на сторінці сайту. Шапку, фон і перемикач мови там дає сама
// сторінка, тож тут вони ховаються, а посилання на збірку веде на неї.
(function () {
	// Відкрито напряму (стара закладка): калькулятор живе на сторінці сайту, там і збірка.
	if (window.parent === window) {
		location.replace('/aionua/stigma/' + location.hash);
		return;
	}
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
