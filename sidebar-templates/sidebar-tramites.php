<?php
/**
 * Barra lateral para sección de Trámites
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! is_active_sidebar( 'sidebar-tramites' ) ) {
	return;
}

?>

	<div class="col-md-4 widget-area" id="sidebar-tramites">
		<?php dynamic_sidebar( 'sidebar-tramites' ); ?>
	</div><!-- #sidebar-tramites -->
