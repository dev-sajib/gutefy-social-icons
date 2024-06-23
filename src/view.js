// import dependencies 
import React from 'react'
import { __ } from '@wordpress/i18n';
import { createRoot } from '@wordpress/element';

// import internal dependencies
import './view.scss'
import { fontIcons } from './fontAwsomeIcon';
import AccountGenerate from './components/general-settings/accountGenerate';


function App() {
    // get data from the db 
    const accountsUrl = GfSocialIconsSettings['generalSettings']
    const styleSettings = GfSocialIconsSettings['styleSettings']['styles'];


    function removeEmptyValues(obj) {
        return Object.fromEntries(
            Object.entries(obj)
                .filter(([key, value]) => {
                    // Check for empty values
                    return value !== null &&
                        value !== undefined &&
                        value !== '' &&
                        !(Array.isArray(value) && value.length === 0) &&
                        !(value.constructor === Object && Object.keys(value).length === 0);
                })
        );
    }

    // generate style from the style object 
    const generateStyle = () => {
        let styleMarkup = ''
        if (typeof styleSettings === 'object' && styleSettings !== null) {

            let filteredStyle = removeEmptyValues(styleSettings);
            styleMarkup = Object.entries(filteredStyle).map(([key, value]) => {
                return `${key}:${value}`;
            }).join('; ');
        }
        return styleMarkup
    }

    return (
        <div className="gutefy-section-wrapper" >
            <div className="gf_social_icons_social_float">
                <div id="gf_social_icons_social_icons_wrapper">
                    <AccountGenerate accountsUrl={accountsUrl} />
                </div>
            </div>
            <style type='text/css' className='gf-dynamic-style-sheet'>
                {`.gutefy-section-wrapper {
                    ${generateStyle()}}`}
            </style>
        </div>

    )
}


const gfSocialIconsPreviewControl = () => {

    //Render Style Settings 
    const styleSettingsDom = document.getElementById('gf_social_icons__wrapper');
    if (styleSettingsDom) {

        const styleSettingsRoot = createRoot(
            styleSettingsDom
        );
        styleSettingsRoot.render(
            <App />
        )
    }
}

window.addEventListener('load', function () {
    gfSocialIconsPreviewControl();

})
