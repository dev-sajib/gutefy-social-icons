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
                $twitter_url = get_theme_mod('gutefy_social_url_twitter', '');
                $facebook_url = get_theme_mod('gutefy_social_url_facebook', '');
                $whatsapp_url = get_theme_mod('gutefy_social_url_whatsapp', '');
                $paper_plane_url = get_theme_mod('gutefy_social_url_paper-plane', '');
                $instagram_url = get_theme_mod('gutefy_social_url_instagram', '');
                $social_icon_color = get_theme_mod("gutefy_social_color", "");
                $social_icon_bg_color = get_theme_mod("gutefy_social_bg_color", "");
                $data = [
                        'twitter' => $twitter_url,
                        'facebook' => $facebook_url,
                        'whatsapp' => $whatsapp_url,
                        'paper-plane' => $paper_plane_url,
                        'instagram' => $instagram_url,
                        'gutefy-social-icon-color' => $social_icon_color,
                        'gutefy-social-icon-bg-color' => $social_icon_bg_color,
                ];
                $content = $this->render_frontend($content, $data);
                return $content;
        }
        function render_frontend($html, $data)
        {
                // Concatenate HTML
                $html .= '<section class="gutefy-section-wrapper">';
                $html .= '<section class="section-wrapper">';

                // Floating Action Button
                $html .= '<div class="floating-action-button">';

                // Floating Button
                $html .= '<div class="share-btn">';
                $html .= '<i id="share-icon" class="fas fa-share-alt"></i>';
                $html .= '<i id="close-icon" class="fas fa-times"></i>';
                $html .= '</div>';

                // Expand Section
                $html .= '<ul>';
                if ($data['twitter']) {
                        $html .= '<li style="background:' . $data['gutefy-social-icon-bg-color'] . '"  ><a style="color:' . $data['gutefy-social-icon-color'] . '"  href=' . $data['twitter'] . '><i  class="fab fa-twitter"></i></a></li>';
                }
                if ($data['facebook']) {
                        $html .= '<li style="background:' . $data['gutefy-social-icon-bg-color'] . '"  ><a  style="color:' . $data['gutefy-social-icon-color'] . '" href=' . $data['facebook'] . '><i class="fab fa-facebook"></i></a></li>';
                }
                if ($data['whatsapp']) {
                        $html .= '<li style="background:' . $data['gutefy-social-icon-bg-color'] . '"  ><a  style="color:' . $data['gutefy-social-icon-color'] . '" href=' . $data['whatsapp'] . '><i class="fab fa-whatsapp"></i></a></li>';
                }
                if ($data['paper-plane']) {
                        $html .= '<li style="background:' . $data['gutefy-social-icon-bg-color'] . '"  ><a  style="color:' . $data['gutefy-social-icon-color'] . '" href=' . $data['paper-plane'] . '><i class="fas fa-paper-plane"></i></a></li>';
                }
                if ($data['instagram']) {
                        $html .= '<li style="background:' . $data['gutefy-social-icon-bg-color'] . '"  ><a  style="color:' . $data['gutefy-social-icon-color'] . '" href=' . $data['instagram'] . '><i class="fab fa-instagram"></i></a></li>';
                }
                $html .= '</ul>';

                $html .= '</div>'; // End Floating Action Button
                $html .= '</section>'; // End Section
                $html .= '</section>'; // End Section

                return $html;
        }


}

new Class_view_social_icon();