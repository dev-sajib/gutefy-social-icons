/** @format */

// dependency
const { customize } = wp
import { __ } from '@wordpress/i18n'
import { Fragment, Component } from '@wordpress/element'
import { Panel, PanelBody, Placeholder, Spinner, __experimentalBoxControl as BoxControl } from '@wordpress/components'

// internal dependency
import './../assets/css/styleSettings.scss'
import ColorControl from './colorControl'
import PositioningControl from './positioningControl'
import BorderBoxShadowControl from './borderBoxShadowControl'
import AdvUnitControl from './advUnitControl'
import Spacing from './spacing'

export default function StyleSettings() {
    // const [apiLoadingStatus, setApiLoadingStatus] = useState(false);
    function gfSocialIconsGetData(settings_id, dimentionalSettings = false) {
        let currentPosition = ''
        let value = '';
        if (dimentionalSettings) {
            currentPosition = gfSocialIconsGetData(settings_id)
            let positionType = ' right'
            switch (currentPosition) {
                case 'auto':
                    positionType = 'left'
                    break
                case '0%':
                    positionType = ' right'
                    break
                default:
                    positionType
            }

            return positionType
        }
        value =customize.settings.settings[`gf_social_icons_style_settings[styles][${settings_id}]`].value
        return (value);
    }

    return (
        <Fragment>
        <div className='gf-social-icons__main-wrapper'>
            <Panel>
                <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Color Settings', 'gf-social-icons')} icon=''>
                    <div className='gf-social-icons-panel__body_wrapper'>
                        <ColorControl label={'Icon Color'} value={gfSocialIconsGetData('--gutefy-icon-color')} targetedSelector={'--gutefy-icon-color'} />

                        <ColorControl label={'Wrapper Background'} value={gfSocialIconsGetData('--gutefy-icon-wrapper-color')} targetedSelector={'--gutefy-icon-wrapper-color'} />
                    </div>
                    <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Hover Color', 'gf-social-icons')} icon=''>
                        <div className='gf-social-icons-panel__body_wrapper'>
                            <ColorControl label={'Icon Color'} value={gfSocialIconsGetData('--gutefy-icon-hover-color')} targetedSelector={'--gutefy-icon-hover-color'} />
                            <ColorControl label={'Wrapper Background'} value={gfSocialIconsGetData('--gutefy-icon-wrapper-hover-color')} targetedSelector={'--gutefy-icon-wrapper-hover-color'} />
                        </div>
                    </PanelBody>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Positioning & Size Settings', 'gf-social-icons')} icon=''>
                    <div className='gf-social-icons-panel__body_wrapper'>
                        <PositioningControl label='Icon Position' value={gfSocialIconsGetData('--gutefy-icon-wrapper-position-right',true)} verticalValue={gfSocialIconsGetData('--gutefy-icon-wrapper-position-top')} />
                    </div>
                    <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Size', 'gf-social-icons')} icon=''>
                        <div className='gf-social-icons-panel__body_wrapper '>
                            <AdvUnitControl label={'Icon Size'} targetSelector={'--gutefy-icon-size'} value={gfSocialIconsGetData('--gutefy-icon-size')} />
                            <AdvUnitControl label={'Icon Wrapper Size'} targetSelector={'--gutefy-icon-wrapper-size'} value={gfSocialIconsGetData('--gutefy-icon-wrapper-size')} />
                        </div>
                    </PanelBody>
                </PanelBody>
            </Panel>

            <Panel>
                <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Border', 'gf-social-icons')} icon=''>
                    <div className='gf-social-icons-panel__body_wrapper'>
                        <BorderBoxShadowControl targetSelector={'#gf_social_icons_wrapper a'} value={gfSocialIconsGetData('gutefy_icon_wrapper_border')[1]} />
                    </div>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Spaching', 'gf-social-icons')} icon=''>
                    <div className='gf-social-icons-panel__body_wrapper'>
                        <Spacing value={gfSocialIconsGetData('--gutefy-icon-wrapper-gap')} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    </Fragment>
    )
}
