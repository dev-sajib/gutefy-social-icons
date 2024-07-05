<?php

class Gf_social_icons_global_settings
{

  private $gf_social_icons__namespace = 'gutefy_settings_';
  private $gf_social_icons__extensions_namespace = '_social_icon';
  private $gf_social_icons_style_settings = [
    ['--gutefy-icon-color', 'white'],
    ['--gutefy-icon-wrapper-color', '#27ae60'],
    ['--gutefy-icon-hover-color', 'white'],
    ['--gutefy-icon-wrapper-hover-color', '#2980b9'],
    ['--gutefy-icon-wrapper-position-right', '0px'],
    ['--gutefy-icon-wrapper-position-left', 'auto'],
    ['--gutefy-icon-wrapper-position-top', '44%'],
    ['--gutefy-icon-size', '16px'],
    ['--gutefy-icon-wrapper-size', '44px'],
    ['--gutefy-icon-wrapper-gap', '0px'],
    ['gutefy_icon_wrapper_border', '0px'],
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


  // Validation callback function
  public function gf_social_icons_custom_url_validation($error_object, $value, $setting_object)
  {
    // Ensure $value is an array
    if (!is_array($value)) {
      error_log('Unexpected type encountered in gf_social_icons_custom_url_validation: ' . gettype($value));
      return [['facebook', 'http://facebook.com']];
    }

    foreach ($value as $key => $item) {
      if (is_array($item)) {
        $url = trim($item[1]);
        // Check if $url is a string and starts with http:// or https://
        if (is_string($url) && (strpos($url, 'http://') !== 0 && (strpos($url, 'https://') !== 0) && (strpos($url, '.') && strpos($url, '.') !== 0)) && !strpos($url, '@') && !preg_match('/^\d{10,}$/', $url)) {
          // error_log('url');
          $value[$key][1] = esc_url_raw('http://' . $url);
        }
        elseif (filter_var($url, FILTER_VALIDATE_EMAIL)) {
          // error_log('email');
        }
        elseif (preg_match('/^\+?\d+$/', $url)) {
          // error_log('phone');
        }
        else{
          return false;
        }
      }
    }

    return $value;
  }
  public function gf_social_icons_custom_sanitize($value)
  {
    // Ensure $value is an array
    if (!is_array($value)) {
      error_log('Unexpected type encountered in gf_social_icons_custom_sanitize: ' . gettype($value));
      return [['facebook', 'http://facebook.com']]; // Return a default array or handle the unexpected type
    }

    // Sanitize each item in the array
    foreach ($value as $key => $item) {
      if (is_array($item) && count($item) >= 2) {
        $name = sanitize_text_field($item[0]); // Sanitize the name
        $url_or_contact = trim($item[1]); // Trim any leading/trailing spaces

        // Determine if it's a URL, email, or phone number
        if (filter_var($url_or_contact, FILTER_VALIDATE_URL)) {
          // Sanitize URL
          $url_or_contact = esc_url_raw($url_or_contact);
        } elseif (filter_var($url_or_contact, FILTER_VALIDATE_EMAIL)) {
          // Sanitize email
          $url_or_contact = sanitize_email($url_or_contact);
        } elseif (preg_match('/^\d{10,}$/', $url_or_contact)) {
          // Sanitize phone number (assuming it's already digits only)
          $url_or_contact = preg_replace('/[^\d]/', '', $url_or_contact);
        } else {
          $url_or_contact = '';
        }

        // Update the sanitized name and URL/contact in the array
        $value[$key][0] = $name;
        $value[$key][1] = $url_or_contact;
      }
    }

    return $value;
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
        'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
        'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],

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
      $wp_customize->add_setting("gf_social_icons_style_settings[styles][$gf_social_icons_setting[0]]", ['type' => 'option', 'transport' => 'postMessage', 'default' => $gf_social_icons_setting[1]]);
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
        'gf_social_icons_style_settings',
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
      'selector' => "#gf_social_icons_wrapper",
      'settings' => [
        "gf_social_icons_general_settings",
      ],
      'render_callback' => function () {
        return $this->render_gf_social_icons();
      },
    ]);
  }

  private function render_gf_social_icons()
  {
    $social_icons_settings = get_option('gf_social_icons_general_settings', []);
    // Path to the JSON file
    $json_file_path = plugin_dir_path(__FILE__) . './../build/iconStore.json';
    // Check if the file exists
    if (!file_exists($json_file_path)) {
      return 'Icon Json File Not Found';
    }

    // Read and decode the JSON file
    $json_data = file_get_contents($json_file_path);
    $social_icons_data = json_decode($json_data, true);

    // Check if the JSON data was properly decoded
    if (json_last_error() !== JSON_ERROR_NONE) {
      return '<p>Error: Invalid JSON data.</p>';
    }

    // Start output buffering
    ob_start();

    if (!empty($social_icons_settings)):

      foreach ($social_icons_settings as $icon): ?>
        <a class="fromphp gf_social_icons_social_icon" href="<?php echo esc_url($icon[1]); ?>" target="_blank">
          <?php echo ($social_icons_data[$icon[0]]['icon']) ?>
        </a>
      <?php endforeach;
    else: ?>
      <p>Add Social Url.</p>
    <?php endif;
    // Get the contents of the buffer and clean it
    return ob_get_clean();
  }
}


