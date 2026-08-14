/** @format */

//Import Global Dependency
import { Fragment } from '@wordpress/element'
import { useState } from 'react'
import { __ } from '@wordpress/i18n'
import { SelectControl } from '@wordpress/components'

const POSITION_OPTIONS = [
    { label: __('Right', 'gf-social-icons'), value: 'position--right' },
    { label: __('Left', 'gf-social-icons'), value: 'position--left' },
]

export function SelectDropDown({ control }) {
    // state control
    const [value, setValue] = useState(control.settings.default())

    // Controls registered with an `input_attrs.choices` array supply their own options;
    // the horizontal-position control predates that and falls back to left/right.
    const choices = control.params?.input_attrs?.choices
    const options = Array.isArray(choices) && choices.length ? choices : POSITION_OPTIONS
    const isPositionControl = !Array.isArray(choices) || !choices.length

    const handleChange = (newValue) => {
        setValue(newValue)

        if (isPositionControl) {
            // Swap the class straight away so the preview updates without a refresh.
            const wrapper = document.querySelector('iframe')?.contentDocument.body.querySelector('#gf_social_icons__wrapper')
            if (wrapper) {
                wrapper.classList.add(newValue)
                wrapper.classList.remove(newValue === 'position--left' ? 'position--right' : 'position--left')
            }
        }

        control.setting.set(newValue)
    }

    return (
        <Fragment>
            <div className={`gf-blog-panel__body_wrapper }`}>
                <div className=''>
                    <div id='gf-social-icons-select-dropdown-wrapper' className='gf-social-icons-inline-settings-wrapper'>
                        <label className='gf-social-icons-settings-label' htmlFor=''>
                            {control.params.label}
                        </label>
                        <SelectControl
                            value={value}
                            options={options}
                            onChange={handleChange}
                            __nextHasNoMarginBottom
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
