/** @format */

import { useState } from 'react'
import { fontIcons } from '../fontAwsomeIcon'
import { __experimentalInputControl as InputControl } from '@wordpress/components'

export function SocialRepeatedField(props) {
    const [[showPopup,iconId], setShowPopup] = useState([false,''])

    const hidePopup = () => {
        setShowPopup([!showPopup,iconId])
    }
    const popupOpenClickHandler = (ele) => {
        
        const iconId = ele.target.closest('.gf-social-icons--icon-data').getAttribute('icon-id');
        setShowPopup([!showPopup,iconId])
    }

    return (
        <div account-id={props.index} className='gf-social-icons-repeater-field-child-wrapper gf-social-icons-is-idle'>
            <div className='gf-social-icons-repeater-field'>
                <span
                    icon-id={props.input[0]}
                    className='gf-social-icons--icon-data'
                    onClick={(ele) => {
                        popupOpenClickHandler(ele)
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
                        props.dataChangeHandle(props.input[0], e, props.index)
                        // props.inputDataChangeHandle(e, props.index)
                    }}
                />

                <button className='gf-social-icons-cross-account' onClick={props.removeInputField}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                        <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z' />
                    </svg>
                </button>
            </div>
            { showPopup && <IconPopup index={props.index} input={props.input} hidePopup={hidePopup} dataChangeHandle={props.dataChangeHandle} iconId={iconId} setShowPopup={setShowPopup} />}
        </div>
    )
}
