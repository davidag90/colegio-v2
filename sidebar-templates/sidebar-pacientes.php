<?php

/**
 * Sidebar for "Pacientes" section
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

if (!is_active_sidebar('sidebar-pacientes')) {
	return;
}

?>

<div class="col-md-4 widget-area" id="sidebar-pacientes">
	<?php dynamic_sidebar('sidebar-pacientes'); ?>
</div><!-- #sidebar-pacientes -->