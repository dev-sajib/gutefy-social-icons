<?php
class My_Customize_Icon_Picker_Control extends WP_Customize_Control
{
        public $type = 'my_icon_picker_control';

        public function render_content()
        {
                ?>
                <label>
                        <span class="customize-control-title">
                                <?php echo esc_html($this->label); ?>
                        </span>
                        <span class="description customize-control-description">
                                <?php echo esc_html($this->description); ?>
                        </span>

                        <div class="icon-picker-container">
                                <input type="text" <?php $this->link(); ?> class="icon-picker" />
                        </div>
                </label>
                <script>
                        jQuery(function ($) {
                                $('.icon-picker').iconpicker();
                        });
                </script>
                <?php
        }
}