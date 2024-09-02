<?php

/**
 * Sidebar for "Aranceles" section
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

if (!is_active_sidebar('sidebar-aranceles')) {
	return;
}

?>

<div class="col-md-4 widget-area" id="sidebar-aranceles">
	<?php dynamic_sidebar('sidebar-aranceles'); ?>
</div><!-- #sidebar-aranceles -->