/** @format */

// dependency
const { api, customize } = wp
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
export class StyleSettings extends Component {
    constructor() {
        console.log('skfksf')
        super(...arguments)

        this.state = {
            hoverStyleControl: '',
            IconColor: '#ffffff',
            IconWrapperColor: '#000000',
            IconHoverColor: '#F5AD3C',
            IconWrapperHoverColor: '#086A61',
            IconPosition: ' right',
            IconPositionTop: '40%',
            IconSize: '12px',
            IconWrapperSize: '44px',
            isAPILoaded: false,
            IconWrapperBorder: {
                color: '#72aee6',
                style: 'solid',
                width: '1px',
            },
        }
    }
    getPosition(GfSocialIconsSettings) {
        const currentPosition = GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-position-right']
            ? GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-position-right']
            : this.state.IconPosition

        //console.log('currentPosition',typeof currentPosition);
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
    componentDidMount() {
        api.loadPromise.then(() => {
            this.settings = new api.models.Settings()
            const { isAPILoaded } = this.state

            if (isAPILoaded === false) {
                this.settings.fetch().then((response) => {
                    //console.log('fetch',response);
                    if (GfSocialIconsSettings['styleSettings']) {
                        let IconPosition = this.getPosition(GfSocialIconsSettings)
                        //console.log("hey..", this.state);

                        this.setState({
                            IconColor: GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-color']
                                ? GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-color']
                                : this.state.IconColor,
                            IconWrapperColor: GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-color']
                                ? GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-color']
                                : this.state.IconWrapperColor,
                            IconHoverColor: GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-hover-color']
                                ? GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-hover-color']
                                : this.state.IconHoverColor,
                            IconWrapperHoverColor: GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-hover-color']
                                ? GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-hover-color']
                                : this.state.IconWrapperHoverColor,
                            IconPosition: IconPosition,
                            IconPositionTop: GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-position-top']
                                ? GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-position-top']
                                : this.state.IconPositionTop,
                            IconSize: GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-size'] ? GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-size'] : this.state.IconSize,
                            IconWrapperSize: GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-size']
                                ? GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-size']
                                : this.state.IconWrapperSize,

                            
                                IconWrapperBorder: GfSocialIconsSettings['styleSettings'].styles['gutefy_icon_wrapper_border']
                                ? GfSocialIconsSettings['styleSettings'].styles['gutefy_icon_wrapper_border'][1]
                                : this.state.IconWrapperBorder,

                            isAPILoaded: true,
                        })
                    } else {
                        this.setState({
                            isAPILoaded: true,
                        })
                    }
                })
            }
        })
    }

    render() {
        const { hoverStyleControl, IconColor, IconWrapperColor, IconHoverColor, IconWrapperHoverColor, isAPILoaded, IconPosition, IconPositionTop, IconSize, IconWrapperSize,IconWrapperBorder } = this.state

        if (!isAPILoaded) {
            return (
                <Placeholder>
                    <Spinner />
                </Placeholder>
            )
        }

        return (
            <Fragment>
                <div className='gf-social-icons__main-wrapper'>
                    <Panel>
                        <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Color Settings', 'gf-social-icons')} icon=''>
                            <div className='gf-social-icons-panel__body_wrapper'>
                                <ColorControl label={'Icon Color'} value={IconColor} targetedSelector={'--gutefy-icon-color'} />

                                <ColorControl label={'Wrapper Background'} value={IconWrapperColor} targetedSelector={'--gutefy-icon-wrapper-color'} />
                            </div>
                            <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Hover Style', 'gf-social-icons')} icon=''>
                                <div className='gf-social-icons-panel__body_wrapper'>
                                    <ColorControl label={'Icon Color'} value={IconHoverColor} targetedSelector={'--gutefy-icon-hover-color'} />
                                    <ColorControl label={'Wrapper Background'} value={IconWrapperHoverColor} targetedSelector={'--gutefy-icon-wrapper-hover-color'} />
                                </div>
                            </PanelBody>
                        </PanelBody>
                    </Panel>
                    <Panel>
                        <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Positioning & Size Settings', 'gf-social-icons')} icon=''>
                            <div className='gf-social-icons-panel__body_wrapper'>
                                <PositioningControl label='Icon Position' value={IconPosition} verticalValue={IconPositionTop} />
                            </div>
                            <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Size', 'gf-social-icons')} icon=''>
                                <div className='gf-social-icons-panel__body_wrapper '>
                                    <AdvUnitControl label={'Icon Size'} targetSelector={'--gutefy-icon-size'} value={IconSize} />
                                    <AdvUnitControl label={'Icon Wrapper Size'} targetSelector={'--gutefy-icon-wrapper-size'} value={IconWrapperSize} />
                                </div>
                            </PanelBody>
                        </PanelBody>
                    </Panel>

                    <Panel>
                        <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Border & BoxShadow', 'gf-social-icons')} icon=''>
                            <div className='gf-social-icons-panel__body_wrapper'>
                                <BorderBoxShadowControl targetSelector={'#gf_social_icons_wrapper a'} value={IconWrapperBorder} />
                            </div>
                        </PanelBody>
                    </Panel>
                    <Panel>
                        <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Spaching', 'gf-social-icons')} icon=''>
                            <div className='gf-social-icons-panel__body_wrapper'>
                                <Spacing />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            </Fragment>
        )
    }
}
