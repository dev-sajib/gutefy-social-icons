/** @format */

import { useState } from '@wordpress/element'
import fontIcons from './../../iconStore.json'
import { __experimentalInputControl as InputControl } from '@wordpress/components'
import { IconPopup } from './iconPopup'

export function SocialRepeatedField(props) {
    const [[showPopup, iconId], setShowPopup] = useState([false, ''])
    const [showError, setShowError] = useState(false)

    const hidePopup = () => {
        setShowPopup([!showPopup, iconId])
    }
    const popupOpenClickHandler = (ele) => {
        const iconId = ele.target.closest('.gf-social-icons--icon-data').getAttribute('icon-id')
        setShowPopup([!showPopup, iconId])
    }
    function validateInput(input) {
        //console.log(input)
        // Regular expression to validate mobile number (11 to 15 digits)
        const mobileRegex = /^\d{11,15}$/

        // Regular expression to validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        // Improved regular expression to validate URL
        const urlRegex = /^(https?:\/\/)([a-z0-9.-]+)\.[a-z]{2,}(\/[a-z0-9._~-]*)*\/?$/i

        if (mobileRegex.test(input)) {
            return [true, 'mobilenumber']
        } else if (emailRegex.test(input)) {
            return [true, 'email']
        } else if (urlRegex.test(input)) {
            return [true, 'url']
        } else {
            return [false, 'url']
        }
    }

    return (
        <div account-id={props.index} account-type={props.input[2]} className='gf-social-icons-repeater-field-child-wrapper '>
            <div className='gf-social-icons-repeater-field'>
                <span
                    dangerouslySetInnerHTML={{ __html: fontIcons[`${props.input[0]}`].icon }}
                    icon-id={props.input[0]}
                    className='gf-social-icons--icon-data'
                    onClick={(ele) => {
                        popupOpenClickHandler(ele)
                    }}
                >
                </span>
                <InputControl
                    className='gf-social-icons-url'
                    placeholder='https://facebook.com'
                    type='url'
                    value={props.input[1]}
                    onChange={(value) => {
                        if (validateInput(value)[0]) {
                            setShowError(false)
                            props.dataChangeHandle(props.input[0], value, props.index, validateInput(value)[1])
                        } else {
                            setShowError(true) 
                        }
                        // props.inputDataChangeHandle(e, props.index)
                    }}
                />

                <span className='gf-social-icons-cross-account' onClick={props.removeInputField}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                        <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z' />
                    </svg>
                </span>
                <div className='gf-social-icons-account-list-drag-handle'></div>
            </div>
            {showError && <span className='error'>Enter Valid Url</span>}
            {showPopup && <IconPopup index={props.index} input={props.input} hidePopup={hidePopup} dataChangeHandle={props.dataChangeHandle} iconId={iconId} setShowPopup={setShowPopup} />}
        </div>
    )
}
