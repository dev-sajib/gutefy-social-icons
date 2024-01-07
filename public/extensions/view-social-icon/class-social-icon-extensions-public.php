<?php

require_once plugin_dir_path(__FILE__) . '../../../admin/extensions/module-social-icon/class-list-of-social-account.php';
require_once plugin_dir_path(__FILE__) . './class-social-icon-style-template.php';
class Class_view_social_icon extends Class_list_of_social_account
{
        use Class_social_icon_style_template;
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
                        $data[$socialNetwork . "_url"] = get_option('gutefy_social_url_' . $socialNetwork);
                }
                $data_style['gutefy-social-icon-color'] = get_option("gutefy_settings_color_social_icon", "");
                $data_style['gutefy-social-icon-bg-color'] = get_option("gutefy_settings_bg_color_social_icon", "");
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
                $markup_style = get_option("gutefy_settings_selected_style_social_icon", "");
                if ($markup_style === 'style1') {
                        $html = $this->styleOne($html, $data, $data_style, $this->data_icon_list);
                }
                if ($markup_style === 'style2') {
                        $html = $this->styleTwo($html, $data, $data_style, $this->data_icon_list);
                }

                return $html;
        }


}

new Class_view_social_icon();