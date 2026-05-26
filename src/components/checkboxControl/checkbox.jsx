/** @format */
import { useState } from '@wordpress/element'
import { CheckboxControl as WpCheckboxControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { StyleGenerator } from '../styleGenerator'

const DEVICES = [
    { key: 'desktop', label: 'Desktop' },
    { key: 'tablet', label: 'Tablet' },
    { key: 'mobile', label: 'Mobile' },
]

/**
 * Generic Checkbox control. Drop-in alternative to Toggle.
 *
 * Responsive mode (input_attrs.responsive = true):
 *   setting shape: { css_selector, device_wise_value: { desktop|tablet|mobile: { css_attr, value } }, toggleValue: { true: X, false: Y } }
 *   renders one checkbox per device, all visible at once.
 *
 * Non-responsive mode:
 *   setting shape: { value: bool }
 *   renders a single checkbox.
 */
export default function Checkbox({ control }) {
    const responsive = !!(control.params.input_attrs && control.params.input_attrs.responsive)
    const initial = control.setting.get() || {}

    if (responsive) {
        const cssSelector = initial.css_selector || ''
        const toggleValue = initial.toggleValue || { true: 'block', false: 'none' }

        const valueIsTruthy = (dv) => {
            if (!dv) return true // missing = treat as "on"
            return String(dv.value) === String(toggleValue.true)
        }

        const computeChecked = (deviceWise) => {
            const out = {}
            DEVICES.forEach(({ key }) => {
                out[key] = valueIsTruthy(deviceWise ? deviceWise[key] : null)
            })
            return out
        }

        const [checked, setChecked] = useState(computeChecked(initial.device_wise_value || {}))

        const persist = (nextChecked) => {
            // Preserve css_attr from existing entries (fallback to desktop or 'display')
            const existing = initial.device_wise_value || {}
            const cssAttr =
                (existing.desktop && existing.desktop.css_attr) ||
                (existing.tablet && existing.tablet.css_attr) ||
                (existing.mobile && existing.mobile.css_attr) ||
                'display'

            const deviceWise = {}
            DEVICES.forEach(({ key }) => {
                deviceWise[key] = {
                    css_attr: cssAttr,
                    value: nextChecked[key] ? toggleValue.true : toggleValue.false,
                }
            })
            control.setting.set({
                ...initial,
                css_selector: cssSelector,
                device_wise_value: deviceWise,
                toggleValue,
                id: Math.floor(Math.random() * 9000) + 100,
            })
            StyleGenerator()
        }

        const onToggle = (deviceKey) => (val) => {
            const next = { ...checked, [deviceKey]: val }
            setChecked(next)
            persist(next)
        }

        return (
            <div className='gf-social-icons-checkbox-control'>
                {control.params.label && (
                    <p className='gf-social-icons-checkbox-control__label'>{control.params.label}</p>
                )}
                <div className='gf-social-icons-checkbox-control__list'>
                    {DEVICES.map(({ key, label }) => (
                        <WpCheckboxControl
                            key={key}
                            label={label}
                            checked={!!checked[key]}
                            onChange={onToggle(key)}
                        />
                    ))}
                </div>
            </div>
        )
    }

    // Non-responsive: single boolean checkbox.
    const [singleChecked, setSingleChecked] = useState(!!(initial && initial.value))

    const onSingleToggle = (val) => {
        setSingleChecked(val)
        control.setting.set({ ...initial, value: val })
        StyleGenerator()
    }

    return (
        <div className='gf-social-icons-checkbox-control'>
            <WpCheckboxControl
                label={control.params.label}
                checked={singleChecked}
                onChange={onSingleToggle}
            />
        </div>
    )
}
