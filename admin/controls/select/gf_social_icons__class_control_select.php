<?php
if (!defined('ABSPATH'))
    exit;

class Gf_social_icons_class_control_select extends WP_Customize_Control
{
    public $type = 'select';

    public function render_content()
    {
        ?>
        <hr />
            <label for="<?php $this->id ?>"><?php echo esc_html($this->label) ?></label>        
            <select onchange="gf_social_icons__style_select_control(this)" id="gf_social_icons--style-select" <?php echo esc_html( $this->link('selected_style') )  ?>>
                <option>Choose <?php echo esc_html( $this->label )?></option>
                <?php foreach($this->choices as $key=>$value) :  ?>
                <option  value="<?php echo esc_html( $key ); ?>"><?php echo esc_html( $value ) ;?></option>
                <?php endforeach ; ?>
            </select>
            <div class="gf-social-icons-settings-wrapper style2 " style='display:none'>  
                <label for="icon-wrapper-opacity">Set Opacity</label>
                <input type="number" min="<?php echo esc_html($this->input_attrs['min'])?>" max="<?php echo esc_html($this->input_attrs['max'])?>" step="<?php echo esc_html($this->input_attrs['step'])?>" id="icon-wrapper-opacity" <?php $this->link('opacity-control'); ?>  >
            </div>
            <?php
    }
}
