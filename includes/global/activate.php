<?php

namespace GF_SOCIAL_ICONS\Global;

class Activate
{

    public function __construct()
    {
        register_activation_hook(PLUGIN_ROOT_FILE, [$this, 'gf_activate_plugin']);
        add_action('widgets_init', [$this, 'gf_register_sidebar']);
        add_filter( 'plugin_action_links_' . PLUGIN_ROOT_BASENAME, [$this,'gf_social_icons_plugin_action_links'],10,2 );

    }

    public function gf_activate_plugin()
    {
        $this->create_gf_blog_dynamic_css_folder();
    }
    public function gf_social_icons_plugin_action_links($links, $file)
    {
        // error_log('hi from logo');
        $settings_link = '<a href="' . admin_url('customize.php?autofocus[panel]=gutefy_settings_core_panel_social_icon&autofocus[section]=gutefy_settings_general_social_icon') . '">' . esc_html__('Settings', 'gf-social-icons') . '</a>';
        array_unshift($links, $settings_link);
        return $links;
    }
    public function create_gf_blog_dynamic_css_folder()
    {

        $upload_dir = wp_upload_dir();
        $upload_path = $upload_dir['basedir'];
        $folder_name = 'gf-social-icons-customizer';
        $file_name = 'gf-social-icons-dynamic-style.css';
        $folder_path = $upload_path . '/' . $folder_name;
        $file_path = $folder_path . '/' . $file_name;
        $content = "/* This is a dynamic CSS file created by the gf-social-icons-customizer plugin. */\n";

        if (!file_exists($folder_path)) {
            wp_mkdir_p($folder_path);
        }

        if (!file_exists($file_path)) {
            file_put_contents($file_path, $content);
        }
    }
    public function gf_register_sidebar()
    {
        register_sidebar(
            array(
                'name' => 'Gutefy Single Blog Sidebar',
                'id' => 'gf-single-blog-sidebar',
                'before_widget' => '<div>',
                'after_widget' => '</div>',
                'before_title' => '<h2 class="rounded">',
                'after_title' => '</h2>',
            )
        );
    }
}
