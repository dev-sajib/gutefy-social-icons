<?php
namespace GF_SOCIAL_ICONS;



if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use GF_SOCIAL_ICONS\Global\Settings;

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

        self::generateStyle();

        $classes = ['gutefy-section-parent-wrapper'];
        $classes[] = get_option('gf_social_icons_position_horizontally', 'position--right');
        $classes[] = Sanitize::gf_social_icons_layout_sanitize(get_option(Settings::GENERAL_SETTING_ID_LAYOUT, 'layout--vertical'));

        $animation = Sanitize::gf_social_icons_animation_sanitize(get_option(Settings::ADVANCED_SETTING_ID_ANIMATION, 'anim--none'));
        if ('anim--none' !== $animation) {
            $classes[] = $animation;
        }

        if (self::option_enabled(Settings::ADVANCED_SETTING_ID_MOBILE_BOTTOM_BAR)) {
            $classes[] = 'has--bottom-bar';
        }

        $collapsible = self::option_enabled(Settings::ADVANCED_SETTING_ID_TOGGLE_BUTTON);
        if ($collapsible) {
            $classes[] = 'has--toggle';
        }

        $scroll_reveal = self::option_enabled(Settings::ADVANCED_SETTING_ID_SCROLL_REVEAL);
        $attributes = '';
        if ($scroll_reveal) {
            $classes[] = 'is--scroll-reveal';

            /**
             * Distance in pixels the visitor must scroll before the icons appear.
             *
             * @since 1.3.0
             * @param int $offset Scroll offset in pixels.
             */
            $offset = (int) apply_filters('gf_social_icons_scroll_offset', 200);
            $attributes .= ' data-scroll-offset="' . esc_attr(max(0, $offset)) . '"';
        }

        echo '<div id="gf_social_icons__wrapper" class="' . esc_attr(implode(' ', array_filter($classes))) . '"' . $attributes . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- $attributes is assembled from escaped values above.

        if ($collapsible) {
            self::render_toggle_button();
        }

        self::render_template();
        echo '</div>';
    }

    /**
     * Reads a toggle-style option saved as ['value' => bool].
     *
     * @param string $option_name Option key.
     * @return bool
     */
    public static function option_enabled($option_name)
    {
        $value = get_option($option_name, ['value' => false]);

        if (is_array($value)) {
            return !empty($value['value']);
        }

        return (bool) $value;
    }

    /**
     * Prints the button that collapses and expands the icon list.
     */
    public static function render_toggle_button()
    {
        $icon = self::get_icon_markup('link');

        echo '<button type="button" class="gf_social_icons_toggle" aria-expanded="false" aria-controls="gf_social_icons_list" aria-label="'
            . esc_attr__('Show social and contact links', 'gf-social-icons') . '">'
            . '<span class="gf_social_icons_toggle_open" aria-hidden="true">' . $icon . '</span>' // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- filtered by get_icon_markup().
            . '<span class="gf_social_icons_toggle_close" aria-hidden="true">&times;</span>'
            . '</button>';
    }

    /**
     * Returns the bundled SVG for an icon id, filtered through wp_kses().
     *
     * @param string $icon_id Icon key from iconStore.json.
     * @return string
     */
    public static function get_icon_markup($icon_id)
    {
        $store = self::get_icon_store();

        if (!isset($store[$icon_id]['icon'])) {
            return '';
        }

        return wp_kses($store[$icon_id]['icon'], self::svg_allowed_html());
    }

    /**
     * Loads and caches the bundled icon catalogue.
     *
     * @return array
     */
    public static function get_icon_store()
    {
        static $store = null;

        if (null !== $store) {
            return $store;
        }

        $store = [];
        $json_file_path = plugin_dir_path(__FILE__) . './../build/iconStore.json';

        if (file_exists($json_file_path)) {
            $decoded = json_decode(file_get_contents($json_file_path), true);
            if (JSON_ERROR_NONE === json_last_error() && is_array($decoded)) {
                $store = $decoded;
            }
        }

        return $store;
    }

    /**
     * Tags and attributes allowed inside the bundled icon SVGs.
     *
     * The icon markup ships with the plugin (build/iconStore.json), but it is still
     * filtered through wp_kses() so nothing unexpected can ever reach the page.
     *
     * @return array
     */
    public static function svg_allowed_html()
    {
        $shared_attributes = array(
            'fill'             => true,
            'fill-rule'        => true,
            'fill-opacity'     => true,
            'stroke'           => true,
            'stroke-width'     => true,
            'stroke-linecap'   => true,
            'stroke-linejoin'  => true,
            'stroke-dasharray' => true,
            'opacity'          => true,
            'transform'        => true,
            'class'            => true,
            'style'            => true,
            'id'               => true,
        );

        return array(
            'svg'      => $shared_attributes + array(
                'xmlns'               => true,
                'xmlns:xlink'         => true,
                'viewbox'             => true,
                'width'               => true,
                'height'              => true,
                'preserveaspectratio' => true,
                'role'                => true,
                'aria-hidden'         => true,
                'focusable'           => true,
                'version'             => true,
            ),
            'g'        => $shared_attributes,
            'title'    => array(),
            'defs'     => array(),
            'path'     => $shared_attributes + array('d' => true),
            'circle'   => $shared_attributes + array('cx' => true, 'cy' => true, 'r' => true),
            'ellipse'  => $shared_attributes + array('cx' => true, 'cy' => true, 'rx' => true, 'ry' => true),
            'rect'     => $shared_attributes + array('x' => true, 'y' => true, 'width' => true, 'height' => true, 'rx' => true, 'ry' => true),
            'line'     => $shared_attributes + array('x1' => true, 'y1' => true, 'x2' => true, 'y2' => true),
            'polygon'  => $shared_attributes + array('points' => true),
            'polyline' => $shared_attributes + array('points' => true),
            'use'      => $shared_attributes + array('href' => true, 'xlink:href' => true, 'x' => true, 'y' => true),
        );
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
    /**
     * Returns the icon markup as a string.
     *
     * Kept for backward compatibility — render_template() is the printing version.
     *
     * @return string
     */
    public static function load_template()
    {
        ob_start();
        self::render_template();
        return ob_get_clean();
    }

    /**
     * Prints the icon list.
     */
    public static function render_template()
    {
        $social_icons_settings = get_option('gf_social_icons_general_settings', []);
        $open_in_new_tab = get_option('gf_social_icons_open_in_new_tab_settings', ['value' => true]);

        $social_icons_data = self::get_icon_store();

        if (empty($social_icons_data)) {
            return;
        }

        $open_in_new_tab = (is_array($open_in_new_tab) && !empty($open_in_new_tab['value']));
        $use_brand_colors = self::option_enabled(Settings::GENERAL_SETTING_ID_BRAND_COLORS);
        $allowed_svg = self::svg_allowed_html();

        echo '<div id="gf_social_icons_list" class="gf_social_icons_social_float">';

        if (!empty($social_icons_settings)) {
            foreach ($social_icons_settings as $icon) {
                $options = (isset($icon[3]) && is_array($icon[3])) ? $icon[3] : [];
                $icon_markup = self::get_row_icon_markup($icon[0], $options, $social_icons_data, $allowed_svg);

                if (empty($icon[1]) || '' === $icon_markup) {
                    continue;
                }

                $aria_label = !empty($options['label'])
                    ? $options['label']
                    : ucwords(str_replace(['_', '-'], ' ', $icon[0]));

                $href = self::build_href($icon[0], $icon[1], $options);
                $is_protocol_href = (bool) preg_match('/^(mailto:|tel:|sms:)/i', $href);
                $row_style = self::get_row_color_style($icon[0], $options, $social_icons_data, $use_brand_colors);

                $classes = ['gf_social_icons_social_icon'];
                $declarations = [];

                if (isset($row_style['icon'])) {
                    $classes[] = 'has--row-icon-color';
                    $declarations[] = '--gf-row-icon-color:' . $row_style['icon'];
                }
                if (isset($row_style['background'])) {
                    $classes[] = 'has--row-bg-color';
                    $declarations[] = '--gf-row-bg-color:' . $row_style['background'];
                }

                $inline_style = $declarations
                    ? ' style="' . esc_attr(implode(';', $declarations)) . '"'
                    : '';

                echo '<a class="' . esc_attr(implode(' ', $classes)) . '" href="'
                    . ($is_protocol_href ? esc_attr($href) : esc_url($href))
                    . '" aria-label="' . esc_attr($aria_label) . '" rel="noopener noreferrer"'
                    . (($open_in_new_tab && !$is_protocol_href) ? ' target="_blank"' : '')
                    . $inline_style // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped with esc_attr() above.
                    . '><span class="gf_social_icons_icon">'
                    . $icon_markup // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- filtered by get_row_icon_markup().
                    . '</span>';

                if (!empty($options['label'])) {
                    echo '<span class="gf_social_icons_tooltip" aria-hidden="true">' . esc_html($options['label']) . '</span>';
                }

                echo '</a>';
            }
        } else {
            echo '<p class="empty-sms">' . esc_html__('Minimum One Url Required.', 'gf-social-icons') . '</p>';
        }

        echo '</div>';
    }

    /**
     * Returns escaped icon markup for a row: an uploaded image when one is set,
     * otherwise the bundled SVG.
     *
     * @param string $icon_id     Icon key.
     * @param array  $options     Per-row options.
     * @param array  $store       Icon catalogue.
     * @param array  $allowed_svg Allowed SVG tags.
     * @return string
     */
    public static function get_row_icon_markup($icon_id, $options, $store, $allowed_svg)
    {
        $attachment_id = isset($options['custom_icon']) ? absint($options['custom_icon']) : 0;

        if ($attachment_id) {
            if ('image/svg+xml' === get_post_mime_type($attachment_id)) {
                $file = get_attached_file($attachment_id);
                if ($file && file_exists($file)) {
                    return wp_kses(file_get_contents($file), $allowed_svg);
                }
            }

            $image = wp_get_attachment_image($attachment_id, [64, 64], false, [
                'class' => 'gf_social_icons_custom_icon',
                'alt' => '',
                'aria-hidden' => 'true',
            ]);

            if ($image) {
                return $image;
            }
        }

        if (!isset($store[$icon_id]['icon'])) {
            return '';
        }

        return wp_kses($store[$icon_id]['icon'], $allowed_svg);
    }

    /**
     * Resolves the colours for one row.
     *
     * Precedence: per-row override, then the brand colour when brand colours are on,
     * then nothing — in which case the global Design settings apply.
     *
     * @param string $icon_id          Icon key.
     * @param array  $options          Per-row options.
     * @param array  $store            Icon catalogue.
     * @param bool   $use_brand_colors Whether brand colours are enabled.
     * @return array
     */
    public static function get_row_color_style($icon_id, $options, $store, $use_brand_colors)
    {
        $style = [];

        $icon_color = isset($options['icon_color']) ? Sanitize::gf_social_icons_color_sanitize($options['icon_color']) : '';
        $background = isset($options['bg_color']) ? Sanitize::gf_social_icons_color_sanitize($options['bg_color']) : '';

        if ($use_brand_colors) {
            $brand = isset($store[$icon_id]['defaultColor'])
                ? Sanitize::gf_social_icons_color_sanitize($store[$icon_id]['defaultColor'])
                : '';

            if ('' !== $brand) {
                if ('' === $background) {
                    $background = $brand;
                }
                if ('' === $icon_color) {
                    $icon_color = '#ffffff';
                }
            }
        }

        if ('' !== $icon_color) {
            $style['icon'] = $icon_color;
        }
        if ('' !== $background) {
            $style['background'] = $background;
        }

        return $style;
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

    /**
     * Joins the parts of a multi-value declaration (border shorthand and friends).
     *
     * @param array $values Value parts.
     * @return string
     */
    private static function join_style_values($values)
    {
        $parts = [];

        foreach ($values as $value) {
            $value = trim((string) $value);
            if ('' !== $value) {
                $parts[] = $value;
            }
        }

        return implode(' ', $parts);
    }

    /**
     * Appends one declaration, skipping anything without a value.
     *
     * Hover settings that were never touched arrive here empty; writing them out
     * produced invalid declarations such as `fill:!important;`.
     *
     * @param string $selector CSS selector.
     * @param string $property CSS property.
     * @param mixed  $value    Declaration value.
     * @return string
     */
    private static function build_declaration($selector, $property, $value)
    {
        $selector = trim((string) $selector);
        $property = trim((string) $property);

        if ('' === $selector || '' === $property) {
            return '';
        }

        $value = is_array($value) ? self::join_style_values($value) : trim((string) $value);

        if ('' === $value) {
            return '';
        }

        return $selector . '{' . $property . ':' . $value . ' !important;}';
    }

    public static function generateMarkupString($singleStyle, $markup_string)
    {
        if (!is_array($singleStyle)) {
            return $markup_string;
        }

        $selector = isset($singleStyle['css_selector']) ? $singleStyle['css_selector'] : '';

        // Grouped shape: the entry holds a list of declarations instead of one.
        if (!isset($singleStyle['css_attr'])) {
            foreach ($singleStyle as $style) {
                if (is_array($style) && isset($style['css_attr'])) {
                    $markup_string .= self::build_declaration(
                        $selector,
                        $style['css_attr'],
                        isset($style['value']) ? $style['value'] : ''
                    );
                }
            }

            return $markup_string;
        }

        return $markup_string . self::build_declaration(
            $selector,
            $singleStyle['css_attr'],
            isset($singleStyle['value']) ? $singleStyle['value'] : ''
        );
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

            if (!empty($mergedStyles['desktop'])) {
                foreach ($mergedStyles['desktop'] as $singleStyle) {
                    $markup_string = self::generateMarkupString($singleStyle, $markup_string);
                }
            }

            if (!empty($mergedStyles['tablet'])) {
                $tablet_styles = '';

                foreach ($mergedStyles['tablet'] as $singleStyle) {
                    $tablet_styles = self::generateMarkupString($singleStyle, $tablet_styles);
                }

                if ('' !== $tablet_styles) {
                    $markup_string .= '@media (max-width: 1020px) {' . $tablet_styles . '}';
                }
            }

            if (!empty($mergedStyles['mobile'])) {
                $mobile_styles = '';

                foreach ($mergedStyles['mobile'] as $singleStyle) {
                    $mobile_styles = self::generateMarkupString($singleStyle, $mobile_styles);
                }

                if ('' !== $mobile_styles) {
                    $markup_string .= '@media (max-width: 714px) {' . $mobile_styles . '}';
                }
            }

            self::write_dynamic_stylesheet($markup_string);
        }
    }

    /**
     * Writes the generated stylesheet to the uploads directory.
     *
     * Uses WP_Filesystem, and skips the write entirely when the file already holds
     * the same CSS — this runs on every front-end request.
     *
     * @param string $css Stylesheet contents.
     * @return bool True when the file is present and current.
     */
    public static function write_dynamic_stylesheet($css)
    {
        $upload_dir = wp_upload_dir();

        if (!empty($upload_dir['error'])) {
            return false;
        }

        $folder_path = trailingslashit($upload_dir['basedir']) . 'gf-social-icons-customizer';
        $file_path = $folder_path . '/gf-social-icons-dynamic-style.css';

        if (file_exists($file_path) && md5_file($file_path) === md5($css)) {
            return true;
        }

        global $wp_filesystem;

        if (!function_exists('WP_Filesystem')) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
        }

        if (!WP_Filesystem()) {
            return false;
        }

        if (!$wp_filesystem->is_dir($folder_path) && !wp_mkdir_p($folder_path)) {
            return false;
        }

        return $wp_filesystem->put_contents($file_path, $css, FS_CHMOD_FILE);
    }
}

// Initialize TemplateLoader
TemplateLoader::init();
