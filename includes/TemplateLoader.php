<?php
namespace GF_SOCIAL_ICONS;

use GF_SOCIAL_ICONS\Global\Helper;
use GF_SOCIAL_ICONS\Global\Settings;

class TemplateLoader
{
    public static $usedFonts = [];
    public static $fontsEnqueued = false; // Flag to track if fonts have been enqueued

    public static function init()
    {
        add_action('woocommerce_after_main_content', [__CLASS__, 'gf_social_icons_get_icon_data']);
        add_filter('the_content', [__CLASS__, 'gf_social_icons_get_icon_data'], 99999);
        add_filter('get_the_excerpt', [__CLASS__, 'gf_social_icons_get_icon_data'], 99999);
        add_filter('render_block', [__CLASS__, 'gf_social_icons_get_icon_data_block'], 10, 2);
    }
    public static function gf_social_icons_get_icon_data_block($block_content, $block){
        if ($block['blockName'] === 'core/template-part' && isset($block['attrs']['slug']) && $block['attrs']['slug'] === 'header') {
            $html = "<div id='gf_social_icons__wrapper' class='gutefy-section-parent-wrapper position--right'>" . self::load_template() . "</div>";
            $block_content .= $html;
            self::generateStyle();
        }

        return $block_content;
    }
    public static function gf_social_icons_get_icon_data($content)
    {
        $html = "<div id='gf_social_icons__wrapper' class='gutefy-section-parent-wrapper position--left'>" . self::load_template() . "</div>";
        $content .= $html;
        self::generateStyle();
        return $content;
    }
    public static function load_template()
    {
        $social_icons_settings = get_option('gf_social_icons_general_settings', []);

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
            foreach ($social_icons_settings as $icon): ?>
                <a class="gf_social_icons_social_icon" href="<?php echo esc_url($icon[1]); ?>">
                    <span>
                        <?php echo ($social_icons_data[$icon[0]]['icon']) ?>
                    </span>
                </a>
            <?php endforeach;
        else: ?>
            <p class="empty-sms">Minimum One Url Required.</p>
        <?php endif;
        echo '</div>';
        // Get the contents of the buffer and clean it
        return ob_get_clean();
    }

    public static function generateStyle()
    {
        error_log('generateStyle File');
        $markup_style = '';
        $get_value = get_option('gf_social_icons_style_settings'); // it's an object

        error_log( print_r($get_value['styles'],true));
        foreach ($get_value['styles'] as $setting) {
            foreach ($setting['values'] as $singleStyle) {
                $desktop_value = isset($singleStyle['value']['desktop']) ? $singleStyle['value']['desktop'] : '';
                $tablet_value = isset($singleStyle['value']['tablet']) ? $singleStyle['value']['tablet'] : '';
                $mobile_value = isset($singleStyle['value']['mobile']) ? $singleStyle['value']['mobile'] : '';

                if ($singleStyle['css_attr'] === 'font-family' && $desktop_value && $desktop_value != 'inherit') {
                    // Add font-family to the list if it's not already present
                    if (!in_array($desktop_value, self::$usedFonts)) {
                        self::$usedFonts[] = $desktop_value;
                    }
                }

                if ($desktop_value) {
                    $markup_style .= $setting['css_selector'] . "{" . $singleStyle['css_attr'] . ":" . $desktop_value . "!important;}";
                }
                if ($tablet_value !== null && $tablet_value != '') {
                    $markup_style .= '@media (max-width: 1020px) {' . $setting['css_selector'] . "{" . $singleStyle['css_attr'] . ":" . $tablet_value . "!important;}}";
                }
                if ($mobile_value !== null && $mobile_value != '') {
                    $markup_style .= '@media (max-width: 714px) {' . $setting['css_selector'] . "{" . $singleStyle['css_attr'] . ":" . $mobile_value . "!important;}}";
                }
            }
        }

        $upload_dir = wp_upload_dir();
        $folder_path = $upload_dir['basedir'] . '/gf-social-icons-customizer';
        if (!file_exists($folder_path)) {
            mkdir($folder_path, 0755, true);
        }
        $dynamic_css_file_path = $folder_path . '/gf-social-icons-dynamic-style.css';
        $open_dynamic_style_file = fopen($dynamic_css_file_path, 'w');
        fwrite($open_dynamic_style_file, $markup_style);
        fclose($open_dynamic_style_file);

        // Set a flag to indicate that fonts need to be enqueued
        self::$fontsEnqueued = true;
    }
}

// Initialize TemplateLoader
TemplateLoader::init();
