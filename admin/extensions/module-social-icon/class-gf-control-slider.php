<?php
class Class_gf_control_slider extends WP_Customize_Control
{
       public $type = 'slider';

       public function render_content()
       {
              ?>
              <hr />
              <label for="<?php $this->id ?>"><?php echo $this->label ?></label>
       <div class="gf-custom-size-control-wrapper range-slider">              
              <input class="range-slider__range" id="<?php $this->id ?>" type="range" <?php echo $this->link();?>  min="<?php echo $this->input_attrs['min']?>" max="<?php echo $this->input_attrs['max']?>" value="30" step="<?php echo $this->input_attrs['step']?>" />
              <span class="range-slider__value" <?php echo $this->link();?> >30</span>
       </div>
              <?php
       }
}
