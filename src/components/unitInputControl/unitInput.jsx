/** @format */

//Import Global Dependency
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { ResponsiveUnitControl } from '../subControl'

export function UnitInput({ control }) {
    const conditionally_display = () => {
        if (control.params.input_attrs.conditional_dependency) {
            const dependency_control_id = control.params.input_attrs.conditional_dependency
            const dependency_control_value = control.params.input_attrs.conditional_dependency_value
            const dependency_control_db_value = wp.customize.settings.settings[dependency_control_id].value

            if (dependency_control_db_value === dependency_control_value) {
                return false
            } else {
                return true
            }
        }
        return false
    }
    return (
        <Fragment>
            <div
                className={`gf-blog-panel__body_wrapper ${control.params.input_attrs.classes ? control.params.input_attrs.classes : ''} ${
                    control.params.input_attrs.control_for ? control.params.input_attrs.control_for : ''
                }`}
                style={conditionally_display() ? { display: 'none' } : { display: 'block' }}
            >
                <ResponsiveUnitControl control={control} />
            </div>
        </Fragment>
    )
}

