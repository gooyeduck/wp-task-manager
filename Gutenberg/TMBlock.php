<?php

class TMBlock {
    public function __construct() {
        add_action( 'init', [$this, 'register_block'] );
    }

    public function register_block() {
        if ( function_exists( 'register_block_type' ) ) {

            //Enqueing the js and the styles file of the Gutenberg

            $asset_deps_admin = include GUTENBERG_PATH . 'build/index.asset.php';
            $asset_deps_front = include FRONTEND_PATH . 'build/js/task-manager.asset.php';

            wp_register_script( 'tm-block', GUTENBERG_URL . 'build/index.js', $asset_deps_admin['dependencies'], $asset_deps_admin['version'] );
            wp_register_script( 'tm-block-font-end', FRONTEND_URL . 'build/js/task-manager.js', $asset_deps_front['dependencies'], $asset_deps_front['version'], 9999 );
            wp_register_style( 'tm-block', GUTENBERG_URL . 'build/index.css', [], rand() );
            wp_register_style( 'tm-block-front-end', FRONTEND_URL . 'build/css/task-manager.css', [], rand(), 9999 );

            register_block_type(
                GUTENBERG_PATH . 'src',
                [
                    'editor_script'   => 'tm-block',
                    'editor_style'    => 'tm-block',
                    'script'          => 'tm-block-font-end',
                    'style'           => 'tm-block-front-end',
                    'render_callback' => [$this, 'server_side_render']
                ]
            );
        }
    }

    //Server rendering the React component to the frontend
    public function server_side_render() {
        return '<div id="task-manager-parent"></div>';
    }
}