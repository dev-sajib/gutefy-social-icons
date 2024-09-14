/** @format */

// Tooltip.js
import React, { useState } from 'react'
import './css/tooltip.scss'

const Tooltip = ({ text, children }) => {
    const [visible, setVisible] = useState(false)

    return (
        <div className='tooltip-container' onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            {visible && <div className='tooltip'>{text}</div>}
            {children}
        </div>
    )
}

export default Tooltip
