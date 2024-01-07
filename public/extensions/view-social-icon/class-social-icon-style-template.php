<?php

trait Class_social_icon_style_template
{
        private function get_style_settings($data_style)
        {
                // var_dump($data_style);
                $style = '';
                $style = '<style>';
                $style .= ':root{';
                $style .= ($data_style['gutefy_settings_color_social_icon'] != '') ? '--gutefy-secondary-color:' . $data_style['gutefy_settings_color_social_icon'] . ' !important;' : '';
                $style .= ($data_style['gutefy_settings_bg_color_social_icon'] != '') ? '--gutefy-primary-color:' . $data_style['gutefy_settings_bg_color_social_icon'] . ' !important;' : '';
                $style .= ($data_style['gutefy_settings_hover_color_social_icon'] != '') ? '--gutefy-secondary-hover-color:' . $data_style['gutefy_settings_hover_color_social_icon'] . ' !important;' : '';
                $style .= ($data_style['gutefy_settings_hover_bg_color_social_icon'] != '') ? '--gutefy-primary-hover-color:' . $data_style['gutefy_settings_hover_bg_color_social_icon'] . ' !important;' : '';
                $style .= '}';
                $style .= '</style>';
                return $style;
        }
        private function get_account_name_from_string($key)
        {
                $accountName = str_replace('_url', '', $key);
                return $accountName;
        }
        public function styleOne($html, $data, $data_style, $data_icon_list)
        {

                $allow_social_number = 5;
                $html .= '<section class="gutefy-section-wrapper style-one">';
                $html .= '<section class="section-wrapper">';

                // Floating Action Button
                $html .= '<div class="floating-action-button">';

                // Floating Button
                $html .= '<div class="share-btn">';
                $html .= '<i id="share-icon" class="fas fa-share-alt"></i>';
                $html .= '<i  id="close-icon" class="fas fa-times"></i>';
                $html .= '</div>';

                // Expand Section
                $html .= '<ul>';
                foreach ($data as $socialNetwork => $url) {
                        $accountName = $this->get_account_name_from_string($socialNetwork);
                        if ($url != '' && $allow_social_number != 0) {
                                $allow_social_number -= 1;
                                $html .= '<li ><a  href=' . $url . '><i  class="' . $data_icon_list[$accountName] . '"></i></a></li>';
                        }

                }
                $html .= '</ul>';

                $html .= '</div>'; // End Floating Action Button
                $html .= '</section>'; // End Section
                $html .= '</section>'; // End Section
                $html .= $this->get_style_settings($data_style);
                return $html;
        }
        public function styleTwo($html, $data, $data_style, $data_icon_list)
        {
                $html .= '<section class="gutefy-section-wrapper style-two">';
                $html .= '<section class="section-wrapper">';
                $html .= '<div class="inner-fabs">';

                // Add individual fabs with Font Awesome icons
                // $html .= '<div class="fab round" id="fab4" data-tooltip="Create"><i class="fas fa-pencil-alt"></i></div>';
                foreach ($data as $socialNetwork => $url) {
                        $accountName = $this->get_account_name_from_string($socialNetwork);
                        if ($url != '') {
                                $html .= '<a href="' . $url . '" class="fab round" id="' . $accountName . '" data-tooltip="' . $accountName . '"  ><i class="' . $data_icon_list[$accountName] . '"></i></a>';
                        }

                }
                $html .= '</div>';
                $html .= '<div class="fab round" id="fab1"  ><i class="fas fa-plus"></i></div>';

                $html .= '</section>';
                $html .= '</section>';
                $html .= $this->get_style_settings($data_style);

                return $html;
        }
}