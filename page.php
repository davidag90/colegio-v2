<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );

?>

<div class="wrapper" id="page-wrapper">

	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">

		<div class="row">
			<div class="col-12 col-lg-8">
				<main class="site-main" id="main">
					<?php
					while ( have_posts() ):
						the_post();
						
						get_template_part( 'loop-templates/content', 'page' );
					endwhile;
					?>
				</main>
			</div>
			
			<div class="col-12 col-lg-4">
				<?php dynamic_sidebar( 'right-sidebar' ); ?>
			</div>
		</div><!-- .row -->
	</div><!-- #content -->
</div><!-- #page-wrapper -->

<?php
get_footer();
