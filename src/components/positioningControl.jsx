/** @format */

import { useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { BoxControl, SelectControl, RadioGroup, Radio } from '@wordpress/components'
const { customize } = wp
import { Dashicon } from '@wordpress/components'

// internal dependency
import './assets/css/colorControl.scss'

export default function PositioningControl(props) {
    const [currentState, setCurrentState] = useState(props.value)

    function setPosition(left, right, top) {
        customize.value('gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-position-right]')(right)
        customize.value('gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-position-top]')(top)
        customize.value('gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-position-left]')(left)
        document.querySelector('iframe').contentDocument.body.querySelector('.gutefy-section-wrapper ').style.setProperty('--gutefy-icon-wrapper-position-right', right)
        document.querySelector('iframe').contentDocument.body.querySelector('.gutefy-section-wrapper ').style.setProperty('--gutefy-icon-wrapper-position-top', top)
        document.querySelector('iframe').contentDocument.body.querySelector('.gutefy-section-wrapper ').style.setProperty('--gutefy-icon-wrapper-position-left', left)
    }
    function positioningChangingHandle(currentValue) {
        switch (currentValue) {
            case 'right-center':
                setPosition('auto', '0%', '40%')
                break
            case 'left-center':
                setPosition('0%', 'auto', '40%')
                break

            default:
                break
        }
        setCurrentState(currentValue)
    }

    return (
        <>
            <span className='label'>{__(props.label, 'gf-social-icons')}</span>
            <SelectControl
                onChange={(currentValue) => {
                    positioningChangingHandle(currentValue)
                }}
                options={[
                    {
                        label: __('Left Center', 'gf-social-icons'),
                        value: 'left-center',
                    },
                    {
                        label: __('Right Center', 'gf-social-icons'),
                        value: 'right-center',
                    },
                    {
                        label: __('Custom', 'gf-social-icons'),
                        value: 'custom',
                    },
                ]}
                value={currentState}
            />
        </>
    )
}
