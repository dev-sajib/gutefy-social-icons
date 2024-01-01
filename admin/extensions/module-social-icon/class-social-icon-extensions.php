<?php

class Class_social_icon_extensions
{
        public function __construct()
        {
                add_action('customize_register', array($this, 'gutefy_social_icons_customizer_settings'));
        }

        public function gutefy_social_icons_customizer_settings($wp_customize)
        {
                require_once plugin_dir_path(__FILE__) . 'class-custom-icon-control.php';
                // Add Gutefy Panel
                $wp_customize->add_panel(
                        'gutefy-core-panel',
                        array(
                                'title' => __('Gutefy', 'gutefy-social-icons'),
                                'description' => '<p>Gutefy Extensions for website enhancement</p>',
                                'priority' => 160,
                        )
                );

                // Add Gutefy Section under the Gutefy Panel
                $wp_customize->add_section(
                        'gutefy-core-section',
                        array(
                                'title' => __('Gutefy social icons', 'gutefy-social-icons'),
                                'priority' => 30,
                                'panel' => 'gutefy-core-panel',
                        )
                );

                $this->socialHandellar($wp_customize);


                // Add color control
                $wp_customize->add_setting(
                        "gutefy_social_color",
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
                                "gutefy_social_color",
                                array(
                                        'label' => __('Icon Color', 'gutefy-social-icons'),
                                        'section' => 'gutefy-core-section',
                                        'settings' => "gutefy_social_color",
                                        'priority' => 31,
                                )
                        )
                );

                // Add background color control
                $wp_customize->add_setting(
                        "gutefy_social_bg_color",
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
                                "gutefy_social_bg_color",
                                array(
                                        'label' => __('Background Color', 'gutefy-social-icons'),
                                        'section' => 'gutefy-core-section',
                                        'settings' => "gutefy_social_bg_color",
                                        'priority' => 32,
                                )
                        )
                );

        }

        function singleSocialHandellar($wp_customize, $social_name)
        {
                // Add a URL control
                $wp_customize->add_setting(
                        "gutefy_social_url_$social_name",
                        array(
                                'type' => 'option',
                                'capability' => 'manage_options',
                                'default' => '',
                                'transport' => 'refresh',
                        )
                );

                $wp_customize->add_control(
                        "gutefy_social_url_$social_name",
                        array(
                                'label' => __(ucwords($social_name), 'gutefy-social-icons'),
                                'section' => 'gutefy-core-section',
                                'type' => 'url',
                                'priority' => 30,
                                'input_attrs' => array(
                                        'class' => "gutefy-social__url $social_name",
                                        'placeholder' => __('https://'),
                                ),
                        )
                );
                // Add a icon control
                $wp_customize->add_setting(
                        "gutefy_social_icon_$social_name",
                        array(
                                'type' => 'option',
                                'capability' => 'manage_options',
                                'default' => '',
                                'transport' => 'refresh',
                        )
                );

                $wp_customize->add_control(
                        new Class_custom_icon_control(
                                $wp_customize,
                                "gutefy_social_icon_$social_name",
                                array(
                                        'label' => __(ucwords($social_name), 'gutefy-social-icons'),
                                        'section' => 'gutefy-core-section',
                                        'type' => 'custom_icon',
                                        'priority' => 30,
                                        'input_attrs' => array(
                                                'class' => "gutefy-social__icon $social_name",
                                                'placeholder' => __('fas fa-facebook'),
                                        ),
                                )
                        )
                );

        }

        function socialHandellar($wp_customize)
        {
                $this->singleSocialHandellar($wp_customize, 'one');
                $this->singleSocialHandellar($wp_customize, 'two');
                $this->singleSocialHandellar($wp_customize, 'three');
                $this->singleSocialHandellar($wp_customize, 'four');
                $this->singleSocialHandellar($wp_customize, 'five');
        }
}