<?php

/**
 * Sidebar for "Trámites" section
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

if (!is_active_sidebar('sidebar-tramites')) {
	return;
}

?>

<div class="col-md-4 widget-area" id="sidebar-tramites">
	<?php dynamic_sidebar('sidebar-tramites'); ?>
</div><!-- #sidebar-tramites -->