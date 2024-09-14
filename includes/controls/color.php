<?php
namespace  GF_SOCIAL_ICONS\Controls;

class Color extends \WP_Customize_Control
{

  public $type = 'gf_social_icons_controler_type__color';
  public function json()
  {
    $json = parent::json();
    $json['input_attrs'] = $this->input_attrs ;
    return $json;
  }
  public function render_content()
  {
    ?>
    <div id="gf_social_icon__wrapper_color">
      will render from react
    </div>
    <?php
  }

}
