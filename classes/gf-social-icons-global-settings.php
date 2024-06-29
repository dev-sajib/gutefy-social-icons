<?php

class Gf_social_icons_global_settings
{

  private $gf_social_icons__namespace = 'gutefy_settings_';
  private $gf_social_icons__extensions_namespace = '_social_icon';
  private $gf_social_icons_style_settings = [
    '--gutefy-icon-color',
    '--gutefy-icon-wrapper-color',
    '--gutefy-icon-hover-color',
    '--gutefy-icon-wrapper-hover-color',
    '--gutefy-icon-wrapper-position-right',
    '--gutefy-icon-wrapper-position-left',
    '--gutefy-icon-wrapper-position-top',
    '--gutefy-icon-size',
    '--gutefy-icon-wrapper-size',
  ];

  public function __construct()
  {
    add_action('customize_register', array($this, 'gf_social_icons__register_customizer'), 10);
    $this->gf_social_icons_insert_content();
  }
  function gf_social_icons_insert_content()
  {
    try {
      add_action('woocommerce_after_main_content', [$this, 'gf_social_icons_get_icon_data']);
      add_filter('the_content', [$this, 'gf_social_icons_get_icon_data'], 99999);
      add_filter('get_the_excerpt', [$this, 'gf_social_icons_get_icon_data'], 99999);

    } catch (\Throwable $th) {
      //throw $th;
    }
  }
  function gf_social_icons_get_icon_data($content)
  {
    $html = "<div id='gf_social_icons__wrapper' class='gutefy-section-parent-wrapper '></div>";
    $content .= $html;
    return $content;
  }

  public function gf_social_icons__register_customizer($wp_customize)
  {
    require_once plugin_dir_path(__FILE__) . './reactControl/gf-social-icons-general-control.php';
    require_once plugin_dir_path(__FILE__) . './reactControl/gf-social-icons-styles-control.php';

    $this->gf_social_icons__panel($wp_customize);
    $this->gf_social_icons__sections($wp_customize);
    $this->gf_social_icons__settings($wp_customize);
    $this->gf_social_icons__controller($wp_customize);
    $this->gf_social_icons__selective_refresh($wp_customize);

  }
  public function gf_social_icons__panel($wp_customize)
  {

    $wp_customize->add_panel(
      $this->gf_social_icons__namespace . 'core-panel' . $this->gf_social_icons__extensions_namespace,
      array(
        'title' => esc_html(__('Gutefy Social Icons', 'gf-social-icons')),
        'description' => '<p>Gutefy Extensions for website enhancement</p>',
        'priority' => 1,
      )
    );
  }

  public function gf_social_icons__sections($wp_customize)
  {
    $wp_customize->add_section(
      $this->gf_social_icons__namespace . 'general' . $this->gf_social_icons__extensions_namespace,
      array(
        'title' => esc_html(__('General', 'gf-social-icons')),
        'priority' => 1,
        'panel' => $this->gf_social_icons__namespace . 'core-panel' . $this->gf_social_icons__extensions_namespace,
      )
    );
    $wp_customize->add_section(
      $this->gf_social_icons__namespace . 'styles' . $this->gf_social_icons__extensions_namespace,
      array(
        'title' => esc_html(__('Styles', 'gf-social-icons')),
        'priority' => 1,
        'panel' => $this->gf_social_icons__namespace . 'core-panel' . $this->gf_social_icons__extensions_namespace,
      )
    );
  }
  public function gf_social_icons_custom_url_validation($error_object, $input, $setting_object)
  {
    print_r($setting_object);
    print_r($input);
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

  public function gf_social_icons__settings($wp_customize)
  {

    $wp_customize->add_setting(
      'gf_social_icons_general_settings',
      array(
        'default' => [['facebook', 'facebook.com']],
        'transport' => 'postMessage',
        'type' => 'option',
        'capability' => 'manage_options',
        // 'sanitize_callback' => 'esc_url_raw',
        // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        // 	
      )
    );

    $wp_customize->add_setting(
      'gf_social_icons_open_in_new_tab_settings',
      array(
        'default' => false,
        'transport' => 'postMessage',
        'type' => 'option',
        'capability' => 'manage_options',
      )
    );

    $wp_customize->add_setting(
      'gf_social_icons_style_settings',
      array(
        'transport' => 'postMessage',
        'type' => 'option',
        'capability' => 'manage_options',
      )
    );

    foreach ($this->gf_social_icons_style_settings as $gf_social_icons_setting) {
      $wp_customize->add_setting("gf_social_icons_style_settings[styles][$gf_social_icons_setting]", ['type' => 'option', 'transport' => 'postMessage']);
    }

  }

  public function gf_social_icons__controller($wp_customize)
  {
    $wp_customize->add_control(
      new Gf_social_icons_general_control(
        $wp_customize,
        'gf_social_icons_general_settings',
        array(
          'label' => __('Accounts List', 'gf-social-icons'),
          'section' => $this->gf_social_icons__namespace . 'general' . $this->gf_social_icons__extensions_namespace,
          'priority' => 1,
        )
      )
    );
    $wp_customize->add_control(
      new Gf_social_icons_styles_control(
        $wp_customize,
        $this->gf_social_icons__namespace . 'styles' . $this->gf_social_icons__extensions_namespace,
        array(
          'label' => __('Accounts List', 'gf-social-icons'),
          'section' => $this->gf_social_icons__namespace . 'styles' . $this->gf_social_icons__extensions_namespace,
          'priority' => 1,
        )
      )
    );
  }
  public function gf_social_icons__selective_refresh($wp_customize)
  {

    $wp_customize->selective_refresh->add_partial('gf_social_icons_general_settings_partial', [
      'selector' => ".gf_social_icons_social_float",
      'settings' => [
        "gf_social_icons_general_settings",
      ],
      'container_inclusive' => true,
    ]);
  }

}


