<?php
namespace GF_SOCIAL_ICONS\Global;

class Settings
{
    //ANCHOR  PANEL ID :
    const PANEL_CORE = 'gutefy_settings_core-panel_social_icon';

    //ANCHOR -SECTION-IDS
    const SECTION_GENERAL_SETTINGS = 'gutefy_settings_general_social_icon';
    const SECTION_STYLE_SETTINGS = 'gutefy_settings_styles_social_icon';

    //ANCHOR -GENERAL SETTINGS ID
    const GENERAL_SETTING_ID_SOCIAL_REPEATER = 'gf_social_icons_general_settings';
    const GENERAL_SETTING_ID_OPEN_IN_NEW_TAB_SETTINGS = 'gf_social_icons_open_in_new_tab_settings';
    const GENERAL_SETTING_ID_MOBILE_VISIBILITY_SETTINGS = 'gf_social_icons_mobile_visiblity_settings';
    const GLOBAL_ID__TAB = 'gf_social_icons_tab_settings';

    //ANCHOR - PARTIAL SETTINGS ID
    const PARTIAL_GENERAL_SETTING_ID_SOCIAL_REPEATER = 'gf_social_icons_general_settings_partial';
    //ANCHOR - STYLE SETTINGS ID


    const CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY = [
        'GENERAL_SETTING_ID_RESPONSIVE_CONTROL' => 'gf_social_icons_style_settings[styles][gf_social_icons_responsive_control]',
        'STYLE_SETTING_ID_ICON_COLOR' => 'gf_social_icons_style_settings[styles][--gutefy-icon-color]',
        'STYLE_SETTING_ID_WRAPPER_BACKGROUND' => 'gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-color]',
        'STYLE_SETTING_ID_ICON_HOVER_COLOR' => 'gf_social_icons_style_settings[styles][--gutefy-icon-hover-color]',
        'STYLE_SETTING_ID_WRAPPER_HOVER_BACKGROUND' => 'gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-hover-color]',
        // 'STYLE_SETTING_ID_WRAPPER_POSITION_RIGHT' => 'gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-position-right]',
        // 'STYLE_SETTING_ID_WRAPPER_POSITION_TOP' => 'gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-position-top]',
        // 'STYLE_SETTING_ID_ICON_SIZE' => 'gf_social_icons_style_settings[styles][--gutefy-icon-size]',
        // 'STYLE_SETTING_ID_ICON_WRAPPER_SIZE' => 'gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-size]',
        // 'STYLE_SETTING_ID_BORDER' => 'gf_social_icons_style_settings[styles][gutefy_icon_wrapper_border]',
        // 'STYLE_SETTING_ID_SPACING' => 'gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-gap]',
    ];


    //OTHERS KEY
    const GENERAL_TAB_ELEMENT = 'gf-social-icons-general-state-control';
    const HOVER_TAB_ELEMENT = 'gf-social-icons-hover-state-control';
}
