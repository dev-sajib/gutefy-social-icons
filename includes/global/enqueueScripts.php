<?php
namespace GF_SOCIAL_ICONS\Global;

class EnqueueScripts
{
    public static function init()
    {
        add_action('customize_controls_enqueue_scripts', [__CLASS__, 'enqueue'], 10);
        add_action('wp_enqueue_scripts', [__CLASS__, 'view_enqueue_style']);
        add_action('wp_enqueue_scripts', [__CLASS__, 'view_enqueue_script']);
    }

    public static function enqueue()
    {
        $script_asset_path = PLUGIN_ROOT_DIRECTORY . '/build/customizer.asset.php';
        if (!file_exists($script_asset_path)) {
            throw new \Error(
                'You need to run `npm start` or `npm run build` for "Gutefy Social Icons" widget first.'
            );
        }
        $customizer_js = 'build/customizer.js';
        $script_asset = require ($script_asset_path);


        wp_enqueue_script(
            'gf-social-icons--customizer-editor',
            plugins_url($customizer_js, PLUGIN_ROOT_FILE),
            array('react', 'wp-components', 'jquery', 'wp-element', 'wp-i18n', 'customize-controls', 'wp-api'),
            $script_asset['version']
        );

        // wp_set_script_translations( 'gf-social-icons-block-editor', 'gf-social-icons' );

        wp_localize_script(
            'gf-social-icons--customizer-editor',
            'CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY',
            [
                'styleSettings' => Settings::CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY,
            ],
        );

        $customizer_css = 'build/customizer.css';
        wp_enqueue_style(
            'gf-social-icons--customizer-css',
            plugins_url($customizer_css, PLUGIN_ROOT_FILE),
            ['wp-components'],
            filemtime(PLUGIN_ROOT_DIRECTORY . "/$customizer_css")
        );
    }
    public static function view_enqueue_style()
    {
        $upload_dir = wp_upload_dir();
        $folder_path = $upload_dir['basedir'] . '/gf-social-icons-customizer';
        $view_dynamic_path = $folder_path . '/gf-social-icons-dynamic-style.css';

        // Enqueue the static CSS file
        $view_css = 'build/view.css';
        wp_enqueue_style(
            'gf-social-icons-view-css',
            plugins_url($view_css, PLUGIN_ROOT_FILE),
            array(), // Dependencies
            filemtime(plugin_dir_path(PLUGIN_ROOT_FILE) . $view_css) // Version based on file modification time
        );

        // Enqueue the dynamic CSS file if it exists
        if (file_exists($view_dynamic_path)) {
            wp_enqueue_style(
                'gf-social-icons-dynamic-view-css',
                $upload_dir['baseurl'] . '/gf-social-icons-customizer/gf-social-icons-dynamic-style.css',
                array(), // Dependencies
                filemtime($view_dynamic_path)
            );
        }
    }
    public static function view_enqueue_script()
    {

        $dir = PLUGIN_ROOT_DIRECTORY;

        $script_asset_path = "$dir/build/view.asset.php";
        if (!file_exists($script_asset_path)) {
            throw new Error(
                'You need to run `npm start` or `npm run build` for "Gutefy Social Icons" widget first.'
            );
        }
        $view_js = 'build/view.js';
        $script_asset = require ($script_asset_path);
        // wp_enqueue_style('gf-social-icons-google-font-loader', 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Mukta+Mahee:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900display=swap',[], false);

        // wp_enqueue_style(
        //     'gf-social-icons-google-font-loader',
        //     'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Mukta+Mahee:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        //     [],
        //     null
        // );
        wp_enqueue_script(
            'gf-social-icons--view-controller',
            plugins_url($view_js, PLUGIN_ROOT_FILE),
            array('react', 'wp-components', 'wp-element', 'wp-i18n', 'wp-api'),
            $script_asset['version']
        );


        $customizer_css = 'build/customizer.css';
        error_log('Enqueue File');
        wp_enqueue_style(
            'gf-social-icons--customizer',
            plugins_url($customizer_css, PLUGIN_ROOT_FILE),
            ['wp-components'],
            filemtime("$dir/$customizer_css")
        );


    }

}
