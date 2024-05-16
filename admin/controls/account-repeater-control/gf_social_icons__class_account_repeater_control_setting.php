<?php 
    class Gf_social_icons_class_account_repeater_control_setting extends WP_Customize_Control{

    // public $type = 'select';

    public function render_content()
    {
        
        ?>
        <button onclick="gf_social_icons_add_account(event)">Add Social Account</button>
        <hr />
            <label for="<?php $this->id ?>"><?php echo esc_html($this->label) ?></label>        
            <p class="gf-social-icons--icon-display-wrapper">
                <input class="gf-social-icons--accounts-details" type="text"  <?php esc_attr( $this->link('select_social_icon') ); ?> >
            </p>
            <div class="gf-social-icons-repeater-field-wrapper"> </div>
            <?php
    }
    }
