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

<div class="wrapper pt-0 pb-5">
    <div class="cat-header mb-5">
		<div class="bg-primary cat-title text-light px-4 py-3">
			<h1 class="page-title display-5"><?php echo get_the_title(); ?></h1>
		</div>
		<div class="bg-light bg-gradient px-4 py-2 border-5 border-bottom border-primary">
			<p class="text-dark text-muted"><em>Consultá la cobertura de Urgencias Odontológicas en el día de la fecha</em></p>
		</div>
	</div>

	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">
		<div class="row">
			<div class="col-12 col-xl-9">
                <div id="profesionales">
                    <div class="d-flex justify-content-start align-items-center">
                        <div class="spinner-border" role="status"></div>
                        <span class="ms-2">Cargando...</span>
                    </div>
                </div>
            </div><!-- .col -->
            
            <div class="col-12 col-xl-3">
                
            </div><!-- .col -->
        </div><!-- .row -->
    </div><!-- #content -->
</div><!-- .wrapper -->

<?php
get_footer();
