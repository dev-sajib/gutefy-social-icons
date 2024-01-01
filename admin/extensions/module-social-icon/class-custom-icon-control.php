<?php
// Custom_Icon_Control.php

class Class_custom_icon_control extends WP_Customize_Control
{
        public $type = 'custom_icon';

        public function render_content()
        {
                ?>
                <div class="custom-icon-control">
                        <?php parent::render_content(); ?>
                        //TODO - working on it
                        <span class="gutefy_icon_selector_dropdown">

                        </span>
                </div>
                <?php
        }
}