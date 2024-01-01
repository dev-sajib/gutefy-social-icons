<?php
class Class_view_social_icon
{
        function __construct()
        {
                add_filter('the_content', array($this, 'getIconData'));
        }
        public function getIconData($content)
        {
                // Get the values from the Customizer settings
                $one_url = get_option('gutefy_social_url_one', '');
                $two_url = get_option('gutefy_social_url_two', '');
                $three_url = get_option('gutefy_social_url_three', '');
                $four_url = get_option('gutefy_social_url_four', '');
                $five_url = get_option('gutefy_social_url_five', '');

                $one_icon = get_option('gutefy_social_icon_one', '');
                $two_icon = get_option('gutefy_social_icon_two', '');
                $three_icon = get_option('gutefy_social_icon_three', '');
                $four_icon = get_option('gutefy_social_icon_four', '');
                $five_icon = get_option('gutefy_social_icon_five', '');

                $social_icon_color = get_option("gutefy_social_color", "");
                $social_icon_bg_color = get_option("gutefy_social_bg_color", "");
                $data = [
                        'one' => $one_url,
                        'two' => $two_url,
                        'three' => $three_url,
                        'four' => $four_url,
                        'five' => $five_url,
                        'one_icon' => $one_icon,
                        'two_icon' => $two_icon,
                        'three_icon' => $three_icon,
                        'four_icon' => $four_icon,
                        'five_icon' => $five_icon,
                        'gutefy-social-icon-color' => $social_icon_color,
                        'gutefy-social-icon-bg-color' => $social_icon_bg_color,
                ];
                $content = $this->render_frontend($content, $data);
                return $content;
        }
        function render_frontend($html, $data)
        {
                // Concatenate HTML

                $new_html = $this->markup_one($html, $data);
                return $new_html;
        }

        function markup_one($html, $data)
        {
                $html .= '<section class="gutefy-section-wrapper">';
                $html .= '<section class="section-wrapper">';

                // Floating Action Button
                $html .= '<div class="floating-action-button">';

                // Floating Button
                $html .= '<div style="background:' . $data['gutefy-social-icon-bg-color'] . '"  class="share-btn">';
                $html .= '<i style="color:' . $data['gutefy-social-icon-color'] . '" id="share-icon" class="fas fa-share-alt"></i>';
                $html .= '<i  style="color:' . $data['gutefy-social-icon-color'] . '" id="close-icon" class="fas fa-times"></i>';
                $html .= '</div>';

                // Expand Section
                $html .= '<ul>';
                if ($data['one'] && $data['one_icon']) {
                        $html .= '<li style="background:' . $data['gutefy-social-icon-bg-color'] . '"  ><a style="color:' . $data['gutefy-social-icon-color'] . '"  href=' . $data['one'] . '><i  class="' . $data['one_icon'] . '"></i></a></li>';
                }
                if ($data['two'] && $data['two_icon']) {
                        $html .= '<li style="background:' . $data['gutefy-social-icon-bg-color'] . '"  ><a  style="color:' . $data['gutefy-social-icon-color'] . '" href=' . $data['two'] . '><i class="' . $data['two_icon'] . '"></i></a></li>';
                }
                if ($data['three'] && $data['three_icon']) {
                        $html .= '<li style="background:' . $data['gutefy-social-icon-bg-color'] . '"  ><a  style="color:' . $data['gutefy-social-icon-color'] . '" href=' . $data['three'] . '><i class="' . $data['three_icon'] . '"></i></a></li>';
                }
                if ($data['four'] && $data['four_icon']) {
                        $html .= '<li style="background:' . $data['gutefy-social-icon-bg-color'] . '"  ><a  style="color:' . $data['gutefy-social-icon-color'] . '" href=' . $data['four'] . '><i class="' . $data['four_icon'] . '"></i></a></li>';
                }
                if ($data['five'] && $data['five_icon']) {
                        $html .= '<li style="background:' . $data['gutefy-social-icon-bg-color'] . '"  ><a  style="color:' . $data['gutefy-social-icon-color'] . '" href=' . $data['five'] . '><i class="' . $data['five_icon'] . '"></i></a></li>';
                }
                $html .= '</ul>';

                $html .= '</div>'; // End Floating Action Button
                $html .= '</section>'; // End Section
                $html .= '</section>'; // End Section

                return $html;
        }


}

new Class_view_social_icon();