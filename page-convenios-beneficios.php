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
			<p class="text-dark text-muted"><em>Convenios y Beneficios especiales para Matriculados </em></p>
		</div>
	</div>

	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">
        <div class="row">
            <div class="col-12">
                <p>Utilizá el menú lateral izquierdo para visualizar los convenios de cada rubro y encontrar más fácilmente lo que buscás</p>
            </div><!-- .col -->
        </div><!-- .row -->
		<div class="row">
			<div class="col-12 col-xl-3">
                <div class="list-group" id="lista-rubros">
                    <button type="button" class="list-group-item boton-filtro active" colodont-rubro="todos">Todos</button>
                    <?php $rubros = get_terms( array( 'taxonomy' => 'rubros' ) );
                        if($rubros):
                            foreach ($rubros as $rubro) { ?>
                            <button type="button" class="list-group-item boton-filtro" colodont-rubro="<?php echo $rubro->slug; ?>"><?php echo $rubro->name; ?></button>
                        <?php 
                            $c++;
                        } ?>
                    <?php endif; ?>
                </div><!-- .list-group -->
            </div><!-- .col -->
            
            <div class="col-12 col-xl-9">
                <?php 
                $args = array(
                    'post_type' 	=> 'convenios',
                    'post_status' 	=> 'publish',
                    'orderby'		=> 'menu_order',
                    'order'			=> 'ASC',
                    'nopaging'		=> true
                );

                $posts = new WP_Query( $args ); ?>

                <div class="row g-4">
                    <?php if ( $posts->have_posts() ) :
                        while ( $posts->have_posts() ) : $posts->the_post();
                            $terms = get_the_terms( $posts->ID, 'rubros' ); ?>
                            <div class="col-12 col-sm-4 col-xl-3 <?php if($terms) : foreach($terms as $term) { echo $term->slug; } endif; ?> convenio">
                                <div class="card h-100">
                                    <div class="card-header p-2 text-secondary">
                                        <?php

                                        if($terms):
                                            foreach($terms as $term) {
                                                echo $term->name;
                                            }
                                        endif;
                                        
                                        ?>
                                    </div>

                                    <img src="<?php the_post_thumbnail_url(); ?>" class="card-img-top">
                                    
                                    <div class="card-body d-flex flex-column justify-content-start">
                                        <h5 class="card-title"><?php the_title(); ?></h5>
                                        <p class="card-text"><?php echo get_the_excerpt(); ?></p>
                                        <div class="mt-auto text-end">
                                            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#convenio-<?php echo get_the_ID(); ?>">Más información</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endwhile;
                    endif;
                
                wp_reset_postdata(); ?>
                </div><!-- .row -->
            </div><!-- .col -->
        </div><!-- .row -->
    </div><!-- #content -->
</div><!-- .wrapper -->

<?php
get_footer();
