
jQuery(document).ready(function () {
	jQuery(".share-btn").click(function () {
		jQuery(".share-btn").toggleClass("active")
		jQuery("ul").toggleClass("active")
	})
})

//style two 
document.addEventListener("DOMContentLoaded", function () {
	let fab1 = document.querySelector('.gutefy-section-wrapper.style-two #fab1');
	let innerFabs = document.getElementsByClassName('inner-fabs')[0];

	fab1.addEventListener('click', function () {
		innerFabs.classList.toggle('show')
	})
});
//style two 

