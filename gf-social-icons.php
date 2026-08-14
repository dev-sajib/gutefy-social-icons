<?php
/**
 *
 * @link              https://github.com/syed-sajib/gutefy-social-icons
 * @since             1.3.0
 * @package           Gutefy_Social_Icons
 *
 * @wordpress-plugin
 * Plugin Name:       Sticky Social Icons
 * Plugin URI:        https://github.com/syed-sajib/gutefy-social-icons
 * Description:       Add floating, sticky social and contact icons (Facebook, Instagram, X/Twitter, YouTube, LinkedIn, TikTok, WhatsApp, Email, Phone and more) to any site, configured live in the WordPress Customizer.
 * Version:           1.3.0
 * Author:            Gutefy
 * Author URI:        https://profiles.wordpress.org/gutefy/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       gf-social-icons
 * Requires at least: 6.3
 * Tested up to:      7.0
 * Requires PHP:      7.2
 */

 if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
// Autoload Composer dependencies
require_once __DIR__ . '/vendor/autoload.php';

define('TEXT_DOMAIN', 'gf-social-icons');

if (!defined('GF_SOCIAL_ICONS_DIR')) {
    define('GF_SOCIAL_ICONS_DIR', __DIR__);
}
if (!defined('GF_SOCIAL_ICONS_FILE')) {
    define('GF_SOCIAL_ICONS_FILE', __FILE__);
}

if (!defined('GF_SOCIAL_ICONS_URL')) {
    define('GF_SOCIAL_ICONS_URL', plugin_dir_url( __FILE__ ));
}
if (!defined('GF_SOCIAL_ICONS_BASENAME')) {
    define('GF_SOCIAL_ICONS_BASENAME', plugin_basename(__FILE__));
}
// Include the activate.php file
// require_once GF_SOCIAL_ICONS_DIR . '/includes/activate.php';

use GF_SOCIAL_ICONS\Global\Activate;
use GF_SOCIAL_ICONS\Core;
use GF_SOCIAL_ICONS\Global\EnqueueScripts;
use GF_SOCIAL_ICONS\TemplateLoader;

// Activation hook and admin links must be registered while the plugin file loads.
new Activate();

/**
 * Initialize the rest of the plugin on `init`.
 *
 * The Customizer panels, sections and controls carry translated labels, so they
 * must not be built before `init` — doing so triggers WordPress' "translation
 * loading was triggered too early" notice (see _load_textdomain_just_in_time()).
 */
add_action('init', function () {
    new Core();
    EnqueueScripts::init();
    TemplateLoader::init();
});

?>
