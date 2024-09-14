<?php
namespace GF_SOCIAL_ICONS\Global;

use GF_SOCIAL_ICONS\Templates\PostThumbnail;
use GF_SOCIAL_ICONS\Templates\PostMeta;
use GF_SOCIAL_ICONS\Templates\AuthorBox;
use \GF_SOCIAL_ICONS\Templates\Header;
use \GF_SOCIAL_ICONS\Global\Settings;

class Helper
{
  public static function getDataValue($value, $subkey)
  {
    $post_title_area_elements_array = get_option(Settings::SETTING_ID__POST_TITLE_AREA__ELEMENTS);

      foreach ($post_title_area_elements_array as $item) {
          if ($item['value'] === $value) {
              return $item['visiblity'];
          }
      }
      return null; // Return null if the value is not found
    
  }
  public static function renderSingleBlogHeaderArea()
  {
    ob_start();
    $getType = get_option(Settings::SETTING_ID__POST_TITLE_AREA__HEADER_LAYOUT_SELECTION);
    $getClass = ($getType == 'type-2') ? Settings::CLASS_NAME_HEADER_TYPE_TWO_WRAPPER : Settings::CLASS_NAME_HEADER_TYPE_ONE_WRAPPER;
    $post_title_area_elements_array = get_option(Settings::SETTING_ID__POST_TITLE_AREA__ELEMENTS,Settings::DEFAULT__POST_TITLE_AREA__ELEMENTS);

    echo Header::getHeader(
      $getType,
      $getClass,
      $post_title_area_elements_array
    );
    return ob_get_clean();
  }

  public static function renderSingleBlogContentArea()
  {
    ob_start();

    if (get_option(Settings::SETTING_ID__SINGLE_BLOG__POST_ELEMENT__POST_THUMBNAIL, false)) {
      echo PostThumbnail::loadThumbnail();
    }
    ?>
    <div class="post-content-body"><?php the_content() ?> </div>
    <?php
    if (get_option(Settings::SETTING_ID__SINGLE_BLOG__POST_ELEMENT__POST_TAGS, false)) {
      echo PostMeta::loadHeading("Tags");
      echo PostMeta::loadTags();
    }
    if (get_option(Settings::SETTING_ID__SINGLE_BLOG__POST_ELEMENT__AUTHOR_BOX, false)) {
      echo AuthorBox::loadAuthorBox();
    }
    return ob_get_clean();
  }


}
