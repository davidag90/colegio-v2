<?php

if (! function_exists('mostrar_front_novedades')) {
    function mostrar_front_novedades() {
        ob_start();

        $args = array(
            'category_name' => 'novedades',
            'posts_per_page' => 4,
            'order' => 'DESC'
        );
        
        $query = new WP_Query($args);
        
        if ($query->have_posts()) {
            $counter = 1;
        
            $last_post = $query->post_count;
            
            echo '<div id="front-novedades" class="">';
        
            while ($query->have_posts()) {
                $query->the_post();
                
                if($counter != $last_post): echo '<div class="front-novedad card mb-3">';
                else: echo '<div class="front-novedad card">';
                endif;

                    echo '<div class="row g-0">';
                        echo '<div class="col-md-4">';
                            echo '<img src="' . get_the_post_thumbnail_url() . '" class="img-fluid rounded-start">';
                        echo '</div>'; // .col-md-4
                        
                        echo '<div class="col-md-8">';
                            echo '<div class="card-body">';
                                echo '<div class="post-date text-muted">' . get_the_date() . '</div>';
                                echo '<h2 class="card-title">' . get_the_title() . '</h2>';
                                echo '<p class="mb-0">' . get_the_excerpt() . '</p>';
                            echo '</div>'; // .card-body
                        echo '</div>'; // .col-md-8
                    echo '</div>'; // .row.g-0
                echo '</div>'; // .front-novedad.card
                
                $counter++;
            }
            
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