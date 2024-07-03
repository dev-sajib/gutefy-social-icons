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
    const openInNewTab = GfSocialIconsSettings['openInNewTab'];
    // console.log('I am from view page',GfSocialIconsSettings);
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
        let singleDimentionStyle = ''
        let multiDimentionStyle = ''
        if (typeof styleSettings === 'object' && styleSettings !== null) {

            let filteredStyle = removeEmptyValues(styleSettings);

            Object.entries(filteredStyle).map(([key, value]) => {
                if (typeof value == 'string') {
                    singleDimentionStyle += `${key} : ${value} ; `
                }
                if (typeof value == 'object') {
                    multiDimentionStyle = ''
                    
                    if (typeof value[1] == 'object') { 
                        let concatenedStyleValue='';
                        Object.entries(value[1]).map(([key, value]) => {
                            if (typeof value == 'object') {
                                multiDimentionStyle += `border-${key}: ${Object.entries(value).map(([key, value]) => value ? value : '').join(' ')} ;`
                            }
                            else {
                                concatenedStyleValue += `${value?value:''} `
                            }
                        })
                        if (concatenedStyleValue != '') {
                            multiDimentionStyle = `border:${ concatenedStyleValue }`;
                        }
                    }


                    multiDimentionStyle = `${value[0]} {${multiDimentionStyle}}`
                }
            })
            return ` ${multiDimentionStyle}  .gutefy-section-wrapper {${singleDimentionStyle}}`
        }
    }

    return (
        <div className="gutefy-section-wrapper" >
            <div className="gf_social_icons_social_float">
                <div id="gf_social_icons_wrapper">
                    <AccountGenerate accountsUrl={accountsUrl} openInNewTab={openInNewTab} />
                </div>
            </div>
            <style type='text/css' className='gf-social-icons-dynamic-style-sheet'>
                {/* {`.gutefy-section-wrapper {
                    ${generateStyle()}}`} */}
                {generateStyle()};
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
