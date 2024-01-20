<?php
class Class_gf_control_toggle extends WP_Customize_Control
{
       public $type = 'toggle';

       public function render_content()
       {
              ?>
              <hr />
              <div class="gf-custom-control-wrapper--inline-settings">
                     <label for="<?php $this->id ?>">
                            <?php echo $this->label ?>
                     </label>
                     <div class="button-cover">
                            <div class="button r" id="button-1">

                                   <input type="checkbox" class="checkbox" <?php echo $this->link() ?> />
                                   <div class="knobs"></div>
                                   <div class="layer"></div>
                            </div>
                     </div>
              </div>
              <?php
       }
}
