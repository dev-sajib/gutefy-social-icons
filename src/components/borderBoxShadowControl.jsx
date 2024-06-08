/** @format */

import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components'
const { customize } = wp

// internal dependency
import './assets/css/borderBoxShadowControl.scss'

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
        style: 'dashed',
        width: '1px',
    }
    const [borders, setBorders] = useState({
        top: defaultBorder,
        right: defaultBorder,
        bottom: defaultBorder,
        left: defaultBorder,
    })
    console.log(borders)

    return (
        <>
            <div className='gf-social-icons-border-box-shadow-controller'>
                <BorderBoxControl
                    colors={colors}
                    label={__('Borders')}
                    onChange={(currentValue) => {
                        setBorders(currentValue)
                    }}
                    value={borders}
                />
            </div>
        </>
    )
}
