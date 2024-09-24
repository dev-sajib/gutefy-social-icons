<?php
namespace GF_SOCIAL_ICONS\Controls;

class Tabs extends \WP_Customize_Control
{

  public $type = 'gf_social_icons__type_tabs';
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
