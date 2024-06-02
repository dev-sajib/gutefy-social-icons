// import 
import './customizer.scss';
import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { StyleSettings } from './components/styleSettings';
import { GeneralSettings } from './components/generalSettings';

// global varialbe 
const { customize } = wp;

const addSectionAndControl = (title, panelKey = 'gf_social_icons__customizer-panel', sectionKey, customize, controllerType) => {
    customize.section.add(
        new customize.Section(sectionKey, {
            customizeAction: __(`Gutefy Social Icons ▸ ${title}`, 'gf-social-icons'),
            panel: panelKey,
            title: __(title, 'gf-social-icons'),
        })
    )
    customize.control.add(
        new customize.Control(`gf_social_icons__${title.toLowerCase().replace(/\s+/g, '-')}-control`, {
            section: sectionKey,
            type: controllerType,
        })
    )
}
customize.bind('ready', function () {
    const panelKey = 'gf_social_icons__customizer-panel';

    customize.panel.add(
        new customize.Panel(panelKey, {
            description: __('Social Icons Style Settings', 'gf-social-icons'),
            priority: 1000,
            title: __('Gutefy Social Icons', 'gf-social-icons'),
        })

    );

    //General Settings Sections
    addSectionAndControl('General Settings', panelKey, 'gf_social_icons__general-section', customize, 'gf-social-icons-general-control')

    //Section Style Settings
    addSectionAndControl('Style Settings', panelKey, 'gf_social_icons__style-section', customize, 'gf-social-icons-style-control')


    //Render Style Settings 
    const GeneralSettingsDom = document.getElementById('gf_social_icons__general-control-wrapper');
    if (GeneralSettingsDom) {

        const GeneralSettingsDomRoot = createRoot(
            GeneralSettingsDom
        );
        GeneralSettingsDomRoot.render(<GeneralSettings />)
    }

    //Render Style Settings 
    const styleSettingsDom = document.getElementById('gf_social_icons__style-control-wrapper');
    if (styleSettingsDom) {

        const root = createRoot(
            styleSettingsDom
        );
        root.render(<StyleSettings />)
    }
});
