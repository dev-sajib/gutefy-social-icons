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
    // Legacy option from earlier dev — harmless if absent.
    'gf_social_icons_disable_floating',
];

foreach ($gf_social_icons_options as $option_name) {
    delete_option($option_name);
}

// Multisite: also remove from each site.
if (is_multisite()) {
    $sites = function_exists('get_sites') ? get_sites(['fields' => 'ids']) : [];
    foreach ($sites as $site_id) {
        switch_to_blog((int) $site_id);
        foreach ($gf_social_icons_options as $option_name) {
            delete_option($option_name);
        }
        restore_current_blog();
    }
}

// Remove generated dynamic CSS folder.
$upload_dir  = wp_upload_dir();
$folder_path = trailingslashit($upload_dir['basedir']) . 'gf-social-icons-customizer';

if (is_dir($folder_path)) {
    $files = glob($folder_path . '/*');
    if (is_array($files)) {
        foreach ($files as $file) {
            if (is_file($file)) {
                @unlink($file);
            }
        }
    }
    @rmdir($folder_path);
}
