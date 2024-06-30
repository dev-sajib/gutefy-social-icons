/** @format */
import AdvUnitControl from "./advUnitControl"
const {customize} = wp
export default function Spacing() {
  const key = 'gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-gap]';
  const getNewTabStatus = customize.settings.settings[key].value;
  console.log('🔥',getNewTabStatus);
    return (
        <div>
            <AdvUnitControl label={'Gap between icons'} targetSelector={'--gutefy-icon-wrapper-gap'} value={getNewTabStatus} min={0} max={100} />
        </div>
    )
}
