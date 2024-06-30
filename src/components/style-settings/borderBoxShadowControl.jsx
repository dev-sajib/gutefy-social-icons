/** @format */

import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components'
const { customize } = wp

// internal dependency
import './../assets/css/borderBoxShadowControl.scss'
import { width } from '@fortawesome/free-solid-svg-icons/fa0'

export default function BorderBoxShadowControl(props) {
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
    const defaultBorder = {
        color: '#72aee6',
        style: 'solid',
        width: '1px',
    }
    const [borders, setBorders] = useState({
        top: defaultBorder,
        right: defaultBorder,
        bottom: defaultBorder,
        left: defaultBorder,
    })

    function handleValueChange(newVal) {
        setBorders(newVal)
        console.log(newVal); 
        if (!newVal.color) {
            // --gutefy-icon-border-left: '';
            // --gutefy-icon-border-right: '';
            // --gutefy-icon-border-top: '';
            // --gutefy-icon-border-bottom: '';
            // console.log('unlinked');
        } else { //{color: '#72aee6', style: 'solid', width: '2px'}
            const generatedStyle = `border =  ${newVal.width} ${newVal.style} ${newVal.color}`
            const styleSheet = document.querySelector('iframe')
                .contentDocument.body.querySelector('gf-social-icons-dynamic-style-sheet')
            let prevStyle = styleSheet.innerText;

        }
        customize.value(`gf_social_icons_style_settings[styles][wrapper-border]`)(newVal)
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
