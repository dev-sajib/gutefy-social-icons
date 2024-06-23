/** @format */

import { __ } from '@wordpress/i18n'
import { __experimentalUnitControl as UnitControl, SelectControl } from '@wordpress/components'

import './../assets/css/advUnitControl.scss'
const { customize } = wp


export default function AdvUnitControl({label,targetSelector,value,min,max}) {
    return (
        <>
            <div className='gf-social-icons-adv-unit-control-wrapper'>
                <span className='label'>{__(label, 'gf-social-icons')}</span>
                <UnitControl
                    onChange={(currentValue) => {
                        // setPositionTopValue(currentValue)
                        const iframeDoc = document.querySelector('iframe').contentDocument
                        const sectionWrapper = iframeDoc.body.querySelector('.gutefy-section-wrapper')
                        sectionWrapper.style.setProperty(targetSelector, currentValue)
                        customize.value(`gf_social_icons_style_settings[styles][${targetSelector}]`)(currentValue)
                    }}
                    value={value}
                    max={max && max}
                    min={min && min}
                />
            </div>
        </>
    )
}
