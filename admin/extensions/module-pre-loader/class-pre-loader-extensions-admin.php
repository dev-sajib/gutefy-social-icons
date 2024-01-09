<?php
class Class_pre_loader_extensions_admin
{
        public function __construct()
        {
                add_action('customize_register', array($this, 'gutefy_pre_loader_customizer_settings'));
        }

        public function gutefy_pre_loader_customizer_settings($wp_customize)
        {
                // Create a namespace for Gutefy settings
                $gutefy_namespace = 'gutefy_settings_';
                $gutefy_extensions_namespace = '_pre_loader';

                // Add Gutefy Panel
                $wp_customize->add_section(
                        $gutefy_namespace . 'core-panel' . $gutefy_extensions_namespace,
                        array(
                                'title' => __('Gutefy Pre Loader', 'website-extensions'),
                                'description' => '<p>Gutefy Extensions for website enhancement</p>',
                                'priority' => 160,
                        )
                );

                // $wp_customize->add_section(
                //         $gutefy_namespace . 'accounts' . $gutefy_extensions_namespace,
                //         array(
                //                 'title' => __('Pre Loader Style', 'website-extensions'),
                //                 'priority' => 1,
                //                 'panel' => $gutefy_namespace . 'core-panel' . $gutefy_extensions_namespace,
                //         )
                // );
                // // Add color control under Gutefy social icons section for icon color
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
                                        'label' => __('Icon Color', 'website-extensions'),
                                        'section' => $gutefy_namespace . 'core-panel' . $gutefy_extensions_namespace,
                                        'priority' => 2,
                                )
                        )
                );

        }
}