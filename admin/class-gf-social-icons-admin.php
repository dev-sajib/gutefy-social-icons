<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://gutefy.com
 * @since      1.0.0
 *
 * @package    Gutefy_Social_Icons
 * @subpackage Gutefy_Social_Icons/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Gutefy_Social_Icons
 * @subpackage Gutefy_Social_Icons/admin
 * @author     Gutefy <gutefy.2023@gmail.com>
 */
class Gutefy_Social_Icons_Admin
{

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{
		require_once plugin_dir_path(__FILE__) . 'src/gf-social-icons-class-content-controller-admin.php';
		
		$this->plugin_name = $plugin_name; 
		$this->version = $version;
		
		add_action( 'customize_preview_init', [$this,'enqueue_customizer_scripts'] );
	}
	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles()
	{
		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/gf-social-icons-admin.min.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_customizer_scripts(){
		wp_enqueue_script('gutefy-social-icon-admin-customizer', plugin_dir_url(__FILE__) . './js/gf-social-icons-customizer-admin.min.js', array( 'jquery','customize-preview' ), $this->version, true);
	}
	public function enqueue_scripts()
	{
		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/gf-social-icons-admin.min.js', array( 'jquery' ), $this->version, false);
	}

}
