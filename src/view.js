import './view.scss'
import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const { customize } = wp;
const gfSocialIconsPreviewControl = () => {

    //Render Style Settings 
    const styleSettingsDom = document.getElementById('gf_social_icons__wrapper');
    if (styleSettingsDom) {

        const root = createRoot(
            styleSettingsDom
        );
        root.render(<h1>hello</h1>)
    }
}

window.addEventListener('load', function () {
    gfSocialIconsPreviewControl();
})
