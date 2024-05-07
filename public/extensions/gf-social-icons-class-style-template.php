<?php

if (!defined('ABSPATH'))
        exit; // Exit if accessed directly 
trait Gf_social_icons_class_style_template
{
        private function gf_social_icons_get_style_settings($data_style)
        {
                // var_dump($data_style);
                $style = '';
                $style = '<style>';
                $style .= 'body{';
                $style .= ($data_style['gutefy_settings_color_social_icon'] != '') ? '--gutefy-secondary-color:' . $data_style['gutefy_settings_color_social_icon'] . ' !important;' : '';
                $style .= ($data_style['gutefy_settings_bg_color_social_icon'] != '') ? '--gutefy-primary-color:' . $data_style['gutefy_settings_bg_color_social_icon'] . ' !important;' : '';
                $style .= ($data_style['gutefy_settings_hover_color_social_icon'] != '') ? '--gutefy-secondary-hover-color:' . $data_style['gutefy_settings_hover_color_social_icon'] . ' !important;' : '';
                $style .= ($data_style['gutefy_settings_hover_bg_color_social_icon'] != '') ? '--gutefy-primary-hover-color:' . $data_style['gutefy_settings_hover_bg_color_social_icon'] . ' !important;' : '';
                $style .= ($data_style['gutefy_settings_icon_size_social_icon'] != '') ? '--gutefy-icon-size:' . $data_style['gutefy_settings_icon_size_social_icon'] . 'px' . ' !important;' : '';
                $style .= ($data_style['gutefy_settings_icon_wrapper_size_social_icon'] != '') ? '--gutefy-icon-wrapper-size:' . $data_style['gutefy_settings_icon_wrapper_size_social_icon'] . 'px' . ' !important;' : '';
                $style .= ($data_style['gutefy_settings_icon_wrapper_size_social_icon'] != '') ? '--gutefy-icon-wrapper-size:' . $data_style['gutefy_settings_icon_wrapper_size_social_icon'] . 'px' . ' !important;' : '';
                $style .= ($data_style['gutefy_settings_icon_wrapper_z_index_social_icon'] != '') ? '--gutefy-icon-wrapper-z-index:' . $data_style['gutefy_settings_icon_wrapper_z_index_social_icon']  . ' !important;' : '';
                if (($data_style['gutefy_settings_icon_position_social_icon'] != '') && ($new_value = $data_style['gutefy_settings_icon_position_social_icon'])) {
                        if ($new_value == 'bottom_right') {
                                var_dump($new_value);
                                $style .= '--gutefy-icon-wrapper-display-postion-bottom:0% !important;';
                                $style .= '--gutefy-icon-wrapper-display-postion-right:0!important;';
                                $style .= '--gutefy-icon-wrapper-display-postion-left:auto !important;';
                        } else if ($new_value == 'bottom_left') {
                                $style .= '--gutefy-icon-wrapper-display-postion-bottom:0% !important;';
                                $style .= '--gutefy-icon-wrapper-display-postion-left:1 !important;';
                                $style .= '--gutefy-icon-wrapper-display-postion-right:auto !important;';
                        }
                }

                $style .= '}';
                $style .= '</style>';
                return $style;
        }
        private function gf_social_icons_get_account_name_from_string($key)
        {
                $accountName = str_replace('_url', '', $key);
                return $accountName;
        }
        public function gf_social_icons_style_one($html, $data, $data_style, $data_icon_list)
        {

                $allow_social_number = 5;
                $html .= '<section class="gutefy-section-wrapper style-one">';
                $html .= '<section class="section-wrapper">';

                // Floating Action Button
                $html .= '<div class="floating-action-button">';

                // Floating Button
                $html .= '<div class="share-btn">';
                $html .= '<svg id="share-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/></svg>';
                $html .= '<svg id="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
                $html .= '</div>';

                // Expand Section
                $html .= '<ul>';
                foreach ($data as $socialNetwork => $url) {
                        $accountName = $this->gf_social_icons_get_account_name_from_string($socialNetwork);
                        if ($url != '' && $allow_social_number != 0) {
                                $allow_social_number -= 1;
                                $html .= '<li ><a  href=' . $url . '>' . $data_icon_list[$accountName]['icon'] . '</a></li>';
                        }

                }
                $html .= '</ul>';

                $html .= '</div>'; // End Floating Action Button
                $html .= '</section>'; // End Section
                $html .= '</section>'; // End Section
                $html .= $this->gf_social_icons_get_style_settings($data_style);
                return $html;
        }
        public function gf_social_icons_style_two($html, $data, $data_style, $data_icon_list)
        {
                $html .= '<section class="gutefy-section-wrapper style-two">';
                $html .= '<section class="section-wrapper">';
                $html .= '<div class="gf-sl-inner-fabs">';

                // Add individual fabs with Font Awesome icons
                // $html .= '<div class="fab round" id="fab4" data-tooltip="Create"><i class="fas fa-pencil-alt"></i></div>';
                foreach ($data as $socialNetwork => $url) {
                        $accountName = $this->gf_social_icons_get_account_name_from_string($socialNetwork);
                        if ($url != '') {
                                $html .= '<a href="' . $url . '" class="fab round" id="' . $accountName . '" data-tooltip="' . $accountName . '"  >' . $data_icon_list[$accountName]['icon'] . '</a>';
                        }

                }
                $html .= '</div>';
                $html .= '<div class="fab round" id="fab1"  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></div>';

                $html .= '</section>';
                $html .= '</section>';
                $html .= $this->gf_social_icons_get_style_settings($data_style);

                return $html;
        }
}
