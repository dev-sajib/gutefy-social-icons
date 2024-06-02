/** @format */

import { useState } from 'react'
import { fontIcons } from '../fontAwsomeIcon'
import { __experimentalInputControl as InputControl } from '@wordpress/components'
import { IconPopup } from './iconPopup'

export function SocialRepeatedField(props) {
    const [showPopup, setShowPopup] = useState(false)

    const hidePopup = () => {
        setShowPopup(!showPopup)
    }


    return (
        <div account-id={props.index} className='gf-social-icons-repeater-field-child-wrapper gf-social-icons-is-idle'>
            <div className='gf-social-icons-repeater-field'>
                <span
                    className='gf-social-icons--icon-data'
                    onClick={() => {
                        setShowPopup(!showPopup)
                    }}
                >
                    {fontIcons[`${props.input[0]}`].icon}
                </span>
                <InputControl
                    className='gf-social-icons-url'
                    placeholder='https://facebook.com'
                    type='url'
                    value={props.input[1]}
                    onChange={(e) => {
                        props.inputDataChangeHandle(e, props.index)
                    }}
                />

                <button className='gf-social-icons-cross-account' onClick={props.removeInputField}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                        <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z' />
                    </svg>
                </button>
            </div>
            {showPopup && <IconPopup index={props.index} iconDataChangeHandle={props.iconDataChangeHandle} hidePopup={hidePopup} />}
        </div>
    )
}
