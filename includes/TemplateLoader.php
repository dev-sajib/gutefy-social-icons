<?php
namespace GF_SOCIAL_ICONS;


class TemplateLoader
{
    public $templateLoadCount = 0;
    public static function init()
    {
        $header_exists = has_action('wp_head');
        $footer_exists = has_action('wp_footer');

        if ($header_exists) {
            add_action('wp_head', [__CLASS__, 'gf_social_icons_get_icon_data_loader']);
        } elseif ($footer_exists) {
            add_action('wp_footer', [__CLASS__, 'gf_social_icons_get_icon_data_loader']);
        } else {
            add_action('wp_body_open', [__CLASS__, 'gf_social_icons_get_icon_data_loader']);
        }
    }

    public static function gf_social_icons_get_icon_data_loader()
    {
        if (!self::should_render()) {
            return;
        }
        $gf_social_icons_position_horizontally = get_option('gf_social_icons_position_horizontally', 'position--right');

        $html = "<div id='gf_social_icons__wrapper' class='gutefy-section-parent-wrapper " . esc_attr($gf_social_icons_position_horizontally) . "'>" . self::load_template() . "</div>";
        self::generateStyle();

        echo $html;
    }

    /**
     * Evaluate the visibility rules saved by ConditionalDisplay control.
     * Returns true when the icons should render on the current request.
     */
    public static function should_render()
    {
        $rules = get_option('gf_social_icons_visibility_rules', []);
        if (!is_array($rules) || empty($rules)) {
            return true;
        }

        $targets = isset($rules['targets']) && is_array($rules['targets']) ? $rules['targets'] : [];
        $hide_for_roles = isset($rules['hide_for_roles']) && is_array($rules['hide_for_roles']) ? $rules['hide_for_roles'] : [];

        // Role rule: if current user's role is in the "Hide for these roles" list, hide.
        if (!empty($hide_for_roles)) {
            $current_roles = self::get_current_user_roles();
            foreach ($current_roles as $role) {
                if (in_array($role, $hide_for_roles, true)) {
                    return false;
                }
            }
        }

        // Page rule: hide if the current request matches any checked target.
        if (!empty($targets['front_page']) && is_front_page())                    return false;
        if (!empty($targets['home_blog']) && is_home())                           return false;
        if (!empty($targets['single_post']) && is_singular('post'))               return false;
        if (!empty($targets['single_page']) && is_page())                         return false;
        if (!empty($targets['archive']) && is_archive())                          return false;
        if (!empty($targets['search']) && is_search())                            return false;
        if (!empty($targets['not_found']) && is_404())                            return false;

        if (class_exists('WooCommerce')) {
            if (!empty($targets['woocommerce_shop']) && function_exists('is_shop') && is_shop()) {
                return false;
            }
            if (!empty($targets['woocommerce_checkout']) && (
                (function_exists('is_cart') && is_cart()) || (function_exists('is_checkout') && is_checkout())
            )) {
                return false;
            }
            if (!empty($targets['woocommerce_product']) && function_exists('is_product') && is_product()) {
                return false;
            }
        }

        return true;
    }
    public static function load_template()
    {
        $social_icons_settings = get_option('gf_social_icons_general_settings', []);
        $open_in_new_tab = get_option('gf_social_icons_open_in_new_tab_settings', ['value' => true]);


        // load icon json 
        $json_file_path = plugin_dir_path(__FILE__) . './../build/iconStore.json';

        //check availablity
        if (!file_exists($json_file_path)) {
            return 'Icon Json File Not Found';
        }

        // Read and decode the JSON file
        $json_data = file_get_contents($json_file_path);
        $social_icons_data = json_decode($json_data, true);

        // Check if the JSON data was properly decoded
        if (json_last_error() !== JSON_ERROR_NONE) {
            return '<p>Error: Invalid JSON data.</p>';
        }
        ob_start();

        echo '<div class="gf_social_icons_social_float">';
        if (!empty($social_icons_settings)):
            foreach ($social_icons_settings as $icon) {
                if ($icon[1]) {
                    $aria_label = ucwords(str_replace(['_', '-'], ' ', $icon[0]));
                    $options = (isset($icon[3]) && is_array($icon[3])) ? $icon[3] : [];
                    $href = self::build_href($icon[0], $icon[1], $options);
                    $is_protocol_href = (bool) preg_match('/^(mailto:|tel:|sms:)/i', $href);
                    ?>

                    <a class="gf_social_icons_social_icon" href="<?php echo $is_protocol_href ? esc_attr($href) : esc_url($href); ?>" aria-label="<?php echo esc_attr($aria_label); ?>" rel="noopener noreferrer" <?php
                    if ($open_in_new_tab['value'] && !$is_protocol_href) {
                        echo 'target="_blank"';
                    } ?>>
                        <span>
                            <?php echo ($social_icons_data[$icon[0]]['icon']) ?>
                        </span>
                    </a>
                    <?php
                }
            }
            ;
        else: ?>
            <p class="empty-sms">Minimum One Url Required.</p>
        <?php endif;
        echo '</div>';
        // Get the contents of the buffer and clean it
        return ob_get_clean();
    }

    /**
     * Returns an array of role slugs for the current visitor.
     * Guests always include the 'guest' slug. Logged-in users include all assigned WP roles.
     */
    public static function get_current_user_roles()
    {
        if (!is_user_logged_in()) {
            return ['guest'];
        }
        $u = wp_get_current_user();
        return ($u && !empty($u->roles)) ? array_values($u->roles) : [];
    }

    /**
     * Build an href from a repeater row, based on icon type + per-row options.
     * Options shape:
     *   whatsapp: ['prefill_message' => string]
     *   mail (envelope/envelope-regular): ['subject' => string, 'body' => string]
     *   phone: ['sms' => bool]
     */
    public static function build_href($icon_id, $target, $options = [])
    {
        $mail_icons = ['envelope', 'envelope-regular'];
        $whatsapp_icons = ['whatsapp'];
        $phone_icons = ['phone'];

        $target_trim = trim($target);

        if (in_array($icon_id, $whatsapp_icons, true)) {
            $digits = preg_replace('/\D/', '', $target_trim);
            if (!$digits) {
                return $target_trim;
            }
            $href = 'https://wa.me/' . $digits;
            if (!empty($options['prefill_message'])) {
                $href .= '?text=' . rawurlencode($options['prefill_message']);
            }
            return $href;
        }

        if (in_array($icon_id, $mail_icons, true)) {
            if (!filter_var($target_trim, FILTER_VALIDATE_EMAIL)) {
                return $target_trim;
            }
            $href = 'mailto:' . $target_trim;
            $q = [];
            if (!empty($options['subject'])) $q['subject'] = $options['subject'];
            if (!empty($options['body']))    $q['body']    = $options['body'];
            if ($q) {
                $href .= '?' . http_build_query($q);
            }
            return $href;
        }

        if (in_array($icon_id, $phone_icons, true)) {
            $digits = preg_replace('/[^\d+]/', '', $target_trim);
            if (!$digits) {
                return $target_trim;
            }
            $scheme = !empty($options['sms']) ? 'sms:' : 'tel:';
            return $scheme . $digits;
        }

        return $target_trim;
    }

    public static function generateMarkupString($singleStyle, $markup_string)
    {

        if (array_key_exists('css_attr',$singleStyle) && $singleStyle['css_attr'] && $singleStyle['css_attr'] === null) {
            foreach ($singleStyle as $style) {

                if (gettype($style) != 'string') {
                    if (gettype($style['value']) === 'array') {
                        $style_string = '';
                        foreach ($style['value'] as $value) {
                            $style_string .= $value . ' ';
                        }
                        $markup_string .= $singleStyle['css_selector'] . "{" . $style['css_attr'] . ":" . $style_string . " !important;}";
                    } else {
                        $markup_string .= $singleStyle['css_selector'] . "{" . $style['css_attr'] . ":" . $style['value'] . " !important;}";
                    }
                }
            }

        } else {
            if ( array_key_exists('value',@$singleStyle) && gettype($singleStyle['value']) == 'array') {
                $style_string = '';
                foreach ($singleStyle['value'] as $value) {
                    $style_string .= $value . ' ';
                }
                $markup_string .= $singleStyle['css_selector'] . "{" . $singleStyle['css_attr'] . ":" . $style_string . "!important;}";
            } else if( array_key_exists('value',@$singleStyle) && gettype($singleStyle['value'])==='string') {
                $markup_string .= $singleStyle['css_selector'] . "{" . $singleStyle['css_attr'] . ":" . $singleStyle['value'] . "!important;}";
            }
        }
        return $markup_string;
    }
    public static function generateStyle()
    {
        $get_value = get_option('gf_social_icons_styles_setting');

        $mergedStyles = [];
        if ($get_value) {
            foreach ($get_value['styles'] as $style) {

                // Loop through each device-wise value in the current style
                if ($style['device_wise_value']) {
                    foreach ($style['device_wise_value'] as $device => $deviceValues) {
                        // Initialize the device key if it doesn't exist
                        if (!isset($mergedStyles[$device])) {
                            $mergedStyles[$device] = [];
                        }

                        // Merge the styles under the device key by grouping the css_selector
                        $mergedStyles[$device][] = [
                            'css_selector' => $style['css_selector'],
                            ...$deviceValues,  // Spread the device-specific values
                        ];

                    }
                }

            }

            $markup_string = '';

            if ($mergedStyles['desktop']) {

                foreach ($mergedStyles['desktop'] as $singleStyle) {


                    $markup_string = self::generateMarkupString($singleStyle, $markup_string);


                }
            }

            if ($mergedStyles['tablet']) {

                $markup_string .= '@media (max-width: 1020px) {';

                foreach ($mergedStyles['tablet'] as $singleStyle) {
                    $markup_string = self::generateMarkupString($singleStyle, $markup_string);
                }

                $markup_string .= '}';
            }
            ;
            if ($mergedStyles['mobile']) {
                $markup_string .= '@media (max-width: 714px) {';
                foreach ($mergedStyles['mobile'] as $singleStyle) {
                    $markup_string = self::generateMarkupString($singleStyle, $markup_string);
                }
                $markup_string .= '}';
            }
            ;


            $upload_dir = wp_upload_dir();
            $folder_path = $upload_dir['basedir'] . '/gf-social-icons-customizer';
            if (!file_exists($folder_path)) {
                mkdir($folder_path, 0755, true);
            }
            $dynamic_css_file_path = $folder_path . '/gf-social-icons-dynamic-style.css';
            $open_dynamic_style_file = fopen($dynamic_css_file_path, 'w');
            fwrite($open_dynamic_style_file, $markup_string);
            fclose($open_dynamic_style_file);
        }
    }
}

// Initialize TemplateLoader
TemplateLoader::init();
