<?php

trait Class_social_icon_style_template
{
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
                $html .= '<div style="background:' . $data_style['gutefy-social-icon-bg-color'] . '"  class="share-btn">';
                $html .= '<i style="color:' . $data_style['gutefy-social-icon-color'] . '" id="share-icon" class="fas fa-share-alt"></i>';
                $html .= '<i  style="color:' . $data_style['gutefy-social-icon-color'] . '" id="close-icon" class="fas fa-times"></i>';
                $html .= '</div>';

                // Expand Section
                $html .= '<ul>';
                foreach ($data as $socialNetwork => $url) {
                        $accountName = $this->get_account_name_from_string($socialNetwork);
                        if ($url != '' && $allow_social_number != 0) {
                                $allow_social_number -= 1;
                                $html .= '<li style="background:' . $data_style['gutefy-social-icon-bg-color'] . '"  ><a style="color:' . $data_style['gutefy-social-icon-color'] . '"  href=' . $url . '><i  class="' . $data_icon_list[$accountName] . '"></i></a></li>';
                        }

                }
                $html .= '</ul>';

                $html .= '</div>'; // End Floating Action Button
                $html .= '</section>'; // End Section
                $html .= '</section>'; // End Section
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
                                $html .= '<a href="' . $url . '" class="fab round" id="' . $accountName . '" data-tooltip="' . $accountName . '"  style="background:' . $data_style['gutefy-social-icon-bg-color'] . ' ; color:' . $data_style['gutefy-social-icon-color'] . '" ><i class="' . $data_icon_list[$accountName] . '"></i></a>';
                        }

                }
                $html .= '</div>';

                // Add standalone fab with Font Awesome icon
                $html .= '<div class="fab round" id="fab1"  style="background:' . $data_style['gutefy-social-icon-bg-color'] . ' ; color:' . $data_style['gutefy-social-icon-color'] . '"><i class="fas fa-plus"></i></div>';

                $html .= '</section>';
                $html .= '</section>';

                return $html;
        }
}