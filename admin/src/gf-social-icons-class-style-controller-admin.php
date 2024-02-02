<?php
class Gf_social_icons_class_style_controller_admin
{
	public function __construct()
	{
		add_action('customize_register', array($this, 'gutify_social_icon_style_controller'));
	}

	public function gutify_social_icon_style_controller($wp_customize)
	{
		require_once(plugin_dir_path(__FILE__) . './../controls/gf_social_icons_class_control_slider.php');
		// Create a namespace for Gutefy settings
		$gutefy_namespace = 'gutefy_settings_';
		$gutefy_extensions_namespace = '_social_icon';

		// $wp_customize->selective_refresh->add_partial(
		// 	$gutefy_namespace.'selected_style'.$gutefy_extensions_namespace,
		// 	array(
		// 		'selector'	=>	'.gutefy-section-wrapper',
		// 	)
		// );
		// Add Gutefy Section under the Gutefy Panel
		$wp_customize->add_section(
			$gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
			array(
				'title' => __('Style Settings', 'gf-social-icons'),
				'priority' => 2,
				'panel' => $gutefy_namespace . 'core-panel' . $gutefy_extensions_namespace,
			)
		);

		// $wp_customize->add_setting(
		// 	$gutefy_namespace.'toggle_for_use_officeal_color'.$gutefy_extensions_namespace,
		// 	array(
		// 		'default'	=>	'sajib',
		// 		'transport'	=>	'refresh',
		// 		'type'		=>	'option',
		// 		'capability'	=>	'manage_options'
		// 	)
		// );
		// $wp_customize->add_control(
		// 	new Class_gf_social_icons_control_toggle(
		// 		$wp_customize,
		// 		$gutefy_namespace.'toggle_for_use_officeal_color'.$gutefy_extensions_namespace,
		// 		array(
		// 			'label' => __('Use Official Color', 'gf-social-icons'),
		// 			'section' => $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
		// 			'priority' => 2,
		// 		)
		// 	)
			
		// );

		// Add color control under Gutefy social icons section for icon color
		$wp_customize->add_setting(
			$gutefy_namespace . 'color' . $gutefy_extensions_namespace,
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
				$gutefy_namespace . 'color' . $gutefy_extensions_namespace,
				array(
					'label' => __('Icon Color', 'gf-social-icons'),
					'section' => $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
					'priority' => 2,
				)
			)
		);

		// Add color control under Gutefy social icons section for hover color
		$wp_customize->add_setting(
			$gutefy_namespace . 'hover_color' . $gutefy_extensions_namespace,
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
				$gutefy_namespace . 'hover_color' . $gutefy_extensions_namespace,
				array(
					'label' => __('Icon Hover Color', 'gf-social-icons'),
					'section' => $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
					'priority' => 3,
				)
			)
		);


		// Add background color control under Gutefy social icons section
		$wp_customize->add_setting(
			$gutefy_namespace . 'bg_color' . $gutefy_extensions_namespace,
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
				$gutefy_namespace . 'bg_color' . $gutefy_extensions_namespace,
				array(
					'label' => __('Icon Background Color', 'gf-social-icons'),
					'section' => $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
					'priority' => 3,
				)
			)
		);

		// Add hover background color control under Gutefy social icons section
		$wp_customize->add_setting(
			$gutefy_namespace . 'hover_bg_color' . $gutefy_extensions_namespace,
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
				$gutefy_namespace . 'hover_bg_color' . $gutefy_extensions_namespace,
				array(
					'label' => __('Hover Background Color', 'gf-social-icons'),
					'section' => $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
					'priority' => 4,
				)
			)
		);


		// Add style select control under Gutefy social icons section
		$wp_customize->add_setting(
			$gutefy_namespace . 'selected_style' . $gutefy_extensions_namespace,
			array(
				'default' => 'style2',
				'transport' => 'refresh',
				'type' => 'option',
				'capability' => 'manage_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				$gutefy_namespace . 'selected_style' . $gutefy_extensions_namespace,
				array(
					'label' => __('Select Style', 'gf-social-icons'),
					'section' => $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
					'priority' => 1,
					'type' => 'select',
					'choices' => array(
						'style1' => __('Style 1', 'gf-social-icons'),
						'style2' => __('Style 2', 'gf-social-icons'),
					),
				)
			)
		);
		// Add icon size select control under Gutefy social icons section
		$wp_customize->add_setting(
			$gutefy_namespace . 'icon_size' . $gutefy_extensions_namespace,
			array(

				'default' => '30',
				'transport' => 'postMessage',
				'capability' => 'manage_options',
				'type' => 'option'
			)
		);

		$wp_customize->add_control(
			new Gf_social_icons_class_control_slider(
				$wp_customize,
				$gutefy_namespace . 'icon_size' . $gutefy_extensions_namespace,
				array(
					'label' => __('Icon Size', 'gf-social-icons'),
					'section' => $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
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
			$gutefy_namespace . 'icon_wrapper_size' . $gutefy_extensions_namespace,
			array(

				'default' => '60',
				'transport' => 'postMessage',
				'capability' => 'manage_options',
				'type' => 'option'
			)
		);

		$wp_customize->add_control(
			new Gf_social_icons_class_control_slider(
				$wp_customize,
				$gutefy_namespace . 'icon_wrapper_size' . $gutefy_extensions_namespace,
				array(
					'label' => __('Icon Wrapper Size', 'gf-social-icons'),
					'section' => $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
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
new Gf_social_icons_class_style_controller_admin();
