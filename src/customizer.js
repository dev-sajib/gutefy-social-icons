import './customizer.scss'
import { ToggleControl } from './components/toggleControl';
import { SocialRepeateaterControl } from './components/socialRepeaterControl';
import { ColorControl } from './components/colorControl';
import { TabsControl } from './components/tabs/';
import { UnitInputControl } from './components/unitInputControl';
import { BorderControl } from './components/borderControl';
import { SelectDropDownControl } from './components/selectDropDownControl';

const { controlConstructor } = wp.customize;


controlConstructor.gf_social_icons__general_control_type = SocialRepeateaterControl;
controlConstructor.gf_social_icons__toggle_control_type = ToggleControl;
controlConstructor.gf_social_icons_controler_type__color = ColorControl
controlConstructor.gf_social_icons__type_tabs = TabsControl
controlConstructor.gf_social_icons__type_unit_input = UnitInputControl
controlConstructor.gf_social_icons__borders_control_type = BorderControl
controlConstructor.gf_social_icons__type_select_dropdown = SelectDropDownControl
