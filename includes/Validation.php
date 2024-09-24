<?php
namespace GF_SOCIAL_ICONS;

class Validation{
    public static function gf_social_icons_custom_url_validation($error_object, $value, $setting_object) {
      if(empty($value)){
        return false;
      }
      foreach ($value as $key => $item) {
          if (is_array($item)) {
              $url = trim($item[1]);
              // Check if the URL is either a valid URL, email, or phone number
              if (!filter_var($url, FILTER_VALIDATE_URL) && !filter_var($url, FILTER_VALIDATE_EMAIL) && !preg_match('/^\+?\d+$/', $url)) {
                  return false; // Return default value on validation error
              }
          }
      }
      return $value;
  }
}
