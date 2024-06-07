/** @format */

import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';
const { customize } = wp

// internal dependency
import './assets/css/borderBoxShadowControl.scss'

export default function BorderBoxShadowControl(props) {
    const colors = [
        { name: 'Blue 20', color: '#72aee6' },
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
    return (
        <>
            <div className='gf-social-icons-border-box-shadow-controller'>
                <BorderBoxControl colors={colors} label={__('Borders')} onChange={(currentValue)=>{
                    setBorders(currentValue)
                } } value={borders} />
            </div>
        </>
    )
}
