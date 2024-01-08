<?php
// Custom_Icon_Control.php

class Class_Custom_Icon_Control extends WP_Customize_Control
{
        public $type = 'custom_icon';
        public $json;
        public $custom_string;

        public function __construct($manager, $id, $args = array())
        {
                $this->custom_string = isset($args['custom_string']) ? $args['custom_string'] : '';

                parent::__construct($manager, $id, $args);
        }
        public function render_content()
        {
                ?>
<span class="gutefy_custom-icon <?php echo esc_attr($this->custom_string); ?>">
        <input type="checkbox" data-social-icon="<?php echo esc_attr($this->custom_string); ?>"
                name="use_custom_icon_<?php echo esc_attr($this->custom_string); ?>"
                id="use_custom_icon_<?php echo esc_attr($this->custom_string); ?>" class="custom-checkbox"
                onclick="enablecustomfontclass(event, this);">
        <label for="use_custom_icon_<?php echo esc_attr($this->custom_string); ?>">Use Custom Icon</label>
</span>
<div class="custom-icon-control <?php echo esc_attr($this->custom_string); ?>">
        <?php parent::render_content(); ?>
</div>
<?php
        }

}