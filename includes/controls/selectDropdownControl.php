<?php
namespace GF_SOCIAL_ICONS\Controls;

class SelectDropdownControl extends \WP_Customize_Control
{

  public $type = 'gf_social_icons__type_select_dropdown';
  public function json()
  {
    $json = parent::json();
    $json['input_attrs'] = $this->input_attrs;
    return $json;
  }
  public function render_content()
  {
    ?>
    <div id="gf_social_icons__wrapper_select_dropdown">
    </div>
    <?php
  }

}
