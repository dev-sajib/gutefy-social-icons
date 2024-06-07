/** @format */

import { useState } from 'react'
import { __ } from '@wordpress/i18n'
import { BoxControl } from '@wordpress/components'
const { customize } = wp


// internal dependency
import './assets/css/colorControl.scss'

export default function PositioningControl(props){
    return (
        <>
        <span className='label'>
            {props.label}
        </span>
        </>
    )
}
