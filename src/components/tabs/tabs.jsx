/** @format */

//Import Global Dependency
import { useState } from 'react'

import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

//Import internal Dependency
export function Tabs({ control }) {
    const [value, setValue] = useState('gf-social-icons-general-state')
    const handleChange = () => {

        if (value == 'gf-social-icons-general-state') {
            Array.from(document.querySelector(control.selector).closest('ul').querySelectorAll('.gf-social-icons-general-state-control')).map((e) => (e.closest('li').style.display = 'block'))
            Array.from(document.querySelector(control.selector).closest('ul').querySelectorAll('.gf-social-icons-hover-state-control')).map((e) => (e.closest('li').style.display = 'none'))
        } else {
            Array.from(document.querySelector(control.selector).closest('ul').querySelectorAll('.gf-social-icons-general-state-control')).map((e) => (e.closest('li').style.display = 'none'))
            Array.from(document.querySelector(control.selector).closest('ul').querySelectorAll('.gf-social-icons-hover-state-control')).map((e) => (e.closest('li').style.display = 'block'))
        }
    }

    window.addEventListener('load', () => {
        setTimeout(function() {
            handleChange();
        }, 1000);
    })
    handleChange()

    const tabs = [
        ['General', 'gf-social-icons-general-state'],
        ['Hover', 'gf-social-icons-hover-state'],
    ]
    return (
        <div className='gf-social-icons-tab-element-wrapper'>
            {tabs.map((val, index) => (
                <span
                    key={index}
                    data-tabname={val[1]}
                    className={`gf-social-icons-tab-element ${value == val[1] ? 'active' : ''}`}
                    onClick={(val) => {
                        const currentTabName = val.target.dataset.tabname
                        setValue(currentTabName)
                    }}
                >
                    {val[0]}
                </span>
            ))}
        </div>
    )
}
