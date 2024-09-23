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
        if (self::is_block_theme()) {
            add_filter('render_block', [__CLASS__, 'gf_social_icons_get_icon_data_block'], 10, 2);
        } else {
            add_action('woocommerce_after_main_content', [__CLASS__, 'gf_social_icons_get_icon_data']);
            add_filter('the_content', [__CLASS__, 'gf_social_icons_get_icon_data'], 99999);
            add_filter('get_the_excerpt', [__CLASS__, 'gf_social_icons_get_icon_data'], 99999);
        }

    }
    public static function gf_social_icons_get_icon_data_block($block_content, $block)
    {
        $gf_social_icons_position_horizontally = get_option('gf_social_icons_position_horizontally', []);

        if ($block['blockName'] === 'core/template-part' && isset($block['attrs']['slug']) && $block['attrs']['slug'] === 'header') {
            $html = "<div id='gf_social_icons__wrapper' class='gutefy-section-parent-wrapper ".$gf_social_icons_position_horizontally."'>" . self::load_template() . "</div>";
            $block_content .= $html;
            self::generateStyle();
        }

        return $block_content;
    }
    public static function is_block_theme()
    {
        // Get the current theme
        $theme = wp_get_theme();

        // Check for the presence of theme.json file
        $theme_json_path = get_template_directory() . '/theme.json';
        if (file_exists($theme_json_path)) {
            return true; // It's a block theme
        }

        // Check for the presence of block template files
        $block_templates = glob(get_template_directory() . '/*.html');
        if (!empty($block_templates)) {
            return true; // It's likely a block theme
        }

        return false; // It's a classic theme
    }
    public static function gf_social_icons_get_icon_data($content)
    {
        $gf_social_icons_position_horizontally = get_option('gf_social_icons_position_horizontally', []);

        $html = "<div id='gf_social_icons__wrapper' class='gutefy-section-parent-wrapper ".$gf_social_icons_position_horizontally."'>" . self::load_template() . "</div>";
        $content .= $html;
        self::generateStyle();
        return $content;
    }
    public static function load_template()
    {
        $social_icons_settings = get_option('gf_social_icons_general_settings', []);
        $open_in_new_tab = get_option('gf_social_icons_open_in_new_tab_settings', []);


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
                    ?>

                    <a class="gf_social_icons_social_icon" href="<?php echo esc_url($icon[1]); ?>" <?php
                       if ($open_in_new_tab['value']) {
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

    public static function generateMarkupString($singleStyle, $markup_string)
    {

        if ($singleStyle['css_attr'] === null) {
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


            if (gettype($singleStyle['value']) == 'array') {
                $style_string = '';
                foreach ($singleStyle['value'] as $value) {
                    $style_string .= $value . ' ';
                }
                $markup_string .= $singleStyle['css_selector'] . "{" . $singleStyle['css_attr'] . ":" . $style_string . "!important;}";
            } else {
                $markup_string .= $singleStyle['css_selector'] . "{" . $singleStyle['css_attr'] . ":" . $singleStyle['value'] . "!important;}";
            }
        }
        return $markup_string;
    }
    public static function generateStyle()
    {
        $get_value = get_option('gf_social_icons_style_settings');

        $mergedStyles = [];

        foreach ($get_value['styles'] as $style) {

            // Loop through each device-wise value in the current style
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

        // Set a flag to indicate that fonts need to be enqueued
        self::$fontsEnqueued = true;
    }
}

// Initialize TemplateLoader
TemplateLoader::init();
