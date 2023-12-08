<?php

if (! function_exists('mostrar_front_novedades')) {
    function mostrar_front_novedades() {
        ob_start();

        $args = array(
            'category_name' => 'novedades',
            'posts_per_page' => 6,
            'order' => 'DESC'
        );
        
        $query = new WP_Query($args);
        
        if ($query->have_posts()) {
            echo '<div class="width-100 py-5" id="front-novedades">';
                echo '<div class="container">';
                    echo '<div class="row">';
                        echo '<section class="splide px-5" aria-label="Novedades">';
                            echo '<div class="splide__track">';
                                echo '<ul class="splide__list">';
                                    while ($query->have_posts()) {
                                        $query->the_post();
                                        $permalink = get_the_permalink();
                                        $title = get_the_title();
                                        $thumbnail = get_the_post_thumbnail_url();
                                        $date = get_the_date();
                                        $excerpt = get_the_excerpt();

                                        echo '<li class="splide__slide">';
                                            echo '<div class="front-novedad card h-100">';
                                                echo '<div class="card-img-top-wrap">';
                                                    echo '<a href="'. $permalink . '"><img src="' . $thumbnail . '" class="card-img-top"></a>';
                                                echo '</div>';
                                                
                                                echo '<div class="card-body d-flex flex-column justify-content-start">';
                                                    echo '<div class="post-date text-muted">' . $date . '</div>';
                                                    echo '<h3 class="card-title h4"><a href="' . $permalink . '">' . $title . '</a></h3>';
                                                    echo '<p class="mb-0">' . $excerpt . '...</p>';
                                                echo '</div>'; // .card-body

                                                echo '<div class="read-more mt-auto pt-3 text-end">';
                                                    echo '<a class="btn btn-outline-light understrap-read-more-link" href="' . $permalink . '">' . __( 'Read More...', 'understrap') . '<span class="screen-reader-text"> from ' . $title . '</span></a>';
                                                echo '</div>'; // .read-more
                                            echo '</div>'; // .front-novedad.card
                                        echo '</li>'; // col-12 col-md-4 col-lg-3
                                    }
                                echo '</ul>';
                            echo '</div>';
                        echo '</section>'; // .splide
                    echo '</div>'; // .row
                echo '</div>'; // .container
            echo '</div>'; // #front-novedades
            
            wp_reset_postdata(); // Restablece los datos del post original
        } else {
            echo '<p>No se encontró contenido de esta sección.</p>';
        }
        
        $output = ob_get_clean();
        
        return $output;
    }
}

add_shortcode('front-novedades', 'mostrar_front_novedades');