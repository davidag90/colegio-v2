<?php
/**
 * The right sidebar containing the main widget area
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! is_active_sidebar( 'right-sidebar-frontpage' ) ) {
	return;
}

?>

	<div class="col-md-4 widget-area" id="right-sidebar">
		<?php dynamic_sidebar( 'right-sidebar-frontpage' ); ?>
	</div><!-- #right-sidebar -->
