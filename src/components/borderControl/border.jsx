/** @format */
import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'

import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components'
import { StyleGenerator } from '../styleGenerator'
import Tooltip from '../tooltip/tooltip'
import { UnitInput } from '../unitInputControl/unitInput'

export default function Border({ control }) {
    //STATE DECLEARATION =>
    const [device, setDevice] = useState(wp.customize.previewedDevice.get())
    const [value, setValue] = useState(control.settings.default())

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
        console.log(newBorders)
        let border = {}
        value.values.forEach((e) => (border.values = e))
        console.log(border)

        Object.entries(newBorders).map(([key, value], index) => {
            if (typeof value === 'string') {
                border.values.map((e, index) => {
                    if (e.css_attr == 'border') {
                        e.value[device][key] = value
                    } else if (!e.css_attr == 'border') {
                        border.css_attr = 'border'
                        border.value[device][key] = value
                    }
                })
            }
        })
        // if (newBorders.width || newBorders.color || newBorders.style) {
        //     border.css_attr = 'border'
        //     border.value = value.values[0].value
        //     border.value[device] = newBorders
        // } else {
        //     let multiBorder = {};

        //     console.log('Unlinked')
        // }
        let updatedValue = {
            ...value,
            values: [border],
        }
        setValue(updatedValue)
        control.setting.set({ ...updatedValue, id: Math.floor(Math.random() * 9000) + 100 })
    }
    function getDeviceValue(value, device) {
        // Define the order of devices based on priority (mobile -> tablet -> desktop)

        const devices = ['mobile', 'tablet', 'desktop']

        // Get the index of the required device in the priority list
        const deviceIndex = devices.indexOf(device)

        // Start checking from the current device and fallback to previous ones if not available
        for (let i = deviceIndex; i < devices.length; i++) {
            const currentDevice = devices[i]
            const currentDeviceValue = value[currentDevice]

            // Check if the key exists and is not null/undefined
            if (currentDeviceValue !== undefined && currentDeviceValue !== null) {
                return currentDeviceValue // Return if value is found
            }
        }
    }

    //EXECUTED FUNCTION IN EVERY RENDER
    useEffect(() => {
        linkResponsiveButtonWithCustomizerFooterButton()
    }, [])

    const processValue = (val) => {
        let rawVal = {}
        val.values.forEach(function (e) {
            if (e.css_attr === 'border') {
                rawVal = getDeviceValue(e.value, device)
            }

            if (e.css_attr === 'border-top') {
                rawVal['top'] = getDeviceValue(e.value, device)
            }
            if (e.css_attr === 'border-bottom') {
                rawVal['bottom'] = getDeviceValue(e.value, device)
            }
            if (e.css_attr === 'border-left') {
                rawVal['left'] = getDeviceValue(e.value, device)
            }
            if (e.css_attr === 'border-right') {
                rawVal['right'] = getDeviceValue(e.value, device)
            }
        })

        return rawVal
    }
    control.setting.set(value)

    return (
        <>
            <div
                className={`gf-social-icons-color-dropdown-controller ${control.params.input_attrs.classes ? control.params.input_attrs.classes : ''} ${
                    control.params.input_attrs.control_for ? control.params.input_attrs.control_for : ''
                }`}
                style={conditionally_display() ? { display: 'none' } : { display: 'block' }}
            >
                <Tooltip text={device}>
                    <BorderBoxControl value={processValue(value)} data-device={device} colors={colors} onChange={handleChange} />
                </Tooltip>
                <StyleGenerator />
            </div>
        </>
    )
}
