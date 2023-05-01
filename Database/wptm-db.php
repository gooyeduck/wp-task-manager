<?php

class WPTM_DB {
    private $wpdb;
    private $table_name;

    public function __construct() {
        global $wpdb;
        $this->wpdb       = $wpdb;
        $this->table_name = $this->wpdb->prefix . 'task_manager_tasks';
    }

    public function wptm_create_db() {
        $charset_collate = $this->wpdb->get_charset_collate();
        $sql             = "CREATE TABLE $this->table_name (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            title varchar(255) NOT NULL,
            description text NOT NULL,
            priority varchar(20) NOT NULL,
            due_date datetime NOT NULL,
            completion_status varchar(20) NOT NULL,
            PRIMARY KEY (id)
        ) $charset_collate;";
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta( $sql );
    }

    public function wptm_delete_db() {
        $sql = "DROP TABLE IF EXISTS $this->table_name;";
        $this->wpdb->query( $sql );
    }
}
