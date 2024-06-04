import './view.scss'
import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { fontIcons } from './fontAwsomeIcon';


const { customize } = wp;

function App() {
    const accountsUrl = GfSocialIconsSettings['generalSettings'].accountsUrl
    
    return (
        <div className="gutefy-section-wrapper style-two">
            <div className="gf_social_icons_social_float">
                {
                    accountsUrl.map(
                        e=><a href={e[1]} className="gf_social_icons_social_icon"  >{(fontIcons[e[0]].icon)?fontIcons[e[0]].icon:fontIcons[0].icon}</a>
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
                <h1>hello</h1>
                <App />
            </>

        )
    }
}

window.addEventListener('load', function () {
    gfSocialIconsPreviewControl();
})
