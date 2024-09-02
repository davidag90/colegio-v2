<?php

/**
 * Sidebar for "Comisiones" section
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

if (!is_active_sidebar('sidebar-comisiones')) {
	return;
}

?>

<div class="col-md-4 widget-area" id="sidebar-comisiones">
	<?php dynamic_sidebar('sidebar-comisiones'); ?>
</div><!-- #sidebar-comisiones -->