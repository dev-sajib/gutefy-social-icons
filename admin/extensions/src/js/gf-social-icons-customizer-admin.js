const gutefySectionWrapper = document.querySelector('.gutefy-section-wrapper');
const gutefy_namespace = 'gutefy_settings_';
const gf_social_icons__extensions_namespace = '_social_icon';
       //preview color
       wp.customize( `${gutefy_namespace}color${gf_social_icons__extensions_namespace}`, function( value ) {
              value.bind( function( newval ) {
                     gutefySectionWrapper.style.setProperty('--gutefy-secondary-color', newval);
              } );
       } )
       //preview bg color
       wp.customize(`${gutefy_namespace}bg_color${gf_social_icons__extensions_namespace}`,function(value){
              value.bind(function(newval){
                     gutefySectionWrapper.style.setProperty('--gutefy-primary-color', newval);
              })
       })

       //preview hover color
       wp.customize(`${gutefy_namespace}hover_color${gf_social_icons__extensions_namespace}`,function(value){
              value.bind(function(newval){
                     gutefySectionWrapper.style.setProperty('--gutefy-secondary-hover-color', newval);
              })
       })
       //preview bghover color
       wp.customize(`${gutefy_namespace}hover_bg_color${gf_social_icons__extensions_namespace}`,function(value){
              value.bind(function(newval){
                     gutefySectionWrapper.style.setProperty('--gutefy-primary-hover-color', newval);
              })
       })
       //preview icon size
       wp.customize(`${gutefy_namespace}icon_size${gf_social_icons__extensions_namespace}`,function(value){
              value.bind(function(newval){
                     gutefySectionWrapper.style.setProperty('--gutefy-icon-size', `${newval}px`);
              })
       })
       //preview icon wrapper size
       wp.customize(`${gutefy_namespace}icon_wrapper_size${gf_social_icons__extensions_namespace}`,function(value){
              value.bind(function(newval){
                     gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-size', `${newval}px`);
              })
       })

       //icon_positino
       wp.customize(`${gutefy_namespace}icon_position${gf_social_icons__extensions_namespace}`,function(value){
              value.bind(function(new_value){
                     if(new_value=='bottom_right'){
                            gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-bottom', '0%');
                            gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-right', '0');
                            gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-left', 'auto');
                     }
                     else if(new_value=='bottom_left'){
                            gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-bottom', '0%');
                            gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-left', '1');
                            gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-display-postion-right', 'auto');
                     }
              })
       })

       wp.customize(`${gutefy_namespace}icon_wrapper_z_index${gf_social_icons__extensions_namespace}`,function(value){
              value.bind(function(new_value){
                     gutefySectionWrapper.style.setProperty('--gutefy-icon-wrapper-z-index', new_value);
              })
       })
