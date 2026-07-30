<?php
namespace GF_SOCIAL_ICONS;


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
class Validation{
    public static function gf_social_icons_custom_url_validation($error_object, $value, $setting_object) {
      if(empty($value)){
        return false;
      }
      foreach ($value as $key => $item) {
          if (is_array($item)) {
              $url = trim($item[1]);
              $digits_only = preg_replace('/\D/', '', $url);
              // Check if the URL is either a valid URL, email, or phone-like (digits with optional spaces/dashes/parens/+).
              $is_phone_like = preg_match('/^\+?[\d\s\-\(\)]{7,20}$/', $url) && strlen($digits_only) >= 7;
              if (!filter_var($url, FILTER_VALIDATE_URL) && !filter_var($url, FILTER_VALIDATE_EMAIL) && !$is_phone_like) {
                  return false; // Return default value on validation error
              }
          }
      }
      return $value;
  }
}
