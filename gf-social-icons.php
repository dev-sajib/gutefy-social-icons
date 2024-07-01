<?php
/**
 *
 * @link              https://gutefy.com
 * @since             1.0.0
 * @package           Gutefy_Social_Icons
 *
 * @wordpress-plugin
 * Plugin Name:       Gutefy Social Icons 
 * Plugin URI:        https://gutefy.com
 * Description:       Enhance your website with this robust plugin, effortlessly adding floating social icons for seamless display and interaction.


 * Version:           1.0.1
 * Author:            Gutefy
 * Author URI:        https://portfolio.gutefy.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       gf-social-icons
 * Domain Path:       /languages
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

require_once plugin_dir_path(__FILE__) . './classes/gf-social-icons-global-settings.php';
new Gf_social_icons_global_settings();

function gf_social_icons_plugin_action_links($links, $file)
{
	$settings_link = '<a href="' . admin_url('customize.php?autofocus[panel]=gutefy_settings_core_panel_social_icon&autofocus[section]=gutefy_settings_general_social_icon') . '">' . esc_html__('Settings', 'gf-social-icons') . '</a>';
	array_unshift($links, $settings_link);
	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), 'gf_social_icons_plugin_action_links',10,2 );


function gf_social_icons__customizer_scripts()
{
    $dir = __DIR__;

    $script_asset_path = "$dir/build/customizer.asset.php";
    if (!file_exists($script_asset_path)) {
        throw new Error(
            'You need to run `npm start` or `npm run build` for "Gutefy Social Icons" widget first.'
        );
    }
    $customizer_js = 'build/customizer.js';
    $script_asset = require ($script_asset_path);


    wp_enqueue_script(
        'gf-social-icons--customizer-editor',
        plugins_url($customizer_js, __FILE__),
        array('react', 'wp-components', 'jquery', 'wp-element', 'wp-i18n', 'customize-controls', 'wp-api'),
        $script_asset['version']
    );
    // wp_set_script_translations( 'gf-social-icons-block-editor', 'gf-social-icons' );

    wp_localize_script(
        'gf-social-icons--customizer-editor',
        'GfSocialIconsSettings',
        [
            'styleSettings' => get_option('gf_social_icons_style_settings', ''),
        ],




    );

    $customizer_css = 'build/customizer.css';
    wp_enqueue_style(
        'gf-social-icons--customizer',
        plugins_url($customizer_css, __FILE__),
        ['wp-components'],
        filemtime("$dir/$customizer_css")
    );
}
add_action('customize_controls_enqueue_scripts', 'gf_social_icons__customizer_scripts', 10);

function gf_social_icons_enqueue_styles()
{
    wp_enqueue_style('gf_social_icons_styles', plugin_dir_url(__FILE__) . 'build/view.css');
}

function gf_social_icons_enqueue_scripts()
{


    $dir = __DIR__;

    $script_asset_path = "$dir/build/view.asset.php";
    if (!file_exists($script_asset_path)) {
        throw new Error(
            'You need to run `npm start` or `npm run build` for "Gutefy Social Icons" widget first.'
        );
    }
    $view_js = 'build/view.js';
    $script_asset = require ($script_asset_path);


    wp_enqueue_script(
        'gf-social-icons--view-controller',
        plugins_url($view_js, __FILE__),
        array('react', 'wp-components', 'wp-element', 'wp-i18n', 'customize-controls', 'wp-api'),
        $script_asset['version']
    );

    wp_localize_script(
        'gf-social-icons--view-controller',
        'GfSocialIconsSettings',
        [
            'generalSettings' => get_option('gf_social_icons_general_settings', ''),
            'openInNewTab' => get_option('gf_social_icons_open_in_new_tab_settings', ''),
            'styleSettings' => get_option('gf_social_icons_style_settings', ''),
        ],
    );

    $customizer_css = 'build/customizer.css';
    wp_enqueue_style(
        'gf-social-icons--customizer',
        plugins_url($customizer_css, __FILE__),
        ['wp-components'],
        filemtime("$dir/$customizer_css")
    );


}

add_action('wp_enqueue_scripts', 'gf_social_icons_enqueue_styles');
add_action('wp_enqueue_scripts', 'gf_social_icons_enqueue_scripts');

