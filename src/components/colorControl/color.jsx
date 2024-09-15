/** @format */

import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { Dropdown, Button, ColorPicker, ColorPalette } from '@wordpress/components'
import './colorStyle.scss'
import Tooltip from '../tooltip/tooltip'
// internal dependency
import { StyleGenerator } from '../styleGenerator'

export default function Color({ control }) {
    const [device, setDevice] = useState('desktop')
    let preValue = ''

    if (control.settings.default()['css_selector']) {
        preValue = control.settings.default()
    } else {
        preValue = typeof control.settings.default() === 'object' && {
            css_selector: control.params.input_attrs.css_selector,
            values: control.settings.default(),
        }
    }

    const [value, setValue] = useState(preValue)

    const devices = ['desktop', 'tablet', 'mobile']

    const handleChange = (newValue) => {
        let property = value.values[0].css_attr
        let targetedCSSAttr = { ...value['values'].filter((e) => e['css_attr'] == property)[0], value: newValue }

        newValue = value['values'].map((item) => (item.css_attr === property ? targetedCSSAttr : item))

        setValue((prevValue) => ({
            ...prevValue,
            values: newValue,
        }))
    }
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
                return currentDeviceValue // Return if value is found
            }
        }
    }
    const selfExecuteFunction = () => {
        linkResponsiveButtonWithCustomizerFooterButton()
        control.setting.set(value)
    }

    const handleResponsive = (element) => {
        wp.customize.previewedDevice(element.target.dataset.device)
        setDevice(element.target.dataset.device)
    }
    const linkResponsiveButtonWithCustomizerFooterButton = () => {
        Array.from(document.querySelectorAll('#customize-footer-actions .devices button')).map((e) =>
            e.addEventListener('click', () => {
                setDevice(wp.customize.previewedDevice.get())
            })
        )
    }
    const conditionally_display = () => {
        if (control.params.input_attrs.conditional_dependency) {
            const dependency_control_id = control.params.input_attrs.conditional_dependency
            const dependency_control_value = control.params.input_attrs.conditional_dependency_value
            const dependency_control_db_value = wp.customize.settings.settings[dependency_control_id].value

            if (dependency_control_db_value === dependency_control_value) {
                return false
            } else {
                return true
            }
        }
        return false
    }
    selfExecuteFunction()

    const colorPalette = [
        { name: '1', color: '#0D1B2A' },
        { name: '2', color: '#1B263B' },
        { name: '3', color: '#415A77' },
        { name: '5', color: '#F72585' },
        { name: '6', color: '#B5179E' },
        { name: '7', color: '#7209B7' },
        { name: '8', color: '#480CA8' },
        { name: '10', color: '#3F37C9' },
        { name: '11', color: '#4361EE' },
        { name: '12', color: '#4CC9F0' },
    ]

    // console.log('🔥', value['values'])

    return (
        <>
            <div
                className={`gf-social-icons-color-dropdown-controller ${control.params.input_attrs.classes ? control.params.input_attrs.classes : ''} ${
                    control.params.input_attrs.control_for ? control.params.input_attrs.control_for : ''
                }`}
                style={conditionally_display() ? { display: 'none' } : { display: 'block' }}
            >
                <header className='gf-social-icons-settings-title-wrapper'>
                    <label className='gf-social-icons-settings-label' htmlFor=''>
                        {control.params.label}
                    </label>
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
                    <div id='gf-social-icons-color-control-wrapper'>
                        <label className='gf-social-icons-settings-label' htmlFor=''>
                            {control.params.label}
                        </label>
                        <Dropdown
                            className='gf-social-icons-color-dropdown'
                            contentClassName='gf-social-icons-color-dropdown-content-wrapper'
                            popoverProps={{ placement: 'bottom-start' }}
                            renderToggle={({ isOpen, onToggle }) => (
                                <Tooltip text={device}>
                                    <Button style={{ backgroundColor: getDeviceValue(value, device) }} className='color-selector' variant='primary' onClick={onToggle} aria-expanded={isOpen}></Button>
                                </Tooltip>
                            )}
                            renderContent={() => {
                                return (
                                    <div>
                                        <ColorPicker
                                            data-device={device}
                                            color={value['values'][0]['value'][device]}
                                            onChange={(newValue) => handleChange({ ...value['values'][0]['value'], [device]: newValue })}
                                            enableAlpha
                                        />
                                        <ColorPalette
                                            colors={colorPalette}
                                            disableCustomColors={true}
                                            clearable={false}
                                            onChange={(newValue) => handleChange({ ...value['values'][0]['value'], [device]: newValue })}
                                            enableAlpha
                                        />
                                    </div>
                                )
                            }}
                        />
                        <StyleGenerator />
                    </div>
                </div>
            </div>
        </>
    )
}
