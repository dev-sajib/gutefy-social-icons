<?php
namespace GF_SOCIAL_ICONS\Controls;

class SocialRepeater extends \WP_Customize_Control
{

  public $type = 'gf_social_icons__general_control_type';
  public function json()
  {
    $json = parent::json();
    $json['input_attrs'] = $this->input_attrs;
    return $json;
  }
  public function render_content()
  {
    ?>
    <div id="gf_social_icons__general-control-wrapper">
      //render from react
    </div>
    <?php
  }

}
