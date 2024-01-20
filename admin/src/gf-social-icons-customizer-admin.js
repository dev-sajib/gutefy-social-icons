const gutefy_namespace = 'gutefy_settings_';
const gutefy_extensions_namespace = '_social_icon';



       wp.customize( `${gutefy_namespace}color${gutefy_extensions_namespace}`, function( value ) {
              value.bind( function( newval ) {
                     document.querySelector('.gutefy-section-wrapper').style.setProperty('--gutefy-secondary-color', newval);
              } );
       } );
