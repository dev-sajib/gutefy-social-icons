/** @format */

import { useState } from 'react'
import { __ } from '@wordpress/i18n'
import { Dropdown, Button, ColorPicker, ColorPalette } from '@wordpress/components'
const { customize } = wp


// internal dependency
import './assets/css/colorControl.scss'


export default function ColorControl(props) {
    const [selectedColor, setSelectedColor] = useState(props.value)
    const colorPalette = [
        { name: '1', color: '#0D1B2A' },
        { name: '2', color: '#1B263B' },
        { name: '3', color: '#415A77' },
        { name: '5', color: '#F72585' },
        { name: '6', color: '#B5179E' },
        { name: '7', color: '#7209B7' },
        { name: '8', color: '#480CA8' },
        { name: '10', color: '#3F37C9' },
        { name: '11', color: '#4361EE' },
        { name: '12', color: '#4CC9F0' },
    ]

    const onChangeColor = (currentValue) => {
        setSelectedColor(currentValue)
        document.querySelector('iframe').contentDocument.body.querySelector('.gutefy-section-wrapper.style-two').style.setProperty(props.targetedSelector, currentValue)
        customize.value(`gf_social_icons_style_settings[styles][${props.targetedSelector}]`)(currentValue)
    }

    return (
        <>
            <div className='gf-social-icons-color-dropdown-controller'>
                <span className='label'>{props.label}</span>
                <Dropdown
                    className='gf-social-icons-color-dropdown'
                    contentClassName='gf-social-icons-color-dropdown-content-wrapper'
                    popoverProps={{ placement: 'bottom-start' }}
                    renderToggle={({ isOpen, onToggle }) => (
                        <Button style={{ backgroundColor: selectedColor }} className='color-selector' variant='primary' onClick={onToggle} aria-expanded={isOpen}></Button>
                    )}
                    renderContent={() => {
                        return (
                            <div>
                                <ColorPicker
                                    color={selectedColor}
                                    onChange={(currentValue) => {
                                        onChangeColor(currentValue)
                                    }}
                                    enableAlpha
                                />
                                <ColorPalette
                                    colors={colorPalette}
                                    disableCustomColors={true}
                                    clearable={false}
                                    onChange={(currentValue) => {
                                        onChangeColor(currentValue)
                                    }}
                                    enableAlpha
                                />
                            </div>
                        )
                    }}
                />
            </div>
        </>
    )
}

