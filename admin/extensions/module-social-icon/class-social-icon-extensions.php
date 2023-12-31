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
                $this->singleSocialHandellar($wp_customize, 'twitter');
                $this->singleSocialHandellar($wp_customize, 'facebook');
                $this->singleSocialHandellar($wp_customize, 'whatsapp');
                $this->singleSocialHandellar($wp_customize, 'paper-plane');
                $this->singleSocialHandellar($wp_customize, 'instagram');

        }
}