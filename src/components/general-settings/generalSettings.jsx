/** @format */

import { Panel, PanelBody } from '@wordpress/components'
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import { SocialRepeateater } from './socialRepeateater'
import ToggleController from './toggleController.jsx'

// const { api } = wp;
export function GeneralSettings({ control }) {
    return (
        <Fragment>
            <div className='gf-social-icons__main-wrapper'>
                <Panel>
                    <PanelBody className='gf-social-icons-panel__body' title={__('Control Your Accounts', 'gf-social-icons')} icon='user'>
                        <div className='gf-social-icons-panel__body_wrapper'>
                            <SocialRepeateater control={control} />
                        </div>
                    </PanelBody>
                </Panel>

                <Panel>
                    <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Aditional Settings', 'gf-social-icons')} icon=''>
                        <div className='gf-social-icons-panel__body_wrapper'>
                            <ToggleController title='Open in new tab' />
                        </div>
                        {/* <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Responsive Settings', 'gf-social-icons')} icon=''>
                            <div className='gf-social-icons-panel__body_wrapper '>
                                <ToggleController title='Disable in Mobile' />
                            </div>
                        </PanelBody> */}
                    </PanelBody>
                </Panel>
            </div>
        </Fragment>
    )
}
