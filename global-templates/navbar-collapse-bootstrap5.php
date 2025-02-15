<?php

/**
 * Header Navbar (bootstrap5)
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;
?>

<nav id="main-nav" class="navbar navbar-expand-xl navbar-dark" aria-labelledby="main-nav-label">
	<h2 id="main-nav-label" class="screen-reader-text">
		<?php esc_html_e('Main Navigation', 'understrap'); ?>
	</h2>

	<div class="container-fluid">

		<!-- Your site branding in the menu -->
		<?php get_template_part('global-templates/navbar-branding'); ?>

		<button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle navigation', 'understrap'); ?>">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="d-block d-xl-none break">&nbsp;</div>

		<div class="d-xl-flex flex-column align-items-end w-100">
			<!-- Search form -->
			<?php get_search_form(); ?>

			<!-- The WordPress Menu goes here -->
			<?php wp_nav_menu(
				array(
					'theme_location'  => 'primary',
					'container_class' => 'collapse navbar-collapse',
					'container_id'    => 'navbarNavDropdown',
					'menu_class'      => 'navbar-nav ms-auto mt-2 mt-xl-0',
					'fallback_cb'     => '',
					'menu_id'         => 'main-menu',
					'depth'           => 2,
					'walker'          => new Understrap_WP_Bootstrap_Navwalker(),
				)
			);
			?>
		</div><!-- .d-xl-flex -->
	</div><!-- .container(-fluid) -->

</nav><!-- #main-nav -->