/** @format */

// dependency
const { api, customize } = wp
import { __ } from '@wordpress/i18n'
import { Fragment, Component } from '@wordpress/element'
import { Panel, PanelBody, Placeholder, SelectControl, Spinner, ColorPalette } from '@wordpress/components'

// internal dependency
import './assets/css/styleSettings.scss'
import ColorControl from './colorControl'
import PositioningControl from './positioningControl'
import BorderBoxShadowControl from './borderBoxShadowControl'
export class StyleSettings extends Component {
    constructor() {
        super(...arguments)

        this.state = {
            hoverStyleControl: '',
            IconColor: '#ffffff',
            IconWrapperColor: '#000000',
            IconHoverColor: '#F5AD3C',
            IconWrapperHoverColor: '#086A61',
            IconPosition: ' right',
            IconPositionTop: '40%',
            isAPILoaded: false,

        }
    }
    getPosition(GfSocialIconsSettings) {
        const currentPosition = GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-position-right']
            ? GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-position-right']
            : this.state.IconPosition

        console.log(typeof currentPosition)
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
        console.log('positionType', positionType)
        return positionType
    }
    componentDidMount() {
        api.loadPromise.then(() => {
            this.settings = new api.models.Settings()
            const { isAPILoaded } = this.state

            if (isAPILoaded === false) {
                this.settings.fetch().then((response) => {
                    if (GfSocialIconsSettings['styleSettings']) {
                        let IconPosition = this.getPosition(GfSocialIconsSettings)

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
                            IconPositionTop:GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-position-top']
                            ? GfSocialIconsSettings['styleSettings'].styles['--gutefy-icon-wrapper-position-top']
                            : this.state.IconPositionTop,

                            isAPILoaded: true,
                        })
                        console.log('hey', this.state)
                    }
                })
            }
        })
    }

    render() {
        const { 
            hoverStyleControl, IconColor, IconWrapperColor, IconHoverColor, IconWrapperHoverColor, isAPILoaded, IconPosition, IconPositionTop 
        } = this.state

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
                    {/* <SelectControl
                        help={__('Hover style for your icons', 'gf-social-icons')}
                        label={__('Select Hover Style', 'gf-social-icons')}
                        onChange={(hoverStyleControl) => {
                            this.setState({ hoverStyleControl })
                            customize.value('gf_social_icons_style_settings[hoverStyleControl]')(hoverStyleControl)
                        }}
                        options={[
                            {
                                label: __('Please Select...', 'gf-social-icons'),
                                value: '',
                            },
                            {
                                label: __('Style 1', 'gf-social-icons'),
                                value: 'style-1',
                            },
                            {
                                label: __('Style 2', 'gf-social-icons'),
                                value: 'style-2',
                            },
                        ]}
                        value={hoverStyleControl}
                    /> */}
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
                    <Panel >
                        <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Positioning & Size Settings', 'gf-social-icons')} icon=''>
                            <div className='gf-social-icons-panel__body_wrapper'>
                                <PositioningControl label='Icon Position' value={IconPosition} verticalValue= {IconPositionTop} />
                            </div>
                        </PanelBody>
                    </Panel>
                    <Panel >
                        <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Border & BoxShadow', 'gf-social-icons')} icon=''>
                            <div className='gf-social-icons-panel__body_wrapper'>
                                <BorderBoxShadowControl/>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            </Fragment>
        )
    }
}
