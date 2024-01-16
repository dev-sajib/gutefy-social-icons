<?php
class Class_gutify_social_icon_style_controller
{
        public function __construct()
        {
                add_action('customize_register', array($this, 'gutify_social_icon_style_controller'));
        }

        public function gutify_social_icon_style_controller($wp_customize)
        {
                // Create a namespace for Gutefy settings
                $gutefy_namespace = 'gutefy_settings_';
                $gutefy_extensions_namespace = '_social_icon';

                // Add Gutefy Section under the Gutefy Panel
                $wp_customize->add_section(
                        $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
                        array(
                                'title' => __('Style Settings', 'gf-social-icon'),
                                'priority' => 2,
                                'panel' => $gutefy_namespace . 'core-panel' . $gutefy_extensions_namespace,
                        )
                );

                // Add color control under Gutefy social icons section for icon color
                $wp_customize->add_setting(
                        $gutefy_namespace . 'color' . $gutefy_extensions_namespace,
                        array(
                                'default' => '#ffffff',
                                'transport' => 'refresh',
                                'type' => 'option',
                                'capability' => 'manage_options',
                        )
                );

                $wp_customize->add_control(
                        new WP_Customize_Color_Control(
                                $wp_customize,
                                $gutefy_namespace . 'color' . $gutefy_extensions_namespace,
                                array(
                                        'label' => __('Icon Color', 'gf-social-icon'),
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
                                'transport' => 'refresh',
                                'type' => 'option',
                                'capability' => 'manage_options',
                        )
                );

                $wp_customize->add_control(
                        new WP_Customize_Color_Control(
                                $wp_customize,
                                $gutefy_namespace . 'hover_color' . $gutefy_extensions_namespace,
                                array(
                                        'label' => __('Icon Hover Color', 'gf-social-icon'),
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
                                'transport' => 'refresh',
                                'type' => 'option',
                                'capability' => 'manage_options',
                        )
                );

                $wp_customize->add_control(
                        new WP_Customize_Color_Control(
                                $wp_customize,
                                $gutefy_namespace . 'bg_color' . $gutefy_extensions_namespace,
                                array(
                                        'label' => __('Icon Background Color', 'gf-social-icon'),
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
                                'transport' => 'refresh',
                                'type' => 'option',
                                'capability' => 'manage_options',
                        )
                );

                $wp_customize->add_control(
                        new WP_Customize_Color_Control(
                                $wp_customize,
                                $gutefy_namespace . 'hover_bg_color' . $gutefy_extensions_namespace,
                                array(
                                        'label' => __('Hover Background Color', 'gf-social-icon'),
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
                                        'label' => __('Select Style', 'gf-social-icon'),
                                        'section' => $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
                                        'priority' => 1,
                                        'type' => 'select',
                                        'choices' => array(
                                                'style1' => __('Style 1', 'gf-social-icon'),
                                                'style2' => __('Style 2', 'gf-social-icon'),
                                        ),
                                )
                        )
                );


        }
}