<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly 


class Gf_social_icons__class_control_slider extends WP_Customize_Control
{
       public $type = 'slider';

       public function render_content()
       {
              ?>
              <hr />
              <label for="<?php $this->id ?>"><?php echo esc_html( $this->label )  ?></label>
       <div class="gf-custom-size-control-wrapper range-slider">              
              <input class="range-slider__range" id="<?php esc_html($this->id) ?>" type="range" <?php echo esc_html($this->link());?>  min="<?php echo esc_html($this->input_attrs['min'])?>" max="<?php echo esc_html($this->input_attrs['max'])?>" value="30" step="<?php echo esc_html($this->input_attrs['step'])?>" />
              <span class="range-slider__value" <?php echo esc_html($this->link());?> >30</span>
       </div>
              <?php
       }
}
