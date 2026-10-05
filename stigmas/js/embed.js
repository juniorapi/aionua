// Калькулятор відкрито в рамці на сторінці сайту. Шапку, фон і перемикач мови там дає сама
// сторінка, тож тут вони ховаються, а посилання на збірку веде на неї.
(function () {
	// Відкрито напряму (стара закладка): калькулятор живе на сторінці сайту, адреса там — #клас/код.
	if (window.parent === window) {
		var parts = location.pathname.replace(/index\.html$/, '').split('/').filter(Boolean);
		var cls = parts[parts.length - 1];
		location.replace('/aionua/stigmas/#' + cls + (location.hash.length > 1 ? '/' + location.hash.slice(1) : ''));
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
