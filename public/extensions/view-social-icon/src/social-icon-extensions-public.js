//style two 
document.addEventListener("DOMContentLoaded", function () {
	if (document.querySelector('section.gutefy-section-wrapper.style-one .share-btn')) {
		document.querySelector('section.gutefy-section-wrapper.style-one .share-btn').addEventListener('click', function () {
			document.querySelector(' .gutefy-section-wrapper.style-one ul').classList.toggle('active')
		});
	}
	if (document.querySelector('.gutefy-section-wrapper.style-two #fab1')) {
		document.querySelector('.gutefy-section-wrapper.style-two #fab1').addEventListener('click', function () {
			document.querySelector('.gf-sl-inner-fabs').classList.toggle('show')
		});
	}

});
//style two 

