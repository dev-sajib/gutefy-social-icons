/** @format */

import { useState } from '@wordpress/element'
import fontIcons from '../../iconStore.json'
import { __experimentalInputControl as InputControl, TextareaControl, ToggleControl as WpToggleControl } from '@wordpress/components'
import { IconPopup } from './iconPopup'

const MAIL_ICONS = ['envelope', 'envelope-regular']
const WHATSAPP_ICONS = ['whatsapp']
const PHONE_ICONS = ['phone']

function getRowType(iconId) {
    if (MAIL_ICONS.includes(iconId)) return 'mail'
    if (WHATSAPP_ICONS.includes(iconId)) return 'whatsapp'
    if (PHONE_ICONS.includes(iconId)) return 'phone'
    return 'url'
}

export function SocialRepeatedField(props) {
    const [[showPopup, iconId], setShowPopup] = useState([false, ''])
    const [showError, setShowError] = useState(false)
    const [showAdvanced, setShowAdvanced] = useState(false)

    const options = (props.input[3] && typeof props.input[3] === 'object') ? props.input[3] : {}
    const rowType = getRowType(props.input[0])

    const updateOption = (key, value) => {
        const newOptions = { ...options, [key]: value }
        props.dataChangeHandle(props.input[0], props.input[1], props.index, props.input[2], newOptions)
    }

    const hidePopup = () => {
        setShowPopup([!showPopup, iconId])
    }
    const popupOpenClickHandler = (ele) => {
        const iconId = ele.target.closest('.gf-social-icons--icon-data').getAttribute('icon-id')
        setShowPopup([!showPopup, iconId])
    }
    function validateInput(input) {
        const mobileRegex = /^\d{11,15}$/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

    const placeholderByType = {
        mail: 'name@example.com',
        whatsapp: '15551234567',
        phone: '15551234567',
        url: 'https://facebook.com',
    }
    const hasAdvanced = rowType === 'mail' || rowType === 'whatsapp' || rowType === 'phone'

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
                    placeholder={placeholderByType[rowType] || placeholderByType.url}
                    type={rowType === 'mail' ? 'email' : (rowType === 'whatsapp' || rowType === 'phone' ? 'tel' : 'url')}
                    value={props.input[1]}
                    onChange={(value) => {
                        if (validateInput(value)[0]) {
                            setShowError(false)
                            props.dataChangeHandle(props.input[0], value, props.index, validateInput(value)[1])
                        } else {
                            setShowError(true)
                        }
                    }}
                />

                {hasAdvanced && (
                    <span
                        className={`gf-social-icons-advanced-toggle ${showAdvanced ? 'open' : ''}`}
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        title='Advanced'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' width='10' height='14'>
                            <path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' />
                        </svg>
                    </span>
                )}

                <span className='gf-social-icons-cross-account' onClick={props.removeInputField}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                        <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z' />
                    </svg>
                </span>
                <div className='gf-social-icons-account-list-drag-handle'></div>
            </div>
            {showError && <span className='error'>Enter Valid Url</span>}

            {hasAdvanced && showAdvanced && (
                <div className='gf-social-icons-advanced-panel'>
                    {rowType === 'whatsapp' && (
                        <TextareaControl
                            label='Prefill message'
                            help='Sent as wa.me ?text= param'
                            value={options.prefill_message || ''}
                            onChange={(v) => updateOption('prefill_message', v)}
                        />
                    )}
                    {rowType === 'mail' && (
                        <>
                            <InputControl
                                label='Subject'
                                value={options.subject || ''}
                                onChange={(v) => updateOption('subject', v)}
                            />
                            <TextareaControl
                                label='Body'
                                value={options.body || ''}
                                onChange={(v) => updateOption('body', v)}
                            />
                        </>
                    )}
                    {rowType === 'phone' && (
                        <WpToggleControl
                            label='Use SMS instead of call'
                            checked={!!options.sms}
                            onChange={(v) => updateOption('sms', v)}
                        />
                    )}
                </div>
            )}

            {showPopup && <IconPopup index={props.index} input={props.input} hidePopup={hidePopup} dataChangeHandle={props.dataChangeHandle} iconId={iconId} setShowPopup={setShowPopup} />}
        </div>
    )
}
