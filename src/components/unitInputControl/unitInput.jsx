/** @format */

//Import Global Dependency
import { useState } from 'react'
import { __experimentalUnitControl as UnitControl } from '@wordpress/components'

import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { StyleGenerator } from '../styleGenerator'
import Tooltip from '../tooltip/tooltip'
import { width } from '@fortawesome/free-solid-svg-icons/fa0'

export function UnitInput({ control }) {
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

    const handleChange = (newValue) => {
        let property = value.values[0].css_attr
        let targetedCSSAttr = { ...value['values'].filter((e) => e['css_attr'] == property)[0], value: newValue }

        newValue = value['values'].map((item) => (item.css_attr === property ? targetedCSSAttr : item))

        setValue((prevValue) => ({
            ...prevValue,
            values: newValue,
        }))
    }
    const selfExecuteFunction = () => {
        linkResponsiveButtonWithCustomizerFooterButton()

        control.setting.set(value)
    }
    const handleResponsive = (element) => {
        wp.customize.previewedDevice(element.target.dataset.device)
        Array.from(document.querySelectorAll(`.${element.target.className}`)).map((e) => e.click())
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
    return (
        <Fragment>
            <div
                className={`gf-blog-panel__body_wrapper ${control.params.input_attrs.classes ? control.params.input_attrs.classes : ''} ${
                    control.params.input_attrs.control_for ? control.params.input_attrs.control_for : ''
                }`}
                style={conditionally_display() ? { display: 'none' } : { display: 'block' }}
            >
                {/* <header className='gf-social-icon-settings-title-wrapper'>
                    <label className='gf-blog-settings-label' htmlFor=''>
                        {control.params.label}
                    </label>
                    <ul className='gf-blog-responsive-controls gf-blog-devices'>
                        {devices.map((item, index) => (
                            <li
                                key={index}
                                data-device={item}
                                onClick={(element) => {
                                    handleResponsive(element)
                                }}
                                className={`gf-blog-${item} ${item == device ? 'active' : ''} `}
                            ></li>
                        ))}
                    </ul>
                </header> */}
                <div className=''>
                    <div id='gf-social-icons-toggle-button-wrapper' className='gf-social-icons-inline-settings-wrapper'>
                        <label className='gf-social-icons-settings-label' htmlFor=''>
                            {control.params.label}
                        </label>
                        <Tooltip text={device}>
                            <UnitControl style={{width:'80px'}} data-device={device} value={getDeviceValue(value, device)} onChange={(newValue) => handleChange({ ...value['values'][0]['value'], [device]: newValue })} />
                        </Tooltip>
                        <StyleGenerator />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
