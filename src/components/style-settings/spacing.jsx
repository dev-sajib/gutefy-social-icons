/** @format */
import AdvUnitControl from "./advUnitControl"
const {customize} = wp
export default function Spacing({value}) {

    return (
        <div>
            <AdvUnitControl label={'Gap between icons'} targetSelector={'--gutefy-icon-wrapper-gap'} value={value} min={0} max={100} />
        </div>
    )
}
