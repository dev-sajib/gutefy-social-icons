<?php

require_once plugin_dir_path(__FILE__) . '../../../admin/src/gf-social-icons-class-list-of-account-admin.php';
require_once plugin_dir_path(__FILE__) . './gf-social-icons-class-style-template.php';
class   Gf_social_icons_class_extensions_public extends Gf_social_icons_class_list_of_account_admin
{
        use Gf_social_icons_class_style_template;
        private $data = [];
        private $data_style = [];
        public $data_icon_list;
        function __construct()
        {
                $this->data_icon_list = $this->socialListDefaultIcon;
                add_filter('the_content', array($this, 'getIconData'));
        }
        public function getIconData($content)
        {
                foreach ($this->socialList as $socialNetwork) {
                        if($socialNetwork == 'Email'){
                                $generate_email_url = (get_option('gutefy_social_url_' . $socialNetwork) !='')?"mailto:".str_replace('http://','',get_option('gutefy_social_url_' . $socialNetwork)):'';
                                $data[$socialNetwork."_url"] = $generate_email_url;
                        }
                        elseif($socialNetwork == 'Phone'){
                                $generate_phone_url = (get_option('gutefy_social_url_' . $socialNetwork) !='')?"tel:".str_replace('http://','',get_option('gutefy_social_url_' . $socialNetwork)):'';
                                $data[$socialNetwork."_url"] = $generate_phone_url;
                        }
                        else{
                                $data[$socialNetwork . "_url"] = get_option('gutefy_social_url_' . $socialNetwork);
                        }
                }
                $data_style['gutefy_settings_color_social_icon'] = get_option("gutefy_settings_color_social_icon", "");
                $data_style['gutefy_settings_bg_color_social_icon'] = get_option("gutefy_settings_bg_color_social_icon", "");
                $data_style['gutefy_settings_hover_bg_color_social_icon'] = get_option("gutefy_settings_hover_bg_color_social_icon", "");
                $data_style['gutefy_settings_hover_color_social_icon'] = get_option("gutefy_settings_hover_color_social_icon", "");
                $data_style['gutefy_settings_icon_size_social_icon'] = get_option("gutefy_settings_icon_size_social_icon", "");
                $data_style['gutefy_settings_icon_wrapper_size_social_icon'] = get_option("gutefy_settings_icon_wrapper_size_social_icon", "");
                
                // var_dump($data_style);
                $content = $this->render_frontend($content, $data, $data_style);
                return $content;
        }
        function render_frontend($html, $data, $data_style)
        {
                // Concatenate HTML
                
                $new_html = $this->markup($html, $data, $data_style);

                return $new_html;
        }

        function markup($html, $data, $data_style)
        {
                if ($data) {
                        $markup_style = get_option("gutefy_settings_selected_style_social_icon", "");
                        if ($markup_style === 'style1') {
                                $html = $this->styleOne($html, $data, $data_style, $this->data_icon_list);
                        } elseif ($markup_style === 'style2') {
                                $html = $this->styleTwo($html, $data, $data_style, $this->data_icon_list);
                        } else {
                                $html = $this->styleTwo($html, $data, $data_style, $this->data_icon_list);
                        }
                }
                return $html;
        }


}

new Gf_social_icons_class_extensions_public();
