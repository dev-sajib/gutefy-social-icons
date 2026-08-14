<?php

namespace GF_SOCIAL_ICONS;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
class Sanitize {

  public static function gf_social_icons_visibility_sanitize($value) {
    if (!is_array($value)) {
      return ['targets' => [], 'hide_for_roles' => []];
    }

    $allowed_targets = [
      'front_page', 'home_blog', 'single_post', 'single_page',
      'archive', 'search', 'not_found',
      'woocommerce_shop', 'woocommerce_checkout', 'woocommerce_product',
    ];
    $clean_targets = [];
    $raw_targets = isset($value['targets']) && is_array($value['targets']) ? $value['targets'] : [];
    foreach ($allowed_targets as $key) {
      $clean_targets[$key] = !empty($raw_targets[$key]);
    }

    // Backward compat: read either 'hide_for_roles' (new) or 'user_roles' (legacy).
    $raw_roles = [];
    if (isset($value['hide_for_roles']) && is_array($value['hide_for_roles'])) {
      $raw_roles = $value['hide_for_roles'];
    } elseif (isset($value['user_roles']) && is_array($value['user_roles'])) {
      $raw_roles = $value['user_roles'];
    }
    $clean_roles = [];
    foreach ($raw_roles as $role) {
      $clean_roles[] = sanitize_key((string) $role);
    }
    $clean_roles = array_values(array_unique($clean_roles));

    return [
      'targets' => $clean_targets,
      'hide_for_roles' => $clean_roles,
    ];
  }

  public static function gf_social_icons_custom_sanitize($value) {
    // Ensure $value is an array
    if (!is_array($value)) {
        // Unexpected type — fall back to a safe default.
        return [['facebook', 'http://facebook.com']];
    }

    // Sanitize each item in the array
    foreach ($value as $key => $item) {
        if (is_array($item) && count($item) >= 2) {
            $name = sanitize_text_field($item[0]); // Sanitize the name
            $url_or_contact = trim($item[1]); // Trim any leading/trailing spaces

            // Determine if it's a URL, email, or phone number
            if (filter_var($url_or_contact, FILTER_VALIDATE_URL)) {
                // Sanitize URL
                $url_or_contact = esc_url_raw($url_or_contact);
            } elseif (filter_var($url_or_contact, FILTER_VALIDATE_EMAIL)) {
                // Sanitize email
                $url_or_contact = sanitize_email($url_or_contact);
            } elseif (preg_match('/^\+?\d+$/', $url_or_contact)) {
                // Sanitize phone number (assuming it's already digits only)
                $url_or_contact = preg_replace('/[^\d]/', '', $url_or_contact);
            }
            // Update the sanitized name and URL/contact in the array
            $value[$key][0] = $name;
            $value[$key][1] = $url_or_contact;

            // Sanitize per-row options (slot 3). Allowed keys whitelisted.
            $raw_options = (isset($item[3]) && is_array($item[3])) ? $item[3] : [];
            $clean_options = [];
            if (isset($raw_options['prefill_message'])) {
                $clean_options['prefill_message'] = sanitize_textarea_field(substr((string) $raw_options['prefill_message'], 0, 1000));
            }
            if (isset($raw_options['subject'])) {
                $clean_options['subject'] = sanitize_text_field(substr((string) $raw_options['subject'], 0, 200));
            }
            if (isset($raw_options['body'])) {
                $clean_options['body'] = sanitize_textarea_field(substr((string) $raw_options['body'], 0, 2000));
            }
            if (isset($raw_options['sms'])) {
                $clean_options['sms'] = (bool) $raw_options['sms'];
            }
            if (isset($raw_options['label'])) {
                $clean_options['label'] = sanitize_text_field(substr((string) $raw_options['label'], 0, 60));
            }
            if (isset($raw_options['icon_color'])) {
                $clean_options['icon_color'] = self::gf_social_icons_color_sanitize($raw_options['icon_color']);
            }
            if (isset($raw_options['bg_color'])) {
                $clean_options['bg_color'] = self::gf_social_icons_color_sanitize($raw_options['bg_color']);
            }
            if (isset($raw_options['custom_icon'])) {
                $clean_options['custom_icon'] = absint($raw_options['custom_icon']);
            }
            $value[$key][3] = array_filter($clean_options, function ($option) {
                return $option !== '' && $option !== null;
            });
        }
    }
    return $value;
  }

  /**
   * Accepts a hex colour or an rgb()/rgba() string, returns '' when neither.
   *
   * @param mixed $color Raw colour value.
   * @return string
   */
  public static function gf_social_icons_color_sanitize($color)
  {
    $color = trim((string) $color);

    if ('' === $color) {
      return '';
    }

    $hex = sanitize_hex_color($color);
    if ($hex) {
      return $hex;
    }

    if (preg_match('/^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)$/i', $color)) {
      return $color;
    }

    return '';
  }

  /**
   * Toggle controls store their state as ['value' => bool].
   *
   * @param mixed $value Raw setting value.
   * @return array
   */
  public static function gf_social_icons_toggle_sanitize($value)
  {
    $state = is_array($value) ? !empty($value['value']) : (bool) $value;

    return ['value' => $state];
  }

  /**
   * @param mixed $value Raw setting value.
   * @return string
   */
  public static function gf_social_icons_layout_sanitize($value)
  {
    $allowed = ['layout--vertical', 'layout--horizontal'];

    return in_array($value, $allowed, true) ? $value : 'layout--vertical';
  }

  /**
   * @param mixed $value Raw setting value.
   * @return string
   */
  public static function gf_social_icons_animation_sanitize($value)
  {
    $allowed = ['anim--none', 'anim--fade', 'anim--slide'];

    return in_array($value, $allowed, true) ? $value : 'anim--none';
  }
}
