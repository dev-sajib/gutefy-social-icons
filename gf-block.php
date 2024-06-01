<?php
/**
 * Plugin Name:       Gf Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gf-block
 *
 * @package GfBlock
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
function gf_social_icons__gf_social_icons__block_init()
{
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'gf_social_icons__gf_social_icons__block_init');



function gf_social_icons__customizer_register($wp_customize)
{

    require plugin_dir_path(__FILE__) . './classes/gf-social-icons-class-style-control.php';
    $wp_customize->register_control_type('Gf_social_icons_class_style_control');
    
    $wp_customize->add_setting('gf_social_icons_style_settings[hoverStyleControl]', ['type' => 'option']);
    $wp_customize->add_setting('gf_social_icons_style_settings[IconColor]', ['type' => 'option']);

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
        array('react', 'wp-components', 'wp-element', 'wp-i18n', 'customize-controls', 'wp-api'),
        $script_asset['version']
    );
    // wp_set_script_translations( 'gf-block-block-editor', 'gf-social-icons' );

    wp_localize_script(
        'gf-social-icons--customizer-editor',
        'GfSocialIconsSettings' ,
        get_option('gf_social_icons_style_settings', ''),
        
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
