import './customizer.scss';

const { api } = wp;

import {
    Panel,
    PanelBody,
    Placeholder,
    SelectControl,
    Spinner,
    ColorPalette,
    ToggleControl,
} from '@wordpress/components';

import {
    Fragment,
    createRoot,
    Component,
} from '@wordpress/element';

import { __ } from '@wordpress/i18n';

const { customize } = wp;


class App extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            hoverStyleControl: '',
            IconColor:'#000',
            isAPILoaded: false,
        };
    }

    componentDidMount() {

        api.loadPromise.then(() => {
            this.settings = new api.models.Settings();
            const { isAPILoaded } = this.state;

            if (isAPILoaded === false) {
                this.settings.fetch().then((response) => {
                    console.log('res', GfSocialIconsSettings.hoverStyleControl)
                    console.log('state', response)
                    this.setState({
                        hoverStyleControl: GfSocialIconsSettings.hoverStyleControl,
                        IconColor: GfSocialIconsSettings.IconColor,
                        isAPILoaded: true,
                    });
                });
            }
        });
    }

    render() {
        const {
            hoverStyleControl,
            IconColor,
            isAPILoaded,
        } = this.state;

        if (!isAPILoaded) {
            return (
                <Placeholder>
                    <Spinner />
                </Placeholder>
            );
        }

        return (
            <Fragment>
                <div className="gf-block__main">
                    <Panel>
                        <PanelBody
                            title={__('Panel Body One', 'gf-social-icons')}
                            icon="admin-plugins"
                        >
                            <SelectControl
                                help={__('Hover style for your icons', 'gf-social-icons')}
                                label={__('Select Hover Style', 'gf-social-icons')}
                                onChange={(hoverStyleControl) => {
                                    this.setState({ hoverStyleControl });
                                    customize.value('gf_social_icons_style_settings[hoverStyleControl]')(hoverStyleControl);
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
                            <ColorPalette
                                onChange={(IconColor) => {
                                    this.setState({ IconColor });
                                    customize.value('gf_social_icons_style_settings[IconColor]')(IconColor);
                                }}
                                enableAlpha
                                value={IconColor}
                            />
                        </PanelBody>
                    </Panel>
                </div>
            </Fragment>
        )
    }
}


customize.bind('ready', function () {
    const panelKey = 'gf_social_icons__customizer-panel';
    const sectionKey = 'gf_social_icons__customizer-section';

    customize.panel.add(
        new customize.Panel(panelKey, {
            description: __('Social Icons Style Settings', 'gf-social-icons'),
            priority: 1000,
            title: __('Gutefy Social Icons', 'gf-social-icons'),
        })
    );
    customize.section.add(
        new customize.Section(sectionKey, {
            customizeAction: __('Gf Block ▸ Section', 'gf-social-icons'),
            panel: panelKey,
            title: __('Style Settings', 'gf-social-icons'),
        })
    );


    customize.control.add(
        new customize.Control('gf_social_icons__style-settings-control', {
            section: sectionKey,
            type: 'gf-social-icons-style-control',
        })
    );

    const htmlOutput = document.getElementById('gf_social_icons__style-control-wrapper');
    if (htmlOutput) {

        const root = createRoot(
            htmlOutput
        );
        root.render(<App />)
    }
});
