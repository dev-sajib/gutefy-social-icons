<?php

namespace GF_SOCIAL_ICONS;
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
        error_log('Unexpected type encountered in gf_social_icons_custom_sanitize: ' . gettype($value));
        return [['facebook', 'http://facebook.com']]; // Return a default array or handle the unexpected type
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
            $value[$key][3] = $clean_options;
        }
    }
    return $value;
}
}
