/** @format */

import React from 'react'
import { useState } from '@wordpress/element'
import { SocialRepeatedField } from './socialRepeatedField'
import { ReactSortable } from 'react-sortablejs'
import { Panel, PanelBody } from '@wordpress/components'
import { __ } from '@wordpress/i18n'


const { customize } = wp

export function SocialRepeateater({ control }) {
    const [accountsUrl, setAccountsUrl] = useState(control.setting.get()) // [['facebook', 'facebook.com'], ['google-x', 'google.com']]

    const addInputField = (e) => {
        e.preventDefault()
        setAccountsUrl([...accountsUrl, ['facebook', '', 'url']])
    }

    const dataChangeHandle = (newAccountIconId, newAccountUrl, index, type) => {
        const newAccountData = [newAccountIconId, newAccountUrl, type]
        const newUrl = [...accountsUrl]
        newUrl[index] = newAccountData
        setAccountsUrl(newUrl)
        control.setting.set(accountsUrl)
    }

    const removeInputField = (ele) => {
        const wrapperEle = ele.target.closest('.gf-social-icons-repeater-field-child-wrapper')
        const accountId = wrapperEle.getAttribute('account-id')
        const currentAccountList = [...accountsUrl]
        currentAccountList.splice(accountId, 1)
        const newAccountList = currentAccountList
        setAccountsUrl(newAccountList)
        control.setting.set(accountsUrl)
    }
    control.setting.set(accountsUrl)

    return (
        <div className='gf-social-icons__main-wrapper'>
            <Panel>
                <PanelBody className='gf-social-icons-panel__body' title={__('Control Your Accounts', 'gf-social-icons')} icon='user'>
                    <div className='gf-social-icons-panel__body_wrapper'>
                        <div className='gutefy_settings_wrapper_accounts_social_icon gf-social-icons-repeater-field-wrapper'>
                            <button className='gf_social_icons_add_account_button' onClick={addInputField}>
                                Add Input Field
                            </button>
                            <ReactSortable className='gf-social-icons-repeater-field-wrapper' list={accountsUrl} setList={setAccountsUrl}>
                                {accountsUrl.map((input, index) => (
                                    <SocialRepeatedField input={input} index={index} key={index} dataChangeHandle={dataChangeHandle} removeInputField={removeInputField} />
                                ))}
                            </ReactSortable>
                        </div>
                    </div>
                </PanelBody>
            </Panel>
        </div>
    )
}
