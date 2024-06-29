/** @format */

import { Panel, PanelBody } from '@wordpress/components'
import { Fragment} from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import { SocialRepeateater } from './socialRepeateater'
import ToggleController from './toggleController.jsx'


// const { api } = wp;
export function GeneralSettings({ control }) {
    
    return (
        <Fragment>
            <div className='gf-social-icons__main-wrapper'>
                <Panel>
                    <PanelBody title={__('Control Your Accounts', 'gf-social-icons')} icon='user'>
                        {<SocialRepeateater control={control} />}
                    </PanelBody>
                    <PanelBody title={__('Additional Settings', 'gf-social-icons')} icon='user'>
                        <ToggleController/>
                    </PanelBody>
                </Panel>
            </div>
        </Fragment>
    )
}
