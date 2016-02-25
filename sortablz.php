<?php
/*
Plugin Name: Sortablz 
Plugin URI: http://zendgame.ocm
Description: A Zendgame WordPress Plugin that sorts HTML elements with AJAX.
	Works on, e.g., divs, rather than table columns.
Version: 1.a1
Author: Bonnie Souter
Author URI: http://zendgame.com
License: GPLv2
*/
/*  Copyright 2015 Bonnie Souter  (email : bonnie@zendgame.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

/**
 * Singleton class for setting up the plugin.
 *
 */
final class Sortablz_Plugin {

	public $dir_uri = '';
	public $js_uri = '';

	/**
	 * Returns the instance.
	 */
	public static function get_instance() {

		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new Sortablz_Plugin;
			$instance->setup();
		}

		return $instance;
	}
	
	/**
	 * Constructor method.
	 */
	private function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this , 'register_sortablz_script' ) );

		add_shortcode( 'SORTABLZ' , array( $this , 'sortablz' ) );
	}
	
	function register_sortablz_script() {
		wp_register_script( 'sortablz', $this->js_uri . "sortablz.js", array( 'jquery' ), '1.0.0', true );
	}

	public function sortablz( $atts, $content = null, $tagname = null ) {
		wp_enqueue_script( 'sortablz' );
		return '';
	}

	/**
	 * Magic method to output a string if trying to use the object as a string.
	 */
	public function __toString() {
		return 'sortablz';
	}

	/**
	 * Magic method to keep the object from being cloned.
	 */
	public function __clone() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Sorry, no can do.', 'sortablz' ), '1.0' );
	}

	/**
	 * Magic method to keep the object from being unserialized.
	 */
	public function __wakeup() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Sorry, no can do.', 'sortablz' ), '1.0' );
	}

	/**
	 * Magic method to prevent a fatal error when calling a method that doesn't exist.
	 */
	public function __call( $method = '', $args = array() ) {
		_doing_it_wrong( "Sortablz_Plugin::{$method}", esc_html__( 'Method does not exist.', 'sortablz' ), '1.0' );
		unset( $method, $args );
		return null;
	}

	/**
	 * Sets up globals.
	 */
	private function setup() {

		// Main plugin directory path and URI.
		$this->dir_uri  = trailingslashit( plugin_dir_url(  __FILE__ ) );

		// Plugin directory URIs.
		$this->js_uri  = trailingslashit( $this->dir_uri . 'js'  );
	}

}

/**
 * Gets the instance of the `Sortablz_Plugin` class.  
 */
function sortablz_plugin() {
	return Sortablz_Plugin::get_instance();
}

// Let's roll!
sortablz_plugin();