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
    private $db;

    public function __construct() {
        $this->defineConstants();
        $this->requireFiles();
        $this->loadClasses();

        register_activation_hook( __FILE__, [$this->db, 'wptm_create_db'] );
    }

    public function requireFiles() {
        require API_PATH . 'TMApi.php';
        require GUTENBERG_PATH . 'TMBlock.php';
        require_once DATABASE_PATH . 'wptm-db.php';
    }

    public function loadClasses() {
        new TMApi();
        $this->db = new WPTM_DB();
        new TMBlock();

    }

    public function defineConstants() {
        define( 'GUTENBERG_PATH', __DIR__ . '/Gutenberg/' );
        define( 'API_PATH', __DIR__ . '/Api/' );
        define( 'FRONTEND_PATH', __DIR__ . '/Frontend/' );
        define( 'DATABASE_PATH', plugin_dir_path( __FILE__ ) . '/Database/' );
        define( 'GUTENBERG_URL', plugin_dir_url( __FILE__ ) . 'Gutenberg/' );
        define( 'FRONTEND_URL', plugin_dir_url( __FILE__ ) . 'Frontend/' );
        define( 'DATABASE_URL', plugin_dir_url( __FILE__ ) . 'Database/' );
    }
}

new WPTM();
