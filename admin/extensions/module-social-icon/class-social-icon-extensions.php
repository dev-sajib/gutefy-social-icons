<?php

class Class_social_icon_extensions
{
        public function __construct()
        {
                add_action('customize_register', array($this, 'gutefy_social_icons_customizer_settings'));
        }

        public function gutefy_social_icons_customizer_settings($wp_customize)
        {
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
                                'default' => '',
                                'transport' => 'refresh',
                        )
                );

                $wp_customize->add_control(
                        "gutefy_social_url_$social_name",
                        array(
                                'label' => __($social_name, 'gutefy-social-icons'),
                                'section' => 'gutefy-core-section',
                                'type' => 'url',
                                'priority' => 30,
                                'input_attrs' => array(
                                        'class' => "gutefy-social__url $social_name",
                                        'placeholder' => __('https://'),
                                ),
                        )
                );
        }

        function socialHandellar($wp_customize)
        {
                $this->singleSocialHandellar($wp_customize, 'social_one');
                $this->singleSocialHandellar($wp_customize, 'social_two');
                $this->singleSocialHandellar($wp_customize, 'social_three');
                $this->singleSocialHandellar($wp_customize, 'social_four');
                $this->singleSocialHandellar($wp_customize, 'social_five');
        }
}
