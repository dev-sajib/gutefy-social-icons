/** @format */
import { useState, useEffect } from 'react'
import { ResponsiveToggle, WithoutResponsiveToggle } from '../subControl'
import { __ } from '@wordpress/i18n'

export default function Toggle({ control }) {
    // state control
    const [device, setDevice] = useState('desktop')
    // console.log(control.settings.default())

    const [value, setValue] = useState(control.settings.default())

    // //console.log('value=>' ,value)
    //helper function
    // ------------------
    function getKeyOrValue(input) {
        if (input !== undefined) {
            input = String(input)

            // Check if the input is a key
            if (control.settings.default().toggleValue.hasOwnProperty(input)) {
                return control.settings.default().toggleValue[input] // Return the value if input is a key
            }

            // If input is not a key, find the key for the input value
            const foundKey = Object.entries(control.settings.default().toggleValue).find(([key, value]) => value === input)?.[0]

            if (foundKey === 'false') {
                return false
            }

            return true
        }
        return input
    }
    //--------------------------

    function getDeviceValue(device_wise_value, device) {
        // console.log('get=>', device_wise_value)
        // Define the order of devices based on priority (mobile -> tablet -> desktop)
        const devices = ['mobile', 'tablet', 'desktop']

        // Get the index of the required device in the priority list
        const deviceIndex = devices.indexOf(device)

        // Start checking from the current device and fallback to previous ones if not available
        for (let i = deviceIndex; i < devices.length; i++) {
            const currentDevice = devices[i]
            const currentDeviceValue = device_wise_value[currentDevice] ? device_wise_value[currentDevice]['value'] : undefined

            // Check if the key exists and is not null/undefined
            if (currentDeviceValue !== undefined && currentDeviceValue !== null) {
                // console.log(currentDeviceValue);
                return getKeyOrValue(currentDeviceValue) // Return if value is found
            }
        }
    }
    // --------------------
    const handleChange = (newValue) => {
        let css_attr = value.device_wise_value[device]?.css_attr || value.device_wise_value['desktop'].css_attr

        let updatedDeviceWiseValue = {
            ...value.device_wise_value,
            [device]: { css_attr: css_attr, value: getKeyOrValue(newValue) },
        }
        let updatedValue = {
            ...value,
            device_wise_value: updatedDeviceWiseValue,
        }
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
        <>
            {/* <Panel> */}
            {/* <PanelBody className='gf-social-icons-panel__body' initialOpen={false} title={__('Aditional Settings', 'gf-social-icons')} icon=''> */}
            <div>
                {control.params.input_attrs.responsive ? (
                    <ResponsiveToggle handleChange={handleChange} value={value.device_wise_value} device={device} getDeviceValue={getDeviceValue} label={control.params.label} />
                ) : (
                    <WithoutResponsiveToggle control={control} />
                )}
            </div>

            {/* </PanelBody> */}
            {/* </Panel> */}
        </>
    )
}
