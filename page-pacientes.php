<?php

/**
 * Custom template for "Convenios y Beneficios" page
 * 
 * 
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();

$container = get_theme_mod('understrap_container_type');

?>
<div class="wrapper" id="page-wrapper">
	<h1 class="d-none"><?php echo get_the_title(); ?></h1>
	<div class="<?php echo esc_attr($container); ?>" id="content" tabindex="-1">
		<div class="row">
			<div class="col-12">
				<div id="header-pacientes" class="my-5">
					<img src="<?php echo get_the_post_thumbnail_url() ?>" alt="Id eiusmod quis do duis ea ex elit officia commodo commodo ullamco amet laboris." />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-lg-8 order-2 order-lg-1">
				<main class="site-main" id="main">
					<?php
					while (have_posts()) :
						the_post();

						get_template_part('loop-templates/content', 'pacientes');
					endwhile;
					?>
				</main>
			</div>

			<div class="col-12 col-lg-4 order-1 order-lg-2">
				<div class="sticky-lg-top pt-lg-5">
					<?php dynamic_sidebar('sidebar-pacientes'); ?>
				</div>
			</div>
		</div><!-- .row -->
	</div><!-- #content -->
</div><!-- #page-wrapper -->

<?php
get_footer();
