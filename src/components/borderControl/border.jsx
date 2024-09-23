/** @format */
import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'

import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components'
import { StyleGenerator } from '../styleGenerator'
import Tooltip from '../tooltip/tooltip'
import { UnitInput } from '../unitInputControl/unitInput'

export default function Border({ control }) {
    //STATE DECLEARATION
    const [device, setDevice] = useState(wp.customize.previewedDevice.get())
    const [value, setValue] = useState(control.settings.default())

    //DEFAULT COLOR PLATTER FOR BORDER COLOR SELECTION =>
    const colors = [
        {
            color: '#72aee6',
            name: 'Blue 20',
        },
        {
            color: '#3582c4',
            name: 'Blue 40',
        },
        {
            color: '#e65054',
            name: 'Red 40',
        },
        {
            color: '#8a2424',
            name: 'Red 70',
        },
        {
            color: '#f2d675',
            name: 'Yellow 10',
        },
        {
            color: '#bd8600',
            name: 'Yellow 40',
        },
    ]

    //HANDLE CHANGES =>
    const handleChange = (newBorders) => {
        if (typeof Object.values(newBorders)[0] === 'string') {
            newBorders = {
                css_attr: 'border',
                value: newBorders,
            }
        } else {
            newBorders = Object.entries(newBorders).map(function ([elementName, elementValue]) {
                if (typeof elementValue === 'object') {
                    return {
                        css_attr: `border-${elementName}`,
                        value: elementValue,
                    }
                }

                if (typeof elementValue == 'string') {
                }
            })
        }

        let updatedDeviceWiseValue = {
            ...value.device_wise_value,
            [device]: newBorders,
        }
        let updatedValue = {
            ...value,
            device_wise_value: updatedDeviceWiseValue,
        }
        //console.log(updatedValue);

        setValue(updatedValue)

        control.setting.set({ ...updatedValue, id: Math.floor(Math.random() * 9000) + 100 })
    }
    //helper function
    function getDeviceValue(device_wise_value, device) {
        const devices = ['mobile', 'tablet', 'desktop']
        // Get the index of the required device in the priority list
        const deviceIndex = devices.indexOf(device)

        // Start checking from the current device and fallback to previous ones if not available
        for (let i = deviceIndex; i < devices.length; i++) {
            const currentDevice = devices[i]
            let currentDeviceValue = {}
            if (device_wise_value[currentDevice]) {
                if (device_wise_value[currentDevice].value) {
                    currentDeviceValue=device_wise_value[currentDevice].value
                }
                else{
                    device_wise_value[currentDevice].forEach((e) => {
                        //console.log(e.css_attr)
                        let tempKey
                        if (e.css_attr === 'border-top') {
                            tempKey = 'top'
                        }
                        if (e.css_attr === 'border-bottom') {
                            tempKey = 'bottom'
                        }
                        if (e.css_attr === 'border-left') {
                            tempKey = 'left'
                        }
                        if (e.css_attr === 'border-right') {
                            tempKey = 'right'
                        }

                        currentDeviceValue = {
                            ...currentDeviceValue,
                            [tempKey]: e.value,
                        }
                    })
                }
            } else {
                currentDeviceValue = undefined
            }

            // Check if the key exists and is not null/undefined
            if (currentDeviceValue !== undefined && currentDeviceValue !== null) {
                //console.log(currentDeviceValue)
                return currentDeviceValue // Return if value is found
            }
        }
    }

    //SYNC RESPONSIVE BUTTON =>
    const linkResponsiveButtonWithCustomizerFooterButton = () => {
        Array.from(document.querySelectorAll('#customize-footer-actions .devices button')).map((e) =>
            e.addEventListener('click', () => {
                setDevice(wp.customize.previewedDevice.get())
            })
        )
    }

    // HANDLE CONDITIONAL DISPLAY =>
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

    //EXECUTED FUNCTION IN EVERY RENDER
    useEffect(() => {
        linkResponsiveButtonWithCustomizerFooterButton()
    }, [])

    return (
        <>
            <div
                className={`gf-social-icons-color-dropdown-controller ${control.params.input_attrs.classes ? control.params.input_attrs.classes : ''} ${
                    control.params.input_attrs.control_for ? control.params.input_attrs.control_for : ''
                }`}
                style={conditionally_display() ? { display: 'none' } : { display: 'block' }}
            >
                <Tooltip text={device}>
                    <BorderBoxControl value={getDeviceValue(value.device_wise_value, device)} data-device={device} colors={colors} onChange={handleChange} />
                </Tooltip>
                <StyleGenerator />
            </div>
        </>
    )
}
