const gutefy_namespace = 'gutefy_settings_';
const gutefy_extensions_namespace = '_social_icon';

       //preview color
       wp.customize( `${gutefy_namespace}color${gutefy_extensions_namespace}`, function( value ) {
              value.bind( function( newval ) {
                     document.querySelector('.gutefy-section-wrapper').style.setProperty('--gutefy-secondary-color', newval);
              } );
       } )
       //preview bg color
       wp.customize(`${gutefy_namespace}bg_color${gutefy_extensions_namespace}`,function(value){
              value.bind(function(newval){
                     document.querySelector('.gutefy-section-wrapper').style.setProperty('--gutefy-primary-color', newval);
              })
       })

       //preview hover color
       wp.customize(`${gutefy_namespace}hover_color${gutefy_extensions_namespace}`,function(value){
              value.bind(function(newval){
                     document.querySelector('.gutefy-section-wrapper').style.setProperty('--gutefy-secondary-hover-color', newval);
              })
       })
       //preview bghover color
       wp.customize(`${gutefy_namespace}hover_bg_color${gutefy_extensions_namespace}`,function(value){
              value.bind(function(newval){
                     document.querySelector('.gutefy-section-wrapper').style.setProperty('--gutefy-primary-hover-color', newval);
              })
       })
       //preview icon size
       wp.customize(`${gutefy_namespace}icon_size${gutefy_extensions_namespace}`,function(value){
              value.bind(function(newval){
                     document.querySelector('.gutefy-section-wrapper').style.setProperty('--gutefy-icon-size', `${newval}px`);
              })
       })
       //preview icon wrapper size
       wp.customize(`${gutefy_namespace}icon_wrapper_size${gutefy_extensions_namespace}`,function(value){
              value.bind(function(newval){
                     document.querySelector('.gutefy-section-wrapper').style.setProperty('--gutefy-icon-wrapper-size', `${newval}px`);
              })
       })
