/** @format */
import { ToggleControl } from '@wordpress/components'
import { useState } from '@wordpress/element'
import { Panel, PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import Tooltip from './tooltip/tooltip'

import { StyleGenerator } from './styleGenerator'

export function ResponsiveToggle({ control }) {
    //Declear Variables
    let preValue = ''
    const devices = ['desktop', 'tablet', 'mobile']

    // Map Previous Value
    if (control.settings.default()['css_selector']) {
        preValue = control.settings.default()
    } else {
        preValue = typeof control.settings.default() === 'object' && {
            css_selector: control.params.input_attrs.css_selector,
            values: control.settings.default(),
        }
    }

    //State Declearation
    const [value, setValue] = useState(preValue)
    const [device, setDevice] = useState('desktop')

    //Handle Changes
    const handleChange = (newValue) => {
        let property = value.values[0].css_attr
        let targetedCSSAttr = { ...value['values'].filter((e) => e['css_attr'] == property)[0], value: newValue }

        newValue = value['values'].map((item) => (item.css_attr === property ? targetedCSSAttr : item))

        setValue((prevValue) => ({
            ...prevValue,
            values: newValue,
        }))
    }
    //Sync With customizer responsive button
    const linkResponsiveButtonWithCustomizerFooterButton = () => {
        Array.from(document.querySelectorAll('#customize-footer-actions .devices button')).map((e) =>
            e.addEventListener('click', () => {
                setDevice(wp.customize.previewedDevice.get())
            })
        )
    }

    //getValue
    function getDeviceValue(value, device) {
        // Define the order of devices based on priority (mobile -> tablet -> desktop)
        const devices = ['mobile', 'tablet', 'desktop']

        // Get the index of the required device in the priority list
        const deviceIndex = devices.indexOf(device)

        // Start checking from the current device and fallback to previous ones if not available
        for (let i = deviceIndex; i < devices.length; i++) {
            const currentDevice = devices[i]
            const currentDeviceValue = value['values'][0]['value'][currentDevice]

            // Check if the key exists and is not null/undefined
            if (currentDeviceValue !== undefined && currentDeviceValue !== null) {
                return getKeyOrValue(currentDeviceValue) // Return if value is found
            }
        }

        // Return undefined or handle the case when no device value is available
        return undefined
    }

    //Handle Responsive changes
    const handleResponsive = (element) => {
        linkResponsiveButtonWithCustomizerFooterButton()
        wp.customize.previewedDevice(element.target.dataset.device)
        setDevice(element.target.dataset.device)
    }
    function getKeyOrValue(input) {
        if (input !== undefined) {
            input = String(input)

            // Check if the input is a key
            if (control.settings.default()['values'][0].toggleValue.hasOwnProperty(input)) {
                return control.settings.default()['values'][0].toggleValue[input] // Return the value if input is a key
            }

            // If input is not a key, find the key for the input value
            const foundKey = Object.entries(control.settings.default()['values'][0].toggleValue).find(([key, value]) => value === input)?.[0]

            if (foundKey === 'false') {
                return false
            }

            return true
        }
        return input
    }
    // Essiantial function which call with every render
    const selfExecuteFunction = () => {
        linkResponsiveButtonWithCustomizerFooterButton()
        control.setting.set(value)
    }
    selfExecuteFunction()

    return (
        <>
            <header className='gf-social-icons-settings-title-wrapper'>
                <label className='gf-social-icons-settings-label' htmlFor=''></label>
                <ul className='gf-social-icons-responsive-controls gf-social-icons-devices'>
                    {devices.map((item, index) => (
                        <li
                            key={index}
                            data-device={item}
                            onClick={(element) => {
                                handleResponsive(element)
                            }}
                            className={`gf-social-icons-${item} ${item == device ? 'active' : ''} `}
                        ></li>
                    ))}
                </ul>
            </header>

            <div>
                <div id='gf-social-icons-controller-wrapper' className='gf-social-icons-inline-settings-wrapper'>
                    <label className='gf-social-icons-settings-label' htmlFor=''>
                        {control.params.label}
                    </label>
                    <Tooltip text={device}>
                        <ToggleControl
                            data-device={device}
                            onChange={(newValue) =>
                                handleChange({
                                    ...value['values'][0]['value'],
                                    [device]: getKeyOrValue(newValue),
                                })
                            }
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
