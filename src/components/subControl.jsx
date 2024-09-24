/** @format */
import { ToggleControl } from '@wordpress/components'
import { Fragment, useState } from '@wordpress/element'
import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import Tooltip from './tooltip/tooltip'

import { StyleGenerator } from './styleGenerator'

export function ResponsiveToggle({ handleChange,value,device,getDeviceValue,label }) {
    // console.log(getDeviceValue(value, device));
    return (
        <>
            <div>
                <div id='gf-social-icons-controller-wrapper' className='gf-social-icons-inline-settings-wrapper'>
                    <label className='gf-social-icons-settings-label' htmlFor=''>
                        {label}
                    </label>
                    <Tooltip text={device}>
                        <ToggleControl
                            data-device={device}
                            onChange={ handleChange }
                            checked={getDeviceValue(value, device)}
                        />
                    </Tooltip>

                    <StyleGenerator />
                </div>
            </div>
            <StyleGenerator />
        </>
    )
}
export function WithoutResponsiveToggle({ control }) {
    //State Declearation
    const [value, setValue] = useState(control.settings.default())

    const handleChange = (newValue) => {
        let _newValue = {
            ...control.settings.default(),
            value: newValue,
        }

        setValue(_newValue)
        control.setting.set(_newValue)
    }
    return (
        <>
            <div>
                <div id='gf-social-icons-controller-wrapper' className='gf-social-icons-inline-settings-wrapper'>
                    <label className='gf-social-icons-settings-label' htmlFor=''>
                        {control.params.label}
                    </label>
                    <ToggleControl onChange={(newValue) => handleChange(newValue)} checked={value['value']} />
                    <StyleGenerator />
                </div>
            </div>
            <StyleGenerator />
        </>
    )
}

export function ResponsiveUnitControl({ handleChange,value,device,getDeviceValue,label }) {
    
    return (
        <div className=''>
            <div id='gf-social-icons-toggle-button-wrapper' className='gf-social-icons-inline-settings-wrapper'>
                <label className='gf-social-icons-settings-label' htmlFor=''>
                    {label}
                </label>
                <Tooltip text={device}>
                    <UnitControl
                        style={{ width: '80px' }}
                        data-device={device}
                        value={getDeviceValue(value, device)}
                        // onChange={(newValue) => handleChange({ ...value['values'][0]['value'], [device]: newValue })}
                        onChange={handleChange}
                    />
                </Tooltip>
                <StyleGenerator />
            </div>
        </div>
    )
}

