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



if (! function_exists('mostrar_aranceles_vigentes')) {
    function mostrar_aranceles_vigentes() {
        ob_start();

        $args = array(
            'post_type' => 'arancel',
            'nopaging' => true,
            'date_query' => array(
                'after' => '2020-09-01',
                'inclusive' => true
            )
        );
        
        $query = new WP_Query($args);
        
        if ($query->have_posts()):
            echo '<div id="resumen-aranceles">';
                while($query->have_posts()):
                    $query->the_post();
                    
                    $titulo = get_the_title();
                    $thumb = get_the_post_thumbnail();
                    $link = get_field('link_doc');

                    // Ternarios para chequear el primer arancel y destacarlo
                    echo '<div class="arancel border border-dark ' . ($c == 0 ? 'bg-primary text-light border-opacity-50' : 'text-bg-light border-opacity-25') . ' rounded p-3">'; 
                        echo '<div class="thumb-arancel">' . $thumb . '</div>';
                        echo '<div class="desc-arancel">';
                            echo '<h3 class="titulo-arancel">' . $titulo . '</h3>';
                            echo '<a class="btn ' . ($c == 0 ? 'btn-light' : 'btn-primary link-light') . '" href="' . $link . '" target="_blank">Ver aranceles</a>';
                        echo '</div>'; // .desc-arancel
                    echo '</div>'; // .arancel

                    $c++;
                endwhile;
            echo '</div>'; // #resumen-aranceles            
            wp_reset_postdata(); // Restablece los datos del post original
        else:
            echo '<p>No se encontró contenido de esta sección.</p>';
        endif;
        
        $output = ob_get_clean();
        
        return $output;
    }
}

add_shortcode('aranceles-vigentes', 'mostrar_aranceles_vigentes');



if (! function_exists('mostrar_valor_min_cons')) {
    function mostrar_valor_min_cons() {
        ob_start();

        $args = array(
            'post_type' => 'valor-min-cons',
            'nopaging' => true
        );
        
        $query = new WP_Query($args);
        $c = 0;
        
        if ($query->have_posts()):
            while($query->have_posts()):
                $query->the_post();
                
                $link = get_field('link_doc'); 
                $titulo = get_the_title();
                $thumb = get_the_post_thumbnail();
                
                if($c == 0):
                    echo '<div class="ultimo-folleto mb-4">';
                        echo '<div class="bg-dark bg-opacity-75 text-light rounded p-2 mb-2">';
                            echo $thumb;
                            echo '<h4 class="h5 mx-0 my-2">' . $titulo . '</h4>';
                        echo '</div>';
                        echo '<a class="btn btn-dark d-block" href="' . $link . '" target="_blank">Descargar para imprimir</a>';
                    echo '</div>'; // .ultimo-folleto
                else:
                    if ($c == 1):
                        echo '<div class="list-group list-group-flush">';
                    endif;
                    echo '<a href="' . $link . '" class="list-group-item bg-transparent" target="_blank"><i class="fa-solid fa-file-lines me-2"></i>' . $titulo . '</a>';
                endif;

                $c++;
                endwhile;
            echo '</div>'; // .list-group
            
            wp_reset_postdata(); // Restablece los datos del post original
        else:
            echo '<p>No se encontró contenido de esta sección.</p>';
        endif;
        
        $output = ob_get_clean();
        
        return $output;
    }
}

add_shortcode('valor-min-cons', 'mostrar_valor_min_cons');


if (! function_exists('mostrar_resoluciones')) {
    function mostrar_resoluciones() {
        ob_start();

        $args = array(
            'post_type' => 'resolucion',
            'nopaging' => true
        );
        
        $query = new WP_Query($args);
        
        if ($query->have_posts()):
            echo '<table class="table table-striped">';
                echo '<thead class="table-primary">';
                    echo '<tr>';
                        echo '<th>Resolución</th>';
                        echo '<th>Fecha</th>';
                    echo '</tr>';
                echo '</thead>';

                echo '<tbody>';
                while($query->have_posts()):
                    $query->the_post();

                    $titulo = get_the_title();
                    $fecha = get_the_date();
                    $link_doc = get_field('doc_pdf');

                    echo '<tr>';
                        echo '<td><a href="' . $link_doc . '" class="link-dark" target="_blank">' . $titulo . '</a></td>';
                        echo '<td>' . $fecha . '</td>';
                    echo '</tr>';
                endwhile;
                echo '</tbody>';
            echo '</table>'; //
            
            wp_reset_postdata(); // Restablece los datos del post original
        else:
            echo '<p>No se encontró contenido de esta sección.</p>';
        endif;
        
        $output = ob_get_clean();
        
        return $output;
    }
}

add_shortcode('lista-resoluciones', 'mostrar_resoluciones');



if (! function_exists('mostrar_comisiones_trabajo')) {
    function mostrar_comisiones_trabajo() {
        ob_start();

        $parent_id = get_the_ID();
        $child_pages = get_pages(array( 'child_of' => $parent_id ));
        
        if (!empty($child_pages)):
            echo '<div id="comisiones-trabajo">';

            foreach ($child_pages as $child) {
                $icono_fa = get_field('icono_fa', $child->ID);

                if( empty($icono_fa) ) {
                    $icono_fa = "fa-solid fa-file-lines";
                }

                echo '<div class="comision bg-primary text-light text-center p-3 rounded position-relative d-flex flex-row align-items-center justify-content-start">';
                    echo '<div class="icono me-3"><i class="' . $icono_fa . ' fa-3x fa-fw"></i></div>';
                    echo '<a href="' . get_page_link($child->ID) . '" class="link-light stretched-link text-decoration-none text-start" target="_blank">' . $child->post_title . '</a>';
                echo '</div>'; // .comision
            }

            echo '</div>';
        else:
            echo '<p>No se encontraron elementos en esta sección.</p>';
        endif;
        
        $output = ob_get_clean();
        
        return $output;
    }
}

add_shortcode('mostrar-comisiones-trabajo', 'mostrar_comisiones_trabajo');



if (! function_exists('mostrar_tramites_online')) {
    function mostrar_tramites_online() {
        ob_start();

        $parent_id = get_the_ID();
        $child_pages = get_pages(array(
            'child_of'      => $parent_id,
            'sort_column'   => 'menu_order'
        ));
        
        if (!empty($child_pages)):
            echo '<div id="tramites-online">';

            foreach ($child_pages as $child) {
                $icono_fa = get_field('icono_fa', $child->ID);

                if( empty($icono_fa) ) {
                    $icono_fa = "fa-solid fa-file-lines";
                }

                echo '<div class="tramite bg-primary text-light text-center p-3 rounded position-relative d-flex flex-row align-items-center justify-content-start">';
                    echo '<div class="icono me-3"><i class="' . $icono_fa . ' fa-3x fa-fw"></i></div>';
                    echo '<a href="' . get_page_link($child->ID) . '" class="link-light stretched-link text-decoration-none text-start" target="_blank">' . $child->post_title . '</a>';
                echo '</div>'; // .tramite
            }

            echo '</div>'; // #tramites-online
        else:
            echo '<p>No se encontraron elementos en esta sección.</p>';
        endif;
        
        $output = ob_get_clean();
        
        return $output;
    }
}

add_shortcode('mostrar-tramites-online', 'mostrar_tramites_online');



if (! function_exists('mostrar_delegados')) {
    function mostrar_delegados() {
        ob_start();

        $args = array(
            'post_type' => 'delegado',
            'nopaging' => true,
            'order' => 'ASC',
            'orderby' => 'title'
        );
        
        $query = new WP_Query($args);
        
        if ($query->have_posts()):
            $c = 0;
            echo '<p>Seleccioná un departamento para ver sus Delegados Departamentales</p>';
            echo '<div class="mb-5" id="delegados-departamentales">';
                echo '<form>';
                    echo '<div class="mb-3" id="select-departamento-wrap">';                
                        echo '<select class="form-select" aria-label="Selecciona un departamento" id="lista-departamentos">';
                            while($query->have_posts()):
                                $query->the_post();
                                $departamento = get_post_field( 'post_name' );
                                $titulo = get_the_title();

                                if($c == 0):
                                    echo '<option value="' . $departamento . '" selected>' . $titulo . '</option>';
                                else:
                                    echo '<option value="' . $departamento . '">' . $titulo . '</option>';
                                endif;

                                $c++;
                            endwhile;
                        echo '</select>';
                    echo '</div>'; // #select-departamento-wrap
                echo '</form>';

                $c = 0;
                $query->rewind_posts();

                echo '<div id="content-departamentos">';
                while($query->have_posts()):
                    $query->the_post();
                    $departamento = get_post_field( 'post_name' );

                    if($c == 0):
                        echo '<div class="d-block content-departamento bg-primary bg-opacity-25 border border-primary rounded p-4" id="' . $departamento . '">' . get_the_content() . '</div>';
                    else:
                        echo '<div class="d-none content-departamento bg-primary bg-opacity-25 border border-primary rounded p-4" id="' . $departamento . '">' . get_the_content() . '</div>';
                    endif;

                    $c++;
                endwhile;
                echo '</div>'; // #content-departamentos
            echo '</div>'; // #delegados-departamentales

            wp_reset_postdata(); // Restablece los datos del post original
        else:
            echo '<p>No se encontró contenido de esta sección.</p>';
        endif;
        
        $output = ob_get_clean();
        
        return $output;
    }
}

add_shortcode('mostrar-delegados', 'mostrar_delegados');


if (! function_exists('mostrar_revistas')) {
    function mostrar_revistas() {
        ob_start();

        $args = array(
            'post_type' => 'revista',
            'nopaging' => true
        );
        
        $query = new WP_Query($args);
        $c = 0;
        
        if ($query->have_posts()):
            echo '<div id="resumen-revistas" class="mb-5">';
                while($query->have_posts()):
                    $query->the_post();
                    
                    $edicion = get_field('edicion_nro');
                    $ano = get_field('ano');
                    $link = get_field('link_doc');
                    $titulo = get_the_title();
                    $thumb = get_the_post_thumbnail();
                    
                    $date = get_the_date('Y-m-d H:i:s');
                    $date_obj = new DateTime($date);

                    $date_month = date_i18n('F', $date_obj->getTimestamp());
                    $date_month_ok = ucfirst($date_month);

                    $date_year = $date_obj->format('Y');
                    
                    // Ternarios para chequear el primer ejemplar y destacarlo
                    echo '<div class="revista border border-dark ' . ($c == 0 ? 'bg-primary text-light border-opacity-50' : 'text-bg-light border-opacity-25') . ' rounded p-3">';
                        echo '<div class="thumb-revista">' . $thumb . '</div>';
                        echo '<div class="desc-revista">';
                            echo '<h3 class="titulo-revista">Edición N° ' . $edicion . '</h3>';
                            echo '<p class="meta-revista">' . $date_month_ok . ' ' . $date_year .'</p>';
                            echo '<a class="btn ' . ($c == 0 ? 'btn-light' : 'btn-primary link-light') . '" href="' . $link . '" target="_blank">Ver ejemplar</a>';
                        echo '</div>'; // .desc-revista
                    echo '</div>'; // .revista

                    $c++;
                endwhile;
            echo '</div>'; // #resumen-revistas
            
            wp_reset_postdata(); // Restablece los datos del post original
        else:
            echo '<p>No se encontró contenido de esta sección.</p>';
        endif;
        
        $output = ob_get_clean();
        
        return $output;
    }
}

add_shortcode('mostrar-revistas','mostrar_revistas');


if (! function_exists('mostrar_boletines')) {
    function mostrar_boletines() {
        ob_start();

        $args = array(
            'post_type' => 'boletin',
            'nopaging' => true
        );
        
        $query = new WP_Query($args);
        $c = 0;
        
        if ($query->have_posts()):
            echo '<div id="resumen-boletines">';
                while($query->have_posts()):
                    $query->the_post();
                    $edicion = get_field('edicion_nro');
                    $ano = get_field('ano');
                    $link = get_field('url_boletin');
                    
                    if($c == 0):
                        $bg = 'bg-success';
                    else:
                        $bg = 'bg-primary';
                    endif;

                    echo '<div class="boletin ' . $bg . ' text-light text-center p-3 rounded position-relative d-flex flex-column align-items-center justify-content-start">';
                        echo '<div class="icono mb-2"><i class="fa-solid fa-file-lines fa-3x"></i></div>';
                        echo '<a href="' . $link . '" class="link-light stretched-link text-decoration-none" target="_blank">Edición N° ' . $edicion . '<br>Año ' . $ano . '</a>';
                    echo '</div>'; // .boletin

                    $c++;
                endwhile;
            echo '</div>'; // #resumen-boletines
            
            wp_reset_postdata(); // Restablece los datos del post original
        else:
            echo '<p>No se encontró contenido de esta sección.</p>';
        endif;
        
        $output = ob_get_clean();
        
        return $output;
    }
}

add_shortcode('mostrar-boletines','mostrar_boletines');


if (! function_exists('mostrar_links_interes')) {
    function mostrar_links_interes() {
        ob_start();

        $args = array(
            'post_type' => 'link_interes',
            'nopaging' => true
        );
        
        $query = new WP_Query($args);
        
        if ($query->have_posts()):
            echo '<div id="links-interes">';
                while($query->have_posts()):
                    $query->the_post();
                    
                    $thumb = get_the_post_thumbnail_url();
                    $titulo = get_the_title();
                    $desc = get_field('desc');
                    $link = get_field('link');

                    echo '<div class="card h-100">';
                        echo '<img class="' . $thumb . ' card-img-top">';
                        echo '<div class="card-body">';
                            echo '<h3 class="card-title h4">' . $titulo . '</h3>';
                            echo '<p class="card-text">' . $desc . '</p>';
                            echo '<a class="btn btn-primary" href="' . $link . '"></a>';
                        echo '</div>'; // .card-body
                    echo '</div>'; // .card
                endwhile;
            echo '</div>'; // #links-interes            
            
            wp_reset_postdata(); // Restablece los datos del post original
        else:
            echo '<p>No se encontró contenido de esta sección.</p>';
        endif;
        
        $output = ob_get_clean();
        
        return $output;
    }
}

add_shortcode('mostrar-links-interes', 'mostrar_links_interes');