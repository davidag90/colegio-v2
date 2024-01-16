<?php
/**
 * Barra lateral para sección de Contacto
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! is_active_sidebar( 'sidebar-contacto' ) ) {
	return;
}

?>

	<div class="col-md-4 widget-area" id="sidebar-contacto">
		<?php dynamic_sidebar( 'sidebar-contacto' ); ?>
	</div><!-- #sidebar-contacto -->
