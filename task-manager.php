<?php
/**
 * Plugin Name: WP Task Manager
 * Plugin URI:  www.facebook.com
 * Description: An task manager assignment
 * Version:     1.0.0
 * Author:      Satyajit Talukdar
 * Author URI:  www.facebook.com
 * Text Domain: task-manager
 * Domain Path: /languages
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package     WP Task Manager
 * @author      Satyajit Talukdar
 * @copyright   2022
 * @license     GPL-2.0+
 *
 *
 * Prefix: WPTM
 */

class WPTM {
    public function __construct() {
        $this->defineConstants();
        $this->requireFiles();
        $this->loadClasses();
    }

    public function requireFiles() {
        require GUTENBERG_PATH . 'TMBlock.php';
    }

    public function loadClasses() {
        new TMBlock();
    }

    public function defineConstants() {
        define( 'GUTENBERG_PATH', __DIR__ . '/Gutenberg/' );
        define( 'API_PATH', __DIR__ . '/Api/' );
        define( 'FRONTEND_PATH', __DIR__ . '/Frontend/' );
        define( 'GUTENBERG_URL', plugin_dir_url( __FILE__ ) . 'Gutenberg/' );
        define( 'FRONTEND_URL', plugin_dir_url( __FILE__ ) . 'Frontend/' );
    }
}

new WPTM();