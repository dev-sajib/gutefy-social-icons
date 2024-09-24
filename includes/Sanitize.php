<?php

namespace GF_SOCIAL_ICONS;
class Sanitize {
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
        }
    }
    return $value;
}
}
