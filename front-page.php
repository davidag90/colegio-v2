<?php
/**
 * Template Name: Right Sidebar Layout
 *
 * This template can be used to override the default template and sidebar setup
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

<div class="wrapper" id="page-wrapper">

	<div class="<?php echo esc_attr( $container ); ?>" id="content">			
		<div id="front-carousel" class="carousel slide width-100 mb-5" data-bs-ride="carousel">
			
			<div class="carousel-inner">
			
				<div class="carousel-item active">
					<picture>
						<source srcset="https://loremflickr.com/1920/1920?lock=4" class="d-block w-100" media="(max-width:768px)">
						<img src="https://loremflickr.com/1920/560?lock=1" class="d-block w-100">	
					</picture>
				</div>
			
				<div class="carousel-item">
					<picture>
						<source srcset="https://loremflickr.com/1920/1920?lock=5" class="d-block w-100" media="(max-width:768px)">
						<img src="https://loremflickr.com/1920/560?lock=2" class="d-block w-100">
					</picture>
				</div>
			
				<div class="carousel-item">
					<picture>
						<source srcset="https://loremflickr.com/1920/1920?lock=6" class="d-block w-100" media="(max-width:768px)">
						<img src="https://loremflickr.com/1920/560?lock=3" class="d-block w-100">
					</picture>
				</div>
			
			</div><!-- .carousel-inner -->

		</div><!-- .carousel.slide -->

		<div class="row">

			<div class="<?php echo is_active_sidebar( 'right-sidebar-frontpage' ) ? 'col-md-8' : 'col-md-12'; ?> content-area" id="primary">

				<main class="site-main" id="main" role="main">

					<?php
					while ( have_posts() ) {
						the_post();
					}

					the_content();
					?>

				</main>

			</div><!-- #primary -->

			<?php get_template_part( 'sidebar-templates/sidebar', 'right-frontpage' ); ?>

		</div><!-- .row -->

	</div><!-- #content -->

</div><!-- #page-wrapper -->

<?php
get_footer();
