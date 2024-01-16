<?php
/**
 * Barra lateral para sección de Aranceles
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! is_active_sidebar( 'sidebar-aranceles' ) ) {
	return;
}

?>

	<div class="col-md-4 widget-area" id="sidebar-aranceles">
		<?php dynamic_sidebar( 'sidebar-aranceles' ); ?>
	</div><!-- #sidebar-aranceles -->
