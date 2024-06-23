// import 
import './customizer.scss';
import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { StyleSettings } from './components/style-settings/styleSettings';
import { GeneralSettingsControl } from './components/general-settings';


// global varialbe 
const { customize } = wp;

const { controlConstructor } = wp.customize;

controlConstructor.gf_social_icons__general_control_type = GeneralSettingsControl;

customize.bind('ready', function () {

    //Render Style Settings 
    const styleSettingsDom = document.getElementById('gf_social_icons__style-control-wrapper');
    if (styleSettingsDom) {

        const root = createRoot(
            styleSettingsDom
        );
        root.render(<StyleSettings />)
    }
});

