<?php

/**
 * Fired during plugin activation
 *
 * @link       https://gutefy.com
 * @since      1.0.0
 *
 * @package    Website_Extensions
 * @subpackage Website_Extensions/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Website_Extensions
 * @subpackage Website_Extensions/includes
 * @author     Gutefy <gutefy.2023@gmail.com>
 */
class Website_Extensions_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public function __construct(){
		add_filter( 'plugin_action_links', [$this,'gutify_plugin_action_links'], 10, 2 );
	}
	public static function activate() {
	}

	public function gutefy_plugin_action_links( $links, $file ) {    

		if ( $file == __FILE__ ) {
			$settings_link = '<a href="facebook.com' . esc_html__( 'Settings' ) . '</a>';
			array_unshift( $links, $settings_link );
		}

		return $links;
}

}