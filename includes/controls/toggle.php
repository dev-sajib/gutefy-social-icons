<?php
namespace GF_SOCIAL_ICONS\Controls;

class Toggle extends \WP_Customize_Control
{
  
  public $type = 'gf_social_icons__toggle_control_type';
  public function json()
  {
    $json = parent::json();

    $json['input_attrs'] = $this->input_attrs;
    return $json;
  }
  public function render_content()
  {

    ?>
    <div id="gf_social_icons__toggle-control-wrapper">
      //render from react
    </div>
    <?php
  }

}
