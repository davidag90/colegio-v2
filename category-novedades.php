<?php
/**
 * The template for displaying archive pages
 *
 * Learn more: https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );
?>

<div class="wrapper" id="archive-wrapper">
	<div class="cat-header mb-5">
		<div class="bg-primary text-light cat-title px-4 py-3">
			<h1 class="page-title display-5"><?php echo single_cat_title(); ?></h1>
		</div>
		<div class="bg-light bg-gradient px-4 py-2 border-5 border-bottom border-primary">
			<?php the_archive_description( '<p class="text-dark text-muted taxonomy-description"><em>', '</em></p>' ); ?>
		</div>
	</div>

	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">
		<div class="row">
			<div class="col-12 col-lg-8">
				<main class="site-main" id="main">
					<div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mb-5">
						<?php if ( have_posts() ):
							while ( have_posts() ):
								the_post();

								get_template_part( 'loop-templates/content', get_post_format() );
							endwhile;
						else:
							get_template_part( 'loop-templates/content', 'none' );
						endif; ?>
					</div><!-- .row -->
				</main>

				<?php
				// Display the pagination component.
				understrap_pagination(); ?>
			</div><!-- .col-12.col-lg-8 -->

			<div class="col-12 col-lg-4">
				<?php dynamic_sidebar( 'right-sidebar-posts' ); ?>
			</div>
		</div><!-- .row -->
	</div><!-- #content -->
</div><!-- #archive-wrapper -->

<?php get_footer();