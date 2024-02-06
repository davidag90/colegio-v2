<?php
/**
 * Template Name: Trámite
 * 
 * @package Colegio Theme v2
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );

?>
<div class="wrapper" id="page-wrapper">
	<div class="custom-header mb-5">
		<div class="bg-primary custom-title text-light px-4 py-3">
			<h1 class="page-title display-5"><?php echo get_the_title(); ?></h1>
		</div>
		<div class="bg-light bg-gradient px-4 py-2 border-5 border-bottom border-primary">
			<p class="text-muted"><em><?php echo get_field( 'subtitulo_page' ); ?></em></p>
		</div>
	</div>
	
	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">
		<div class="row">
			<div class="col-12 col-md-8">
				<main class="site-main pb-5" id="main">
					<?php while ( have_posts() ): ?>
						<?php the_post(); 
						
						get_template_part( 'loop-templates/content', 'page' );
					endwhile;
					?>
				</main>
			</div>

			<?php get_template_part( 'sidebar-templates/sidebar', 'tramites' ); ?>
		</div><!-- .row -->
	</div><!-- #content -->
</div><!-- #page-wrapper -->

<?php
get_footer();
