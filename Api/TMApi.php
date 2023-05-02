<?php

class TMApi {

    public $namespace = 'tm/v1';

    public function __construct() {
        add_action( 'rest_api_init', [$this, 'task_api'] );
    }

    public function task_api() {
        register_rest_route(
            $this->namespace,
            '/tasks',
            [
                'methods'             => 'POST',
                'permission_callback' => [$this, 'check_permission'],
                'callback'            => [$this, 'create_task_api']
            ]
        );

        register_rest_route(
            $this->namespace,
            '/tasks-list',
            [
                'methods'             => 'GET',
                'permission_callback' => [$this, 'check_permission'],
                'callback'            => [$this, 'show_tasks_list']
            ]
        );

        register_rest_route(
            $this->namespace,
            '/delete-task/(?P<id>\d+)',
            [
                'methods'             => 'POST',
                'permission_callback' => [$this, 'check_permission'],
                'callback'            => [$this, 'delete_task']           
            ]
        );

        register_rest_route(
            $this->namespace,
            '/update-task/(?P<id>\d+)',
            [
                'methods'             => 'POST',
                'permission_callback' => [$this, 'check_permission'],
                'callback'            => [$this, 'update_task']
            ]
        );
        
    }

    public function create_task_api( $request ) {
        global $wpdb;

        $task_name     = $request->get_param( 'task' );
        $task_desc     = $request->get_param( 'description' );
        $task_priority = $request->get_param( 'priority' );
        $task_due_date = $request->get_param( 'dueDate' );
        $task_status   = $request->get_param( 'status' );

        try {
            if ( empty( $task_name ) ) {
                throw new Exception( 'Task Name Cannot Be Empty' );
            }

            if ( empty( $task_desc ) ) {
                throw new Exception( 'Task Description Cannot Be Empty' );
            }

            if ( empty( $task_priority ) ) {
                throw new Exception( 'Task Priority Cannot Be Empty' );
            }

            if ( empty( $task_due_date ) ) {
                throw new Exception( 'Task Due Date Cannot Be Empty' );
            }

            if ( empty( $task_status ) ) {
                throw new Exception( 'Task Status Cannot Be Empty' );
            }

            $status = $wpdb->insert( $wpdb->prefix . 'task_manager_tasks', [
                'title'             => $task_name,
                'description'       => $task_desc,
                'priority'          => $task_priority,
                'due_date'          => $task_due_date,
                'completion_status' => $task_status
            ] );

            if ( $status != false ) {
                return true;
            } else {
                return false;
            }
        } catch ( Exception $e ) {
            return $e->getMessage();
        }
    }

    public function update_task( $request ) {
        global $wpdb;
    
        $task_id       = $request->get_param( 'id' );
        $task_name     = $request->get_param( 'task' );
        $task_desc     = $request->get_param( 'description' );
        $task_priority = $request->get_param( 'priority' );
        $task_due_date = $request->get_param( 'dueDate' );
        $task_status   = $request->get_param( 'status' );
    
        try {
            if ( empty( $task_name ) ) {
                throw new Exception( 'Task Name Cannot Be Empty' );
            }
    
            if ( empty( $task_desc ) ) {
                throw new Exception( 'Task Description Cannot Be Empty' );
            }
    
            if ( empty( $task_priority ) ) {
                throw new Exception( 'Task Priority Cannot Be Empty' );
            }
    
            if ( empty( $task_due_date ) ) {
                throw new Exception( 'Task Due Date Cannot Be Empty' );
            }
    
            if ( empty( $task_status ) ) {
                throw new Exception( 'Task Status Cannot Be Empty' );
            }
    
            $status = $wpdb->update(
                $wpdb->prefix . 'task_manager_tasks',
                [
                    'title'             => $task_name,
                    'description'       => $task_desc,
                    'priority'          => $task_priority,
                    'due_date'          => $task_due_date,
                    'completion_status' => $task_status
                ],
                ['id' => $task_id]
            );
    
            if ( $status != false ) {
                return "Task is updated";
            } else {
                return "Task is not updated";
            }
        } catch ( Exception $e ) {
            return $e->getMessage();
        }
    }

    
    public function delete_task( $request ) {
        global $wpdb;

        $task_id = $request->get_param( 'id' );

        $status = $wpdb->delete(
            $wpdb->prefix . 'task_manager_tasks',
            ['id' => $task_id]
        );

        if ( $status != false ) {
            return true;
        } else {
            return false;
        }
    }


    public function show_tasks_list( $request ) {
        global $wpdb;
        return $wpdb->get_results( "SELECT * from {$wpdb->prefix}task_manager_tasks" );
    }

    public function check_permission() {
        return current_user_can( 'edit_others_posts' );
    }
}