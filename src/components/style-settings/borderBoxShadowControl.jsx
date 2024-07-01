/** @format */

import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components'
const { customize } = wp

// internal dependency
import './../assets/css/borderBoxShadowControl.scss'
import { width } from '@fortawesome/free-solid-svg-icons/fa0'

export default function BorderBoxShadowControl({ targetSelector, value }) {
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
    
    const [borders, setBorders] = useState(value )

    function handleValueChange(newVal) {
        setBorders(newVal)
        let generatedStyle = ''
        const wrapper = document.querySelector('iframe').contentDocument.body
        if (typeof newVal == 'object') {
            Object.entries(newVal).map(([key, value]) => {
                if (typeof value == 'object') {
                    generatedStyle = ''
                    generatedStyle = `${value.width ? value.width : ''} ${value.style ? value.style : ''} ${value.color ? value.color : ''}`
                    Array.from(wrapper.querySelectorAll(targetSelector)).map((e) => e.style.setProperty(`border-${key}`, generatedStyle))
                } else if (typeof value == 'string') {
                    generatedStyle += ` ${value ? value : ''}`
                    Array.from(wrapper.querySelectorAll(targetSelector)).map((e) => e.style.setProperty('border', generatedStyle))
                }
            })
        }

        customize.value(`gf_social_icons_style_settings[styles][gutefy_icon_wrapper_border]`)([targetSelector, newVal])
    }
    return (
        <>
            <div className='gf-social-icons-border-box-shadow-controller'>
                <BorderBoxControl
                    colors={colors}
                    label={__('Borders')}
                    onChange={(newVal) => {
                        handleValueChange(newVal)
                    }}
                    value={borders}
                />
            </div>
        </>
    )
}
