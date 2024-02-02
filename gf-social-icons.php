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
 * This action is documented in includes/class-gf-social-icons-activator.php
 */
function activate_Gutefy_Social_Icons()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-gf-social-icons-activator.php';
	Gutefy_Social_Icons_Activator::activate();
}
/**
 * Add settings link to the plugin page.
 *
 * @param array  $links Array of plugin action links.
 * @param string $file  Path to the plugin file relative to the plugins directory.
 * @return array
 */
function gutify_plugin_action_links($links, $file)
{
	$settings_link = '<a href="' . admin_url('customize.php?autofocus[panel]=gutefy_settings_core_panel_social_icon&autofocus[section]=gutefy_settings_accounts_social_icon') . '">' . esc_html__('Settings', 'gf-social-icons') . '</a>';
	array_unshift($links, $settings_link);
	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), 'gutify_plugin_action_links',10,2 );



/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-gf-social-icons-deactivator.php
 */
function deactivate_Gutefy_Social_Icons()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-gf-social-icons-deactivator.php';
	Gutefy_Social_Icons_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_Gutefy_Social_Icons');
register_deactivation_hook(__FILE__, 'deactivate_Gutefy_Social_Icons');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-gf-social-icons.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_Gutefy_Social_Icons()
{

	$plugin = new Gutefy_Social_Icons();
	$plugin->run();

}
run_Gutefy_Social_Icons();
