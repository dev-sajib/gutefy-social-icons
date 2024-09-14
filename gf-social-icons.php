<?php
/**
 *
 * @link              https://gutefy.com
 * @since             1.0.1
 * @package           Gutefy_Social_Icons
 *
 * @wordpress-plugin
 * Plugin Name:       Gutefy Social Icons 
 * Plugin URI:        https://gutefy.com
 * Description:       Effortlessly adding floating social icons for seamless display and interaction.
 * Version:           1.0.1
 * Author:            Gutefy
 * Author URI:        https://portfolio.gutefy.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       gf-social-icons
 * Domain Path:       /languages
 * Requires at least: 6.3
 * Requires PHP:      7.2
 */

 if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
// Autoload Composer dependencies
require_once __DIR__ . '/vendor/autoload.php';

define('TEXT_DOMAIN', 'gf-social-icons');

if (!defined('PLUGIN_ROOT_DIRECTORY')) {
    define('PLUGIN_ROOT_DIRECTORY', __DIR__);
}
if (!defined('PLUGIN_ROOT_FILE')) {
    define('PLUGIN_ROOT_FILE', __FILE__);
}
if (!defined('PLUGIN_ROOT_DIRECTORY_URL')) {
    define('PLUGIN_ROOT_DIRECTORY_URL', plugin_dir_url( __FILE__ ));
}

// Include the activate.php file
// require_once PLUGIN_ROOT_DIRECTORY . '/includes/activate.php';

use GF_SOCIAL_ICONS\Global\Activate;
use GF_SOCIAL_ICONS\Core;
use GF_SOCIAL_ICONS\Global\EnqueueScripts;
use GF_SOCIAL_ICONS\TemplateLoader;

// Initialize the classes
new Core;
new Activate;
EnqueueScripts::init();
TemplateLoader::init();

// Initialize the Activate class for activation hook
new Activate();
?>
