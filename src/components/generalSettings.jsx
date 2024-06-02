import {
    Panel,
    PanelBody,
    Placeholder,
    __experimentalInputControl as InputControl,
    Spinner,
} from '@wordpress/components';
import {
    Fragment,
    Component,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { SocialRepeateater } from './socialRepeateater';
const { customize } = wp;


const { api } = wp;

export class GeneralSettings extends Component {

    constructor() {
        super(...arguments);

        this.state = {
            accountsUrl: [['facebook', 'facebook.com']],
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
                        accountsUrl: (GfSocialIconsSettings["generalSettings"].accountsUrl) || this.state.accountsUrl,
                        isAPILoaded: true,
                    });
                });
            }
        });
    }

    render() {
        const {
            accountsUrl,
            isAPILoaded,
        } = this.state;

        if (!isAPILoaded) {
            return (
                <Placeholder>
                    <Spinner />
                </Placeholder>
            );
        }
        console.log(this.state);
        return (
            <Fragment>
                <div className="gf-block__main">
                    <Panel>
                        <PanelBody
                            title={__('Control Your Accounts', 'gf-social-icons')}
                            icon="user"
                        >
                            {
                                <SocialRepeateater
                                    accountsUrl={accountsUrl}
                                />
                            }

                        </PanelBody>
                    </Panel>
                </div>
            </Fragment>
        )
    }
}

