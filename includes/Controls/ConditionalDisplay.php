<?php
namespace GF_SOCIAL_ICONS\Controls;


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
class ConditionalDisplay extends \WP_Customize_Control
{

  public $type = 'gf_social_icons__type_conditional_display';
  public function json()
  {
    $json = parent::json();
    $json['input_attrs'] = $this->input_attrs;
    $json['wc_active'] = class_exists('WooCommerce');
    $json['available_roles'] = self::get_available_roles();
    return $json;
  }
  private static function get_available_roles()
  {
    $roles = ['guest' => 'Guest (logged out)'];
    if (function_exists('wp_roles')) {
      foreach (wp_roles()->roles as $slug => $info) {
        $roles[$slug] = isset($info['name']) ? $info['name'] : $slug;
      }
    }
    return $roles;
  }
  public function render_content()
  {
    ?>
    <div id="gf_social_icons__conditional-display-wrapper">
      //render from react
    </div>
    <?php
  }

}
