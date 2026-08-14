<?php
/**
 * Uninstall handler for Sticky Social Icons.
 *
 * Removes plugin options and the generated dynamic CSS folder when the user
 * deletes the plugin from the Plugins screen.
 *
 * @package Gutefy_Social_Icons
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Delete plugin options.
$gf_social_icons_options = [
    'gf_social_icons_general_settings',
    'gf_social_icons_open_in_new_tab_settings',
    'gf_social_icons_visibility_rules',
    'gf_social_icons_styles_setting',
    'gf_social_icons_position_horizontally',
    'gf_social_icons_tab_settings',
    'gf_social_icons_mobile_visiblity_settings',
    'gf_social_icons_layout',
    'gf_social_icons_use_brand_colors',
    'gf_social_icons_mobile_bottom_bar',
    'gf_social_icons_scroll_reveal',
    'gf_social_icons_animation',
    'gf_social_icons_toggle_button',
    // Legacy option from earlier dev — harmless if absent.
    'gf_social_icons_disable_floating',
];

foreach ($gf_social_icons_options as $gf_social_icons_option_name) {
    delete_option($gf_social_icons_option_name);
}

// Multisite: also remove from each site.
if (is_multisite()) {
    $gf_social_icons_sites = function_exists('get_sites') ? get_sites(['fields' => 'ids']) : [];

    foreach ($gf_social_icons_sites as $gf_social_icons_site_id) {
        switch_to_blog((int) $gf_social_icons_site_id);

        foreach ($gf_social_icons_options as $gf_social_icons_option_name) {
            delete_option($gf_social_icons_option_name);
        }

        restore_current_blog();
    }
}

// Remove generated dynamic CSS folder.
$gf_social_icons_upload_dir = wp_upload_dir();

if (empty($gf_social_icons_upload_dir['error'])) {
    $gf_social_icons_folder = trailingslashit($gf_social_icons_upload_dir['basedir']) . 'gf-social-icons-customizer';

    if (!function_exists('WP_Filesystem')) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
    }

    if (WP_Filesystem()) {
        global $wp_filesystem;

        if ($wp_filesystem->is_dir($gf_social_icons_folder)) {
            $wp_filesystem->delete($gf_social_icons_folder, true);
        }
    }
}
