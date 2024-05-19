<?php

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly 


class Gf_social_icons_class_control_spaching extends WP_Customize_Control
{
    //FIXME - 
    public $type = 'slider';

    public function render_content()
    {

        ?>
        <hr />
        <label for="<?php $this->id ?>"><?php echo esc_html($this->label) ?></label>
        <div class="gf-social-icons-spaching-controller">
            <input value="<?php echo esc_attr($this->value('padding_top')); ?>" type="number" id="<?php esc_html($this->id) ?>" <?php echo esc_html($this->link('padding_top')); ?>">
            <input value="<?php echo esc_attr($this->value('padding_bottom')); ?>" type="number" id="<?php esc_html($this->id) ?>" <?php echo esc_html($this->link('padding_bottom')); ?>">
            <input value="<?php echo esc_attr($this->value('padding_left')); ?>" type="number" id="<?php esc_html($this->id) ?>" <?php echo esc_html($this->link('padding_left')); ?>">
            <input value="<?php echo esc_attr($this->value('padding_right')); ?>" type="number" id="<?php esc_html($this->id) ?>" <?php echo esc_html($this->link('padding_right')); ?>">
            <button>🔗</button>
        </div>
        <hr/>
        <?php
    }
}
