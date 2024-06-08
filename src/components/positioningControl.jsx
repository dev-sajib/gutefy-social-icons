/** @format */

import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import {SelectControl } from '@wordpress/components'
import './assets/css/colorControl.scss'

import './assets/css/positioningControl.scss'
import AdvUnitControl from './advUnitControl'

const { customize } = wp

export default function PositioningControl({ value, label, verticalValue }) {
    const [currentState, setCurrentState] = useState(value)

    function setPosition(left, right) {
        customize.value('gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-position-right]')(right)
        customize.value('gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-position-left]')(left)
        const iframeDoc = document.querySelector('iframe').contentDocument
        const sectionWrapper = iframeDoc.body.querySelector('.gutefy-section-wrapper')
        sectionWrapper.style.setProperty('--gutefy-icon-wrapper-position-right', right)
        sectionWrapper.style.setProperty('--gutefy-icon-wrapper-position-left', left)
    }

    function handlePositionChange(currentValue) {
        switch (currentValue) {
            case ' right':
                setPosition('auto', '0%')
                break
            case 'left':
                setPosition('0%', 'auto')
                break
            default:
                break
        }
        setCurrentState(currentValue)
    }

    return (
        <div className='gf-social-icons-position-controller-wrapper'>
            <div className='gf-social-icons-position-selection-wrapper'>
                <span className='label'>{__(label, 'gf-social-icons')}</span>
                <SelectControl
                    onChange={(currentValue) => {
                        handlePositionChange(currentValue)
                    }}
                    options={[
                        {
                            label: __('Left', 'gf-social-icons'),
                            value: 'left',
                        },
                        {
                            label: __('Right', 'gf-social-icons'),
                            value: ' right',
                        },
                    ]}
                    value={currentState}
                />
            </div>
            <AdvUnitControl label={'Adjust Vertical Position'} targetSelector={'--gutefy-icon-wrapper-position-top'} value={verticalValue} min={0} max={100} />
        </div>
    )
}
