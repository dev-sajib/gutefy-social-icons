//style two 

document.addEventListener("DOMContentLoaded", function () {
	if (document.querySelector('section.gutefy-section-wrapper.style-one .share-btn')) {
		document.querySelector('section.gutefy-section-wrapper.style-one .share-btn').addEventListener('click', function () {
			document.querySelector(' .gutefy-section-wrapper.style-one ul').classList.toggle('active');

		});
	}
	if (document.querySelector('.gutefy-section-wrapper.style-two #fab1')) {
		document.querySelector('.gutefy-section-wrapper.style-two #fab1').addEventListener('click', function () {
			document.querySelector('.gf-sl-inner-fabs').classList.toggle('show')
			let all_social_icon = document.querySelectorAll(' .gutefy-section-wrapper.style-two .gf-sl-inner-fabs.show a.fab');
			if(all_social_icon.length >0){
				Array.from(all_social_icon).forEach(function (e, index) {

					let value = e.offsetWidth;
					let padding = 10
					let calculated_value_from_down_position = (index==0)?((value+15)+padding) : ((index * (value)) + (value+15)+(padding*(index+1)));
					console.log(calculated_value_from_down_position);
					e.style.bottom = `${calculated_value_from_down_position}px`;
	
				})
			}
			else{
				Array.from(document.querySelectorAll(' .gutefy-section-wrapper.style-two .gf-sl-inner-fabs a.fab')).forEach(function (e, index) {
					e.setAttribute('style','');
	
				})
			}
		});
	}

});

//style two 

