<?php
/**
 * Plugin Name:       Gf Social Icons
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.1
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gf-social-icons
 *
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

require_once plugin_dir_path(__FILE__) . './classes/gf-social-icons-global-settings.php';
new Gf_social_icons_global_settings();


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
    // wp_set_script_translations( 'gf-block-block-editor', 'gf-social-icons' );

    wp_localize_script(
        'gf-social-icons--customizer-editor',
        'GfSocialIconsSettings',
        [
            'generalSettings' => get_option('gf_social_icons_general_settings', ''),
            'styleSettings' => get_option('gf_social_icons_style_settings', ''),
            'settingId' => 'gf_social_icons_style_settings[hoverStyleControl]',
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

