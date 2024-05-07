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
        
        <div class="gf-custom-size-control-wrapper range-slider">
            <select onchange="gf_social_icons__style_select_control(this)" id="gf_social_icons--style-select" <?php echo esc_html( $this->link() )  ?>>
            <option>Choose <?php echo esc_html( $this->label )?></option>
                <?php foreach($this->choices as $key=>$value) :  ?>
                <option  value="<?php echo esc_html( $key ); ?>"><?php echo esc_html( $value ) ;?></option>
                <?php endforeach ; ?>
            </select>
            <p class='gf_social_icons--warning-sms' style='display:none '>In this style it will show only the first 5 social link filled icon </p>
            <?php
    }
}
