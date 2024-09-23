/** @format */

//Import Global Dependency
import { Fragment } from '@wordpress/element'
import { useState } from 'react'
import { __ } from '@wordpress/i18n'
import { SelectControl } from '@wordpress/components'

export function SelectDropDown({ control }) {
    // state control
    const [value, setValue] = useState(control.settings.default())

    const handleChange = (newValue) => {
        setValue(newValue)
        // Select the element by its ID
        const wrapper = document.querySelector('iframe')?.contentDocument.body.querySelector('#gf_social_icons__wrapper')
        // Add the new class
        if (wrapper) {
            wrapper.classList.add(newValue)
            wrapper.classList.remove(newValue==='position--left'?'position--right':'position--left')
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
                            options={[
                                { label: 'Right', value: 'position--right' },
                                { label: 'Left', value: 'position--left' },
                            ]}
                            onChange={handleChange}
                            __nextHasNoMarginBottom
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
