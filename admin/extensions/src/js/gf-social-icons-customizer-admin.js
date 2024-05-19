const gutefySectionWrapper = document.querySelector('.gutefy-section-wrapper');
const gutefy_namespace = 'gutefy_settings_';
const gf_social_icons__extensions_namespace = '_social_icon';
const gf_social_icons__style = '';

// social hover style 
wp.customize(`${gutefy_namespace}selected_style${gf_social_icons__extensions_namespace}`, (value) => {
       value.bind((hover_style) => {
              const data = wp.customize.value(`${gutefy_namespace}accounts${gf_social_icons__extensions_namespace}`)();
              console.log(hover_style);
              gfSocialAccountGenerateAccountMarkupFromTheJson(hover_style, data);
       })
})
// social hover style 
// add-social-account 
wp.customize(`${gutefy_namespace}accounts${gf_social_icons__extensions_namespace}`, (value) => {
       value.bind((account_details) => {
              const hover_style = wp.customize.value(`${gutefy_namespace}selected_style${gf_social_icons__extensions_namespace}`)();
              gfSocialAccountGenerateAccountMarkupFromTheJson(hover_style, account_details);
       })
})

let gfSocialAccountGenerateAccountMarkupFromTheJson = (hover_style, data) => {
       let toObject = JSON.parse(data);
       if(hover_style=='style1'){
              gfSocialAccountGenerateAccountMarkupStyleOne(toObject);
       }
       else{
              gfSocialAccountGenerateAccountMarkupStyleTwo(toObject);
       }
}

let gfSocialAccountGenerateAccountMarkupStyleTwo = (toObject) => {
       
       let div = document.querySelector('.gutefy-section-wrapper');
       div.innerHTML = '';
       div.classList.remove('style-one');
       div.classList.add('style-two');

       // Create the div element
       const iconWrapper = document.createElement('div');
       iconWrapper.className = "gf_social_icons_social_float";

       Object.entries(toObject).forEach(([key, data]) => {
              const anchor = document.createElement('a');
              anchor.href = data.url;
              anchor.innerHTML = fontIcons[data.icon]['icon'];
              anchor.className = 'gf_social_icons_social_icon';
              anchor.id = ''; // Set the id if needed

              // Append the anchor to the div
              iconWrapper.appendChild(anchor);
       })

       // Append the anchor to the div
       div.appendChild(iconWrapper);

}
let gfSocialAccountGenerateAccountMarkupStyleOne = (toObject) => {

       let div = document.querySelector('.gutefy-section-wrapper ');
       div.innerHTML = '';
       div.classList.add('style-one')
       div.classList.remove('style-two');
       let icon_wrapper = document.createElement('div');
       icon_wrapper.className = 'gf_social_icons-float-sm'
       Object.entries(toObject).forEach(([key, data]) => {
              
              const div_wrapper = document.createElement('div');
              div_wrapper.className = 'gf_social_icons-fl-fl gf_social_icons-float-';
       
              // Add the icon to the div
              div_wrapper.innerHTML = fontIcons[data.icon]['icon'];
       
              // Create the anchor element
              const anchor = document.createElement('a');
              anchor.href = data.url;
              anchor.textContent = data.icon;
       
              // Append the anchor to the div
              div_wrapper.appendChild(anchor);
       
              // Append the anchor to the div
              icon_wrapper.appendChild(div_wrapper);
       })
       div.appendChild(icon_wrapper)

}
// add-social-account 

//preview color
wp.customize(`${gutefy_namespace}color${gf_social_icons__extensions_namespace}`, function (value) {
       value.bind(function (newval) {
              gutefySectionWrapper.style.setProperty('--gutefy-secondary-color', newval);
       });
})
//preview bg color
wp.customize(`${gutefy_namespace}bg_color${gf_social_icons__extensions_namespace}`, function (value) {
       value.bind(function (newval) {
              gutefySectionWrapper.style.setProperty('--gutefy-primary-color', newval);
       })
})

//preview hover color
wp.customize(`${gutefy_namespace}hover_color${gf_social_icons__extensions_namespace}`, function (value) {
       value.bind(function (newval) {
              gutefySectionWrapper.style.setProperty('--gutefy-secondary-hover-color', newval);
       })
})
//preview bghover color
wp.customize(`${gutefy_namespace}hover_bg_color${gf_social_icons__extensions_namespace}`, function (value) {
       value.bind(function (newval) {
              gutefySectionWrapper.style.setProperty('--gutefy-primary-hover-color', newval);
       })
})
//preview icon size
wp.customize(`${gutefy_namespace}icon_size${gf_social_icons__extensions_namespace}`, function (value) {
       value.bind(function (newval) {
              gutefySectionWrapper.style.setProperty('--gutefy-icon-size', `${newval}px`);
       })
})
//preview icon wrapper size
wp.customize(`${gutefy_namespace}icon_wrapper_size${gf_social_icons__extensions_namespace}`, function (value) {
       value.bind(function (newval) {
              gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-size', `${newval}px`);
       })
})

//preview icon wrapper vertical position
wp.customize(`${gutefy_namespace}icon-wrapper-position-top${gf_social_icons__extensions_namespace}`, function (value) {
       value.bind(function (newval) {
              gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-position-top', `${newval}%`);
       })
})

//icon_positino
wp.customize(`${gutefy_namespace}icon_position${gf_social_icons__extensions_namespace}`, function (value) {
       value.bind(function (new_value) {
              if (new_value == 'bottom_right') {
                     gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-bottom', '0%');
                     gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-right', '0');
                     gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-left', 'auto');
              }
              else if (new_value == 'bottom_left') {
                     gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-bottom', '0%');
                     gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-left', '1');
                     gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-right', 'auto');
              }
       })
})

wp.customize(`${gutefy_namespace}icon_wrapper_z_index${gf_social_icons__extensions_namespace}`, function (value) {
       value.bind(function (new_value) {
              gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-z-index', new_value);
       })
})


wp.customize(`${gutefy_namespace}icon-wrapper-opacity${gf_social_icons__extensions_namespace}`, function (value) {
       value.bind(function (new_value) {
              gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-opacity', new_value);
       })
})



/////////////////!SECTION
