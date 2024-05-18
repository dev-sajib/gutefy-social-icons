<?php 
    class Gf_social_icons_class_account_repeater_control_setting extends WP_Customize_Control{

    // public $type = 'select';

    public function render_content()
    {
        
        ?>
        <div class="gutefy_settings_wrapper_accounts_social_icon">
            <button class="gf_social_icons_add_account_button" onclick="gf_social_icons_add_account(event)">Add Social Account</button>
            <hr />
                <h4 class="gutefy_settings_wrapper_title_social_icon"><?php echo esc_html($this->label) ?></h4>        
                    <input class="gf-social-icons--accounts-details" type="hidden"  <?php esc_attr( $this->link('select_social_icon') ); ?> >
                <div class="gf-social-icons-repeater-field-wrapper"> </div>
            <hr />
        </div>
            <?php
    }
    }
