<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly 


class Gf_social_icons__class_style_controller_admin
{
	public function __construct()
	{
		add_action('customize_register', array($this, 'gf_social_icons__style_controller'));
	}

	public function gf_social_icons__style_controller($wp_customize)
	{	
		//initiate custom controller files
		require_once( plugin_dir_path(__FILE__) . './../controls/slider/gf_social_icons_class_control_slider.php');
		require_once( plugin_dir_path( __FILE__ ) . './../controls/select/gf_social_icons__class_control_select.php' );

		// Create a namespace for Gutefy settings
		$gf_social_icons__namespace = 'gutefy_settings_';
		$gf_social_icons__extensions_namespace = '_social_icon';

		// Add Gutefy Section under the Gutefy Panel
		$wp_customize->add_section(
			$gf_social_icons__namespace . 'settings' . $gf_social_icons__extensions_namespace,
			array(
				'title' => __('Style Settings', 'gf-social-icons'),
				'priority' => 2,
				'panel' => $gf_social_icons__namespace . 'core-panel' . $gf_social_icons__extensions_namespace,
			)
		);

		// Add color control under Gutefy social icons section for icon color
		$wp_customize->add_setting(
			$gf_social_icons__namespace . 'color' . $gf_social_icons__extensions_namespace,
			array(
				'default' => '#ffffff',
				'transport' => 'postMessage',
				'type' => 'option',
				'capability' => 'manage_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				$gf_social_icons__namespace . 'color' . $gf_social_icons__extensions_namespace,
				array(
					'label' => __('Icon Color', 'gf-social-icons'),
					'section' => $gf_social_icons__namespace . 'settings' . $gf_social_icons__extensions_namespace,
					'priority' => 2,
				)
			)
		);

		// Add color control under Gutefy social icons section for hover color
		$wp_customize->add_setting(
			$gf_social_icons__namespace . 'hover_color' . $gf_social_icons__extensions_namespace,
			array(
				'default' => '#F5AD3C',
				'transport' => 'postMessage',
				'type' => 'option',
				'capability' => 'manage_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				$gf_social_icons__namespace . 'hover_color' . $gf_social_icons__extensions_namespace,
				array(
					'label' => __('Icon Hover Color', 'gf-social-icons'),
					'section' => $gf_social_icons__namespace . 'settings' . $gf_social_icons__extensions_namespace,
					'priority' => 3,
				)
			)
		);


		// Add background color control under Gutefy social icons section
		$wp_customize->add_setting(
			$gf_social_icons__namespace . 'bg_color' . $gf_social_icons__extensions_namespace,
			array(
				'default' => '#000000',
				'transport' => 'postMessage',
				'type' => 'option',
				'capability' => 'manage_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				$gf_social_icons__namespace . 'bg_color' . $gf_social_icons__extensions_namespace,
				array(
					'label' => __('Icon Background Color', 'gf-social-icons'),
					'section' => $gf_social_icons__namespace . 'settings' . $gf_social_icons__extensions_namespace,
					'priority' => 3,
				)
			)
		);

		// Add hover background color control under Gutefy social icons section
		$wp_customize->add_setting(
			$gf_social_icons__namespace . 'hover_bg_color' . $gf_social_icons__extensions_namespace,
			array(
				'default' => '#086A61',
				'transport' => 'postMessage',
				'type' => 'option',
				'capability' => 'manage_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				$gf_social_icons__namespace . 'hover_bg_color' . $gf_social_icons__extensions_namespace,
				array(
					'label' => __('Hover Background Color', 'gf-social-icons'),
					'section' => $gf_social_icons__namespace . 'settings' . $gf_social_icons__extensions_namespace,
					'priority' => 4,
				)
			)
		);


		// Add style select control under Gutefy social icons section
		$wp_customize->add_setting(
			$gf_social_icons__namespace . 'selected_style' . $gf_social_icons__extensions_namespace,
			array(
				'default' => 'style2',
				'transport' => 'refresh',
				'type' => 'option',
				'capability' => 'manage_options',
			)
		);


		// ------------------
		$wp_customize->add_control(
			new Gf_social_icons_class_control_select(
				$wp_customize,
				$gf_social_icons__namespace . 'selected_style' . $gf_social_icons__extensions_namespace,
				array(
					'label' => __('Select Style', 'gf-social-icons'),
					'section' => $gf_social_icons__namespace . 'settings' . $gf_social_icons__extensions_namespace,
					'priority' => 1,
					// 'type' => 'select',
					'choices' => array(
						'style1' => __('Style 1', 'gf-social-icons'),
						'style2' => __('Style 2', 'gf-social-icons'),
					),
				)
			)
				);
		// ------------------
		// $wp_customize->add_control(
		// 	new WP_Customize_Control(
		// 		$wp_customize,
		// 		$gf_social_icons__namespace . 'selected_style' . $gf_social_icons__extensions_namespace,
		// 		array(
		// 			'label' => __('Select Style', 'gf-social-icons'),
		// 			'section' => $gf_social_icons__namespace . 'settings' . $gf_social_icons__extensions_namespace,
		// 			'priority' => 1,
		// 			'type' => 'select',
		// 			'choices' => array(
		// 				'style1' => __('Style 1', 'gf-social-icons'),
		// 				'style2' => __('Style 2', 'gf-social-icons'),
		// 			),
		// 		)
		// 	)
		// );
		// Add icon size select control under Gutefy social icons section
		$wp_customize->add_setting(
			$gf_social_icons__namespace . 'icon_size' . $gf_social_icons__extensions_namespace,
			array(

				'default' => '30',
				'transport' => 'postMessage',
				'capability' => 'manage_options',
				'type' => 'option'
			)
		);

		$wp_customize->add_control(
			new Gf_social_icons__class_control_slider(
				$wp_customize,
				$gf_social_icons__namespace . 'icon_size' . $gf_social_icons__extensions_namespace,
				array(
					'label' => __('Icon Size', 'gf-social-icons'),
					'section' => $gf_social_icons__namespace . 'settings' . $gf_social_icons__extensions_namespace,
					'input_attrs' => array(
						'min' => '0',
						'max' => '100',
						'step' => '1',
					),
				)
			)

		);
		// Add icon wrapper size select control under Gutefy social icons section
		$wp_customize->add_setting(
			$gf_social_icons__namespace . 'icon_wrapper_size' . $gf_social_icons__extensions_namespace,
			array(

				'default' => '60',
				'transport' => 'postMessage',
				'capability' => 'manage_options',
				'type' => 'option'
			)
		);

		$wp_customize->add_control(
			new Gf_social_icons__class_control_slider(
				$wp_customize,
				$gf_social_icons__namespace . 'icon_wrapper_size' . $gf_social_icons__extensions_namespace,
				array(
					'label' => __('Icon Wrapper Size', 'gf-social-icons'),
					'section' => $gf_social_icons__namespace . 'settings' . $gf_social_icons__extensions_namespace,
					'input_attrs' => array(
						'min' => '0',
						'max' => '200',
						'step' => '1',
					),
				)
			)

		);

	}
}
new Gf_social_icons__class_style_controller_admin();
