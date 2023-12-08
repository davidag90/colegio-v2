<?php
/**
 * The template for displaying all single posts
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

<div class="wrapper" id="single-wrapper">
	<div class="cat-header mb-5">
		<div class="bg-primary cat-title text-light px-4 py-3">
			<?php $category = get_the_category(); ?>
			<h1 class="page-title display-5"><?php echo $category[0]->name; ?></h1>
		</div>
		<div class="bg-light bg-gradient px-4 py-2 border-5 border-bottom border-primary">
			<p class="text-dark text-muted"><em>Información de actualidad del Colegio Odontológico</em></p>
		</div>
	</div>

	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">
		<div class="row">
			<div class="col-12 col-lg-8">
				<main class="site-main" id="main">
					<?php
					while ( have_posts() ):
						the_post();
						
						get_template_part( 'loop-templates/content', 'single' );
						
						understrap_post_nav();
					endwhile;
					?>

				</main>
			</div>

			<div class="col-lg-4">
				<?php dynamic_sidebar( 'right-sidebar-posts' ); ?>
			</div>
		</div><!-- .row -->

	</div><!-- #content -->

</div><!-- #single-wrapper -->

<?php
get_footer();
