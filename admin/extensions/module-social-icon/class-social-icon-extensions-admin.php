<?php

class Class_Social_Icon_Extensions
{
        private $socialList = array(
                'Facebook',
                'Instagram',
                'Twitter',
                'Linkedin',
                'GitHub',
                'CodePen',
                'Email',
                'GitLab',
                'Line',
                'Phone',
                'Pinterest',
                'RSS',
                'Reddit',
                'Slack',
                'Snapchat',
                'SoundCloud',
                'Strava',
        );
        public function __construct()
        {
                add_action('customize_register', array($this, 'gutefy_social_icons_customizer_settings'));
        }

        public function gutefy_social_icons_customizer_settings($wp_customize)
        {
                require_once plugin_dir_path(__FILE__) . 'class-custom-icon-control.php';
                // Create a namespace for Gutefy settings
                $gutefy_namespace = 'gutefy_settings_';
                $gutefy_extensions_namespace = '_social_icon';
                $this->social_handler($wp_customize, $gutefy_namespace, $gutefy_extensions_namespace);

                // Add Gutefy Panel
                $wp_customize->add_panel(
                        $gutefy_namespace . 'core-panel' . $gutefy_extensions_namespace,
                        array(
                                'title' => __('Gutefy Social Icons', 'gutefy-social-icons'),
                                'description' => '<p>Gutefy Extensions for website enhancement</p>',
                                'priority' => 160,
                        )
                );


                // Add Gutefy Section under the Gutefy Panel
                $wp_customize->add_section(
                        $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
                        array(
                                'title' => __('Style Settings', 'gutefy-social-icons'),
                                'priority' => 2,
                                'panel' => $gutefy_namespace . 'core-panel' . $gutefy_extensions_namespace,
                        )
                );

                $wp_customize->add_section(
                        $gutefy_namespace . 'accounts' . $gutefy_extensions_namespace,
                        array(
                                'title' => __('Social Accounts', 'gutefy-social-icons'),
                                'priority' => 1,
                                'panel' => $gutefy_namespace . 'core-panel' . $gutefy_extensions_namespace,
                        )
                );

                // Add color control under Gutefy social icons section
                $wp_customize->add_setting(
                        $gutefy_namespace . 'color' . $gutefy_extensions_namespace,
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
                                $gutefy_namespace . 'color' . $gutefy_extensions_namespace,
                                array(
                                        'label' => __('Icon Color', 'gutefy-social-icons'),
                                        'section' => $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
                                        'priority' => 31,
                                )
                        )
                );

                // Add background color control under Gutefy social icons section
                $wp_customize->add_setting(
                        $gutefy_namespace . 'bg_color' . $gutefy_extensions_namespace,
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
                                $gutefy_namespace . 'bg_color' . $gutefy_extensions_namespace,
                                array(
                                        'label' => __('Background Color', 'gutefy-social-icons'),
                                        'section' => $gutefy_namespace . 'settings' . $gutefy_extensions_namespace,
                                        'priority' => 32,
                                )
                        )
                );

        }

        function single_social_handler($wp_customize, $social_name, $gutefy_namespace, $gutefy_extensions_namespace)
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
                                'section' => $gutefy_namespace . 'accounts' . $gutefy_extensions_namespace,
                                'type' => 'url',
                                'priority' => 30,
                                'input_attrs' => array(
                                        'class' => "gutefy-social__url $social_name",
                                        'placeholder' => __('https://'),
                                ),
                        )
                );

                // Add an icon control
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
                        new Class_Custom_Icon_Control(
                                $wp_customize,
                                "gutefy_social_icon_$social_name",
                                array(
                                        'label' => __("Custom Fontawsom Icon Class", 'gutefy-social-icons'),
                                        'section' => $gutefy_namespace . 'accounts' . $gutefy_extensions_namespace,
                                        'type' => 'text',
                                        'priority' => 30,
                                        'custom_string' => $social_name, // Pass your custom string here
                                        'input_attrs' => array(
                                                'class' => "gutefy-social__icon $social_name",
                                        ),
                                )
                        )
                );
        }

        function social_handler($wp_customize, $gutefy_namespace, $gutefy_extensions_namespace)
        {

                foreach ($this->socialList as $socialNetwork) {
                        $this->single_social_handler($wp_customize, $socialNetwork, $gutefy_namespace, $gutefy_extensions_namespace);
                }
        }
}