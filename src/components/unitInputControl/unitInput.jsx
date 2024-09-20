/** @format */

//Import Global Dependency
import { Fragment } from '@wordpress/element'
import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'
import { ResponsiveUnitControl } from '../subControl'

export function UnitInput({ control }) {
    // state control
    const [device, setDevice] = useState('desktop')
    const [value, setValue] = useState(control.settings.default())


    // console.log('value=>' ,value)
    //helper function
    function getDeviceValue(device_wise_value, device) {

        // console.log('get=>',device_wise_value)
        // Define the order of devices based on priority (mobile -> tablet -> desktop)
        const devices = ['mobile', 'tablet', 'desktop']

        // Get the index of the required device in the priority list
        const deviceIndex = devices.indexOf(device)

        // Start checking from the current device and fallback to previous ones if not available
        for (let i = deviceIndex; i < devices.length; i++) {
            const currentDevice = devices[i]
            const currentDeviceValue = device_wise_value[currentDevice]?device_wise_value[currentDevice]['value']:undefined

            // Check if the key exists and is not null/undefined
            if (currentDeviceValue !== undefined && currentDeviceValue !== null) {
                return currentDeviceValue // Return if value is found
            }
        }
    }
    // --------------------
    const handleChange = (newValue) => {

        
        let css_attr = value.device_wise_value[device]?.css_attr || value.device_wise_value['desktop'].css_attr

        let updatedDeviceWiseValue = {
            ...value.device_wise_value,
            [device] : {css_attr:css_attr, value: newValue}
        }
        // console.log('handleChange=>', updatedDeviceWiseValue);
        let updatedValue = {
            ...value,
            device_wise_value: updatedDeviceWiseValue
        }
        // console.log(updatedValue);

        setValue(updatedValue)

        control.setting.set({ ...updatedValue, id: Math.floor(Math.random() * 9000) + 100 })
    }
    // -----------------------
    const linkResponsiveButtonWithCustomizerFooterButton = () => {
        Array.from(document.querySelectorAll('#customize-footer-actions .devices button')).map((e) =>
            e.addEventListener('click', () => {
                setDevice(wp.customize.previewedDevice.get())
            })
        )
    }

    //EXECUTED FUNCTION IN EVERY RENDER
    useEffect(() => {
        linkResponsiveButtonWithCustomizerFooterButton()
    }, [])

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

    return (
        <Fragment>
            <div
                className={`gf-blog-panel__body_wrapper ${control.params.input_attrs.classes ? control.params.input_attrs.classes : ''} ${
                    control.params.input_attrs.control_for ? control.params.input_attrs.control_for : ''
                }`}
                style={conditionally_display() ? { display: 'none' } : { display: 'block' }}
            >
                <ResponsiveUnitControl handleChange={handleChange} value={value.device_wise_value} device={device} getDeviceValue={getDeviceValue} label={control.params.label} />

            </div>
        </Fragment>
    )
}
