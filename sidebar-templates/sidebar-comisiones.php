<?php
/**
 * Barra lateral para sección de Comisiones
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! is_active_sidebar( 'sidebar-comisiones' ) ) {
	return;
}

?>

	<div class="col-md-4 widget-area" id="sidebar-comisiones">
		<?php dynamic_sidebar( 'sidebar-comisiones' ); ?>
	</div><!-- #sidebar-comisiones -->