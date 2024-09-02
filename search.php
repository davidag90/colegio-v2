<?php

/**
 * The template for displaying search results pages
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();

$container = get_theme_mod('understrap_container_type'); ?>

<div class="wrapper" id="search-wrapper">
	<div class="custom-header mb-5">
		<div class="bg-primary custom-title text-light px-4 py-3">
			<h1 class="page-title display-5">Resultados de búsqueda para: '<?php echo get_search_query(); ?>'</h1>
		</div>
		<div class="bg-light bg-gradient px-4 py-2 border-5 border-bottom border-primary">
			<!-- <p class="text-muted"><em></em></p> -->
		</div>
	</div>

	<div class="<?php echo esc_attr($container); ?> pb-5" id="content" tabindex="-1">
		<div class="row">
			<main class="site-main" id="main">
				<?php if (have_posts()) :
					while (have_posts()) :
						the_post();

						get_template_part('loop-templates/content', 'search');
					endwhile;
				else :
					get_template_part('loop-templates/content', 'none');
				endif; ?>
			</main>

			<?php understrap_pagination(); ?>
		</div><!-- .row -->
	</div><!-- #content -->
</div><!-- #search-wrapper -->

<?php get_footer();
