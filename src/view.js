import './view.scss'
import React from 'react'
import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { fontIcons } from './fontAwsomeIcon';


const { customize } = wp;

function App() {
    const accountsUrl = GfSocialIconsSettings['generalSettings'].accountsUrl
    const styleSettings = GfSocialIconsSettings['styleSettings']['styles'];

    const generateStyle = () => {
        const styleMarkup = Object.keys(styleSettings).map((key, value) => {
            return `${key}:${value}`;
        }).join('; ');

        return styleMarkup
    }
    const styles = `.gutefy-section-wrapper {
                    ${generateStyle()}}`;

    // Add the CSS variable to the DOM
    const addStylesToDom = () => {
        const styleSheet = document.createElement("style");
        styleSheet.className = 'gf-dynamic-style-sheet'
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.querySelector('.gutefy-section-wrapper').parentElement.appendChild(styleSheet);
    };

    React.useEffect(() => {
        addStylesToDom();
    }, []);

    return (
        <div className="gutefy-section-wrapper style-two" >
            <div className="gf_social_icons_social_float">
                {
                    accountsUrl.map(
                        e => <a href={e[1]} className="gf_social_icons_social_icon"  >{(fontIcons[e[0]].icon) ? fontIcons[e[0]].icon : fontIcons[e[0]].icon}</a>
                    )
                }
            </div>
        </div>

    )
}


const gfSocialIconsPreviewControl = () => {

    //Render Style Settings 
    const styleSettingsDom = document.getElementById('gf_social_icons__wrapper');
    if (styleSettingsDom) {

        const root = createRoot(
            styleSettingsDom
        );
        root.render(
            <>
                <App />
            </>

        )
    }
}

window.addEventListener('load', function () {
    gfSocialIconsPreviewControl();
})
