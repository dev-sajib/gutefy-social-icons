import './customizer.scss'
import './assets/js/customizer-script.js'


import { ToggleControl } from './components/toggleControl/index.js';
import { SocialRepeateaterControl } from './components/socialRepeaterControl';
import { ColorControl } from './components/colorControl';
import { TabsControl } from './components/tabs/';

const { controlConstructor } = wp.customize;
controlConstructor.gf_social_icons__general_control_type = SocialRepeateaterControl;
controlConstructor.gf_social_icons__toggle_control_type = ToggleControl;
controlConstructor.gf_social_icons_controler_type__color = ColorControl
controlConstructor.gf_social_icons__type_tabs = TabsControl
