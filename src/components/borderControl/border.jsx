/** @format */
import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'

import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components'
import { StyleGenerator } from '../styleGenerator'
import Tooltip from '../tooltip/tooltip'

export default function Border({ control }) {
    //STATE DECLEARATION =>
    const [device, setDevice] = useState(wp.customize.previewedDevice.get())
    const [value, setValue] = useState(control.settings.default())
    // console.log(value)

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
        console.log('Border=>handle Change=>🔥', value.values)
        let border = {}
        if (newBorders.width || newBorders.color || newBorders.style) {
            border.css_attr = 'border'
            border.value = value.values[0].value

            border.value[device] = newBorders
        } else {
            console.log('Unlinked')
        }
        let newValue = {
            ...value,
            values: [border],
        }
        setValue(newValue)
        control.setting.set(newValue)
    }

    //EXECUTED FUNCTION IN EVERY RENDER
    useEffect(() => {
        linkResponsiveButtonWithCustomizerFooterButton()
        control.setting.set(value)
    }, [])
    control.setting.set(value)
    const processValue = (val) => {
        let rawVal = {}
        val.values.forEach(function (e) {
            if (e.css_attr === 'border') {
                rawVal = e.value[device]
            }

            if (e.css_attr === 'border-top') {
                rawVal['top'] = e.value[device]
            }
            if (e.css_attr === 'border-bottom') {
                rawVal['bottom'] = e.value[device]
            }
            if (e.css_attr === 'border-left') {
                rawVal['left'] = e.value[device]
            }
            if (e.css_attr === 'border-right') {
                rawVal['right'] = e.value[device]
            }
        })

        return rawVal
    }

    return (
        <>
            <div
                className={`gf-social-icons-color-dropdown-controller ${control.params.input_attrs.classes ? control.params.input_attrs.classes : ''} ${
                    control.params.input_attrs.control_for ? control.params.input_attrs.control_for : ''
                }`}
                style={conditionally_display() ? { display: 'none' } : { display: 'block' }}
            >
                <Tooltip text={device}>
                    <BorderBoxControl value={processValue(value)} data-device={device} colors={colors}  onChange={handleChange} />
                </Tooltip>
                <StyleGenerator />
            </div>
        </>
    )
}
