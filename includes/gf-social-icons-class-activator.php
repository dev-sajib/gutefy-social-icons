<?php
/**
 * Fired during plugin activation
 *
 * @link https://gutefy.com
 * @since 1.0.0
 *
 * @package Gutefy_Social_Icons
 * @subpackage Gutefy_Social_Icons/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since 1.0.0
 * @package Gutefy_Social_Icons
 * @subpackage Gutefy_Social_Icons/includes
 * @author Gutefy <gutefy.2023@gmail.com>
 */
class Gf_social_icons_class_activator
{
	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since 1.0.0
	 */
	public static function activate()
	{
		// $activator = new self();
		// $activator->gf_social_icons_create_db();
	}

	public function gf_social_icons_create_db()
	{
		global $wpdb;

		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . '_gf_social_icons';
		$sql = "CREATE TABLE $table_name (
	id int(11) NOT NULL AUTO_INCREMENT,
	social_account_address VARCHAR(200) NOT NULL,
	PRIMARY KEY (id)
	) $charset_collate";

		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		if (!function_exists('dbDelta')) {
			require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		}

		// Create or update the table
		$result = dbDelta($sql);

		// Check for errors during table creation
		if (is_wp_error($result)) {
			error_log("Error creating database table: " . $result->get_error_message());
			wp_die("Error creating database table. Check the error log for details.");
		}
	}
}
