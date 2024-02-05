<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly 
/**
 * Fired when the plugin is uninstalled.
 *
 * When populating this file, consider the following flow
 * of control:
 *
 * - This method should be static
 * - Check if the $_REQUEST content actually is the plugin name
 * - Run an admin referrer check to make sure it goes through authentication
 * - Verify the output of $_GET makes sense
 * - Repeat with other user roles. Best directly by using the links/query string parameters.
 * - Repeat things for multisite. Once for a single site in the network, once sitewide.
 *
 * This file may be updated more in future version of the Boilerplate; however, this is the
 * general skeleton and outline for how the file should work.
 *
 * For more information, see the following discussion:
 * https://github.com/tommcfarlin/WordPress-Plugin-Boilerplate/pull/123#issuecomment-28541913
 *
 * @link       https://gutefy.com
 * @since      1.0.0
 *
 * @package    Gutefy_Social_Icons
 */

// If uninstall not called from WordPress, then exit.
if (!defined('WP_UNINSTALL_PLUGIN')) {
	// global $wpdb;

	// $table_name = $wpdb->prefix . '_gf_social_icons';

	// // Check if the table exists before attempting to drop it
	// if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") == $table_name) {
	// 	$sql = "DROP TABLE $table_name";

	// 	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	// 	if (!function_exists('dbDelta')) {
	// 		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	// 	}

	// 	// Drop the table
	// 	$result = $wpdb->query($sql);

	// 	// Check for errors during table dropping
	// 	if ($wpdb->last_error !== '') {
	// 		error_log("Error dropping database table: " . $wpdb->last_error);
	// 		wp_die("Error dropping database table. Check the error log for details.");
	// 	}
	// }
	exit;
}
