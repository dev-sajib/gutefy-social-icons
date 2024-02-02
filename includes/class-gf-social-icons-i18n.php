<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://gutefy.com
 * @since      1.0.0
 *
 * @package    Gutefy_Social_Icons
 * @subpackage Gutefy_Social_Icons/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Gutefy_Social_Icons
 * @subpackage Gutefy_Social_Icons/includes
 * @author     Gutefy <gutefy.2023@gmail.com>
 */
class Gutefy_Social_Icons_i18n
{


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain()
	{

		load_plugin_textdomain(
			'gf-social-icons',
			false,
			dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
		);

	}



}
