<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://gutefy.com
 * @since             1.0.0
 * @package           Gutefy_Social_Icons
 *
 * @wordpress-plugin
 * Plugin Name:       Gutefy Social Icons 
 * Plugin URI:        https://gutefy.com
 * Description:       Extend the feature of your websites


 * Version:           1.0.0
 * Author:            Gutefy
 * Author URI:        https://gutefy.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       gf-social-icon
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('Gutefy_Social_Icons_VERSION', '1.0.0');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/gf-social-icons-class-activator.php
 */
function gf_social_icons_activate()
{
	require_once plugin_dir_path(__FILE__) . 'includes/gf-social-icons-class-activator.php';
	Gf_social_icons_class_activator::gf_social_icons_activate();
}
/**
 * Add settings link to the plugin page.
 *
 * @param array  $links Array of plugin action links.
 * @param string $file  Path to the plugin file relative to the plugins directory.
 * @return array
 */
function gf_social_icons_plugin_action_links($links, $file)
{
	$settings_link = '<a href="' . admin_url('customize.php?autofocus[panel]=gutefy_settings_core_panel_social_icon&autofocus[section]=gutefy_settings_accounts_social_icon') . '">' . esc_html__('Settings', 'gf-social-icons') . '</a>';
	array_unshift($links, $settings_link);
	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), 'gf_social_icons_plugin_action_links',10,2 );



/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/gf-social-icons-class-deactivator.php
 */
function gf_social_icons_deactivate()
{
	require_once plugin_dir_path(__FILE__) . 'includes/gf-social-icons-class-deactivator.php';
	Gf_social_icons_class_deactivator::gf_social_icons_deactivate();
}

register_activation_hook(__FILE__, 'gf_social_icons_activate');
register_deactivation_hook(__FILE__, 'gf_social_icons_deactivate');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/gf-social-icons-class.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function gf_social_icons_run()
{

	$plugin = new Gf_social_icons_class();
	$plugin->run();

}
gf_social_icons_run();
