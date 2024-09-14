/** @format */
import { ResponsiveToggle, WithoutResponsiveToggle } from '../subControl'
import { __ } from '@wordpress/i18n'

export default function Toggle({ control }) {
    
    return (
        <>
            {/* <Panel> */}
                {/* <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Aditional Settings', 'gf-social-icons')} icon=''> */}
                    <div>
                        {control.params.input_attrs.responsive ? (
                            <ResponsiveToggle control={control} />
                        ) : (
                            <WithoutResponsiveToggle control={control} />
                        )}
            </div>
            
                {/* </PanelBody> */}
            {/* </Panel> */}
        </>
    )
}
