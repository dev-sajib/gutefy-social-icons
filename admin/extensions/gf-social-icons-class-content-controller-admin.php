<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly 



require_once plugin_dir_path(__FILE__) . 'gf-social-icons-class-style-controller-admin.php';
class Gf_social_icons_class_content_controller_admin
{
	public function __construct()
	{
		add_action('customize_register', array($this, 'gutefy_social_icons_customizer_settings'));
	}

	public function gutefy_social_icons_customizer_settings($wp_customize)
	{
		require_once (plugin_dir_path(__FILE__) . './../controls/account-repeater-control/gf_social_icons__class_account_repeater_control_setting.php');
		// Create a namespace for Gutefy settings
		$gf_social_icons__namespace = 'gutefy_settings_';
		$gf_social_icons__extensions_namespace = '_social_icon';
		$this->gf_social_icons_social_handler($wp_customize, $gf_social_icons__namespace, $gf_social_icons__extensions_namespace);

		// Add Gutefy Panel
		$wp_customize->add_panel(
			$gf_social_icons__namespace . 'core-panel' . $gf_social_icons__extensions_namespace,
			array(
				'title' => esc_html(__('Gutefy Social Icons', 'gf-social-icons')),
				'description' => '<p>Gutefy Extensions for website enhancement</p>',
				'priority' => 160,
			)
		);

		$wp_customize->add_section(
			$gf_social_icons__namespace . 'accounts' . $gf_social_icons__extensions_namespace,
			array(
				'title' => esc_html(__('Social Accounts', 'gf-social-icons')),
				'priority' => 1,
				'panel' => $gf_social_icons__namespace . 'core-panel' . $gf_social_icons__extensions_namespace,
			)
		);



	}
	function gf_social_icons_custom_url_validation($error_object, $input, $setting_object)
	{
		$social_account_name = str_replace('gutefy_social_url_', '', $setting_object->id);
		// Remove leading and trailing whitespaces
		$input = trim($input);

		if ($input != '') {
			// Check if it's a valid URL, email, or phone number based on the social account name
			switch ($social_account_name) {
				case 'Email':
					if (!filter_var($input, FILTER_VALIDATE_EMAIL)) {
						// Email is not valid
						return false;
					}
					break;
				case 'Phone':
					// Add your custom phone number validation logic here
					// For simplicity, let's assume a basic check for digits and length
					if (!preg_match('/^\d{10,}$/', $input)) {
						// Phone number is not valid
						return false;
					}
					// For phone numbers, return the input without esc_url_raw
					return $input;
				default:
					// Assume it's a URL for other social accounts
					if (!filter_var($input, FILTER_VALIDATE_URL)) {
						// URL is not valid
						return false;
					}
			}
		}

		return esc_url_raw($input);
	}


	function gf_social_icons_single_social_handler($wp_customize, $gf_social_icons__namespace, $gf_social_icons__extensions_namespace)
	{
		$wp_customize->add_setting(
			$gf_social_icons__namespace . 'accounts' . $gf_social_icons__extensions_namespace,
			array(
				'default'	=>	json_encode( array("1"=> array('icon' => 'facebook','url'=>'https://facebook.com')) ),
				'transport' => 'postMessage',
				'type' => 'option',
				'capability' => 'manage_options',
			)
		);


		// ------------------
		$wp_customize->add_control(
			new Gf_social_icons_class_account_repeater_control_setting(
				$wp_customize,
				$gf_social_icons__namespace . 'accounts' . $gf_social_icons__extensions_namespace,
				array(
					'label' => __('Accounts List', 'gf-social-icons'),
					'section' => $gf_social_icons__namespace . 'accounts' . $gf_social_icons__extensions_namespace,
					'priority' => 1,
					'settings' => [
						'select_social_icon' => $gf_social_icons__namespace . 'accounts' . $gf_social_icons__extensions_namespace,
					]
				)
			)
		);

		// // Add a URL control
		// $wp_customize->add_setting(
		// 	"gutefy_social_url_$social_name",
		// 	array(
		// 		'type' => 'option',
		// 		'capability' => 'manage_options',
		// 		'default' => '',
		// 		'transport' => 'refresh',
		// 		// 'sanitize_callback' => 'esc_url_raw',
		// 		'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
		// 	)
		// );

		// $wp_customize->add_control(
		// 	"gutefy_social_url_$social_name",
		// 	array(
		// 		'label' => ucwords($social_name),
		// 		'section' => $gf_social_icons__namespace . 'accounts' . $gf_social_icons__extensions_namespace,
		// 		'type' => 'text',
		// 		'priority' => 30,
		// 		'input_attrs' => array(
		// 			'class' => "gutefy-social__url $social_name",
		// 			'placeholder' => 'https://',
		// 		),
		// 	)
		// );
	}

	function gf_social_icons_social_handler($wp_customize, $gf_social_icons__namespace, $gf_social_icons__extensions_namespace)
	{

			$this->gf_social_icons_single_social_handler($wp_customize,$gf_social_icons__namespace, $gf_social_icons__extensions_namespace);
	}
}
new Gf_social_icons_class_content_controller_admin();
