<?php
namespace GF_SOCIAL_ICONS\Controls;

class UnitInput extends \WP_Customize_Control
{

  public $type = 'gf_social_icons__type_unit_input';
  public function json()
  {
    $json = parent::json();
    $json['input_attrs'] = $this->input_attrs;
    return $json;
  }
  public function render_content()
  {
    ?>
    <div id="gf_social_icons__wrapper_unit_input">
    </div>
    <?php
  }

}
