/** @format */
import { useState } from '@wordpress/element'
import { CheckboxControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const DEFAULT_TARGETS = {
    front_page: false,
    home_blog: false,
    single_post: false,
    single_page: false,
    archive: false,
    search: false,
    not_found: false,
    woocommerce_shop: false,
    woocommerce_checkout: false,
    woocommerce_product: false,
}

const TARGET_LABELS = {
    front_page: 'Front page',
    home_blog: 'Blog page',
    single_post: 'Single posts',
    single_page: 'Single pages',
    archive: 'Archives (category/tag/date)',
    search: 'Search results',
    not_found: '404 page',
    woocommerce_shop: 'WooCommerce shop',
    woocommerce_checkout: 'WooCommerce cart/checkout',
    woocommerce_product: 'WooCommerce single product',
}

export default function ConditionalDisplay({ control }) {
    const initial = control.setting.get() || {}
    const initialHideRoles = initial.hide_for_roles || initial.user_roles || []
    const [targets, setTargets] = useState({ ...DEFAULT_TARGETS, ...(initial.targets || {}) })
    const [hideForRoles, setHideForRoles] = useState(initialHideRoles)

    const wcActive = control.params.wc_active
    const availableRoles = control.params.available_roles || {}

    const persist = (next) => {
        const merged = {
            targets,
            hide_for_roles: hideForRoles,
            ...next,
        }
        control.setting.set(merged)
    }

    const onTargetToggle = (key) => (checked) => {
        const newTargets = { ...targets, [key]: checked }
        setTargets(newTargets)
        persist({ targets: newTargets })
    }
    const onRoleToggle = (role) => (checked) => {
        const next = checked
            ? [...hideForRoles, role]
            : hideForRoles.filter((r) => r !== role)
        setHideForRoles(next)
        persist({ hide_for_roles: next })
    }

    const renderTargetRow = (key) => {
        if (!wcActive && key.indexOf('woocommerce_') === 0) return null
        return (
            <CheckboxControl
                key={key}
                label={TARGET_LABELS[key]}
                checked={!!targets[key]}
                onChange={onTargetToggle(key)}
            />
        )
    }

    return (
        <div className='gf-social-icons-visibility-wrapper'>
            <div className='gf-social-icons-visibility-section'>
                <p className='gf-social-icons-visibility-heading'>{__('Hide on these pages', 'gf-social-icons')}</p>
                {Object.keys(DEFAULT_TARGETS).map(renderTargetRow)}
            </div>

            <div className='gf-social-icons-visibility-section'>
                <p className='gf-social-icons-visibility-heading'>{__('Hide for these user roles', 'gf-social-icons')}</p>
                {Object.keys(availableRoles).map((role) => (
                    <CheckboxControl
                        key={role}
                        label={availableRoles[role]}
                        checked={hideForRoles.indexOf(role) !== -1}
                        onChange={onRoleToggle(role)}
                    />
                ))}
            </div>
        </div>
    )
}
