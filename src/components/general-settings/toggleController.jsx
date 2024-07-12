/** @format */
import { ToggleControl } from '@wordpress/components'
import { useState } from '@wordpress/element'

const  {customize} = wp

export default function ToggleController({title}) {
    
    const getNewTabStatus = customize.settings.settings.gf_social_icons_open_in_new_tab_settings.value
    const [newTabStatus, setNewTabStatue] = useState(getNewTabStatus)
    //console.log('😓',newTabStatus)

    return (
        <ToggleControl
            label={title}
            checked={newTabStatus}
            onChange={(newValue) => {
                setNewTabStatue(newValue);
                customize.value(`gf_social_icons_open_in_new_tab_settings`)(newValue)
            }}
        />
    )
}
