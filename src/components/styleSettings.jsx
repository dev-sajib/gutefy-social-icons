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
export class StyleSettings extends Component {
    constructor() {
        super(...arguments)

        this.state = {
            hoverStyleControl: '',
            IconColor: '#ffffff',
            IconWrapperColor: '#000000',
            IconHoverColor: '#F5AD3C',
            IconWrapperHoverColor: '#086A61',
            isAPILoaded: false,
        }
    }

    componentDidMount() {
        api.loadPromise.then(() => {
            this.settings = new api.models.Settings()
            const { isAPILoaded } = this.state

            if (isAPILoaded === false) {
                this.settings.fetch().then((response) => {
                    if (GfSocialIconsSettings['styleSettings']) {
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
                            isAPILoaded: true,
                        })
                    }
                })
            }
        })
    }

    render() {
        const { hoverStyleControl, IconColor, IconWrapperColor, IconHoverColor, IconWrapperHoverColor, isAPILoaded } = this.state

        if (!isAPILoaded) {
            return (
                <Placeholder>
                    <Spinner />
                </Placeholder>
            )
        }

        return (
            <Fragment>
                <div className='gf-block__main'>
                    <SelectControl
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
                    />
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
                                <PositioningControl label='Icon Position' />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            </Fragment>
        )
    }
}
