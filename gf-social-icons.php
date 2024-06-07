<?php
/**
 * Plugin Name:       Social Icons
 * Description:       Floting Social Icons Solutions.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.1
 * Author:            Gutefy
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gf-social-icons
 *
 * @package GfSocialIcons
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function gf_social_icons_insert_content()
{
    try {
        add_action('woocommerce_after_main_content', 'gf_social_icons_get_icon_data');
        add_filter('the_content', 'gf_social_icons_get_icon_data', 99999);
        add_filter('get_the_excerpt', 'gf_social_icons_get_icon_data', 99999);

    } catch (\Throwable $th) {
        //throw $th;
    }
}

function gf_social_icons_get_icon_data($content){
    $html = "<div id='gf_social_icons__wrapper' class='gutefy-section-parent-wrapper '></div>";
    $content .= $html;
    return $content; 
}
function gf_social_icons__customizer_register($wp_customize)
{

    require plugin_dir_path(__FILE__) . './classes/gf-social-icons-class-style-control.php';
    require plugin_dir_path(__FILE__) . './classes/gf-social-icons-class-general-control.php';

    $wp_customize->register_control_type('Gf_social_icons_class_style_control');
    $wp_customize->register_control_type('Gf_social_icons_class_general_control');


    $wp_customize->add_setting('gf_social_icons_general_settings[accountsUrl]', ['type' => 'option']);

    $wp_customize->add_setting('gf_social_icons_style_settings[hoverStyleControl]', ['type' => 'option']);
    
    $wp_customize->add_setting('gf_social_icons_style_settings[styles][--gutefy-icon-color]', ['type' => 'option','transport'=>'postMessage']);
    $wp_customize->add_setting('gf_social_icons_style_settings[styles][--gutefy-icon-color]', ['type' => 'option','transport'=>'postMessage']);
    $wp_customize->add_setting('gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-color]', ['type' => 'option','transport'=>'postMessage']);
    $wp_customize->add_setting('gf_social_icons_style_settings[styles][--gutefy-icon-hover-color]', ['type' => 'option','transport'=>'postMessage']);
    $wp_customize->add_setting('gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-hover-color]', ['type' => 'option','transport'=>'postMessage']);

    $wp_customize->add_setting('gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-position-right]', ['type' => 'option','transport'=>'postMessage']);
    $wp_customize->add_setting('gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-position-left]', ['type' => 'option','transport'=>'postMessage']);
    $wp_customize->add_setting('gf_social_icons_style_settings[styles][--gutefy-icon-wrapper-position-top]', ['type' => 'option','transport'=>'postMessage']);

}
add_action('customize_register', 'gf_social_icons__customizer_register', 10);

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
        array('react', 'wp-components','jquery', 'wp-element', 'wp-i18n', 'customize-controls', 'wp-api'),
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

gf_social_icons_insert_content();



//SECTION -  Frontend Section 
function gf_social_icons_enqueue_styles() {
    wp_enqueue_style('gf_social_icons_styles', plugin_dir_url(__FILE__) . 'build/view.css');
}

function gf_social_icons_enqueue_scripts() {


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



