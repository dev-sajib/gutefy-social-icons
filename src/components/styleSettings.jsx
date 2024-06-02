import {
    Panel,
    PanelBody,
    Placeholder,
    SelectControl,
    Spinner,
    ColorPalette,
} from '@wordpress/components';
import {
    Fragment,
    Component,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
const { customize } = wp;


const { api } = wp;

export class StyleSettings extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            hoverStyleControl: '',
            IconColor: '#000',
            isAPILoaded: false,
        };
    }

    componentDidMount() {

        api.loadPromise.then(() => {
            this.settings = new api.models.Settings();
            const { isAPILoaded } = this.state;

            if (isAPILoaded === false) {
                this.settings.fetch().then((response) => {
                    this.setState({
                        hoverStyleControl: GfSocialIconsSettings["styleSettings"].hoverStyleControl,
                        IconColor: GfSocialIconsSettings["styleSettings"].IconColor,
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

