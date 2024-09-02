<?php

/**
 * Custom template for "Bolsa de Trabajo" page
 * 
 * This page retrieves results from an API endpoint using the parameters
 * setted in #busqueda-bolsa form and processing them through an JS file
 * (location ./src/js/bolsa-trabajo.js) that is enqueued only for that page.
 * The resulting registers are used to fill div#anuncios and there's no
 * post query since there's no need for content to be edited
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();

$container = get_theme_mod('understrap_container_type');

?>

<div class="wrapper pt-0 pb-5">
    <div class="cat-header mb-5">
        <div class="bg-primary cat-title text-light px-4 py-3">
            <h1 class="page-title display-5"><?php echo get_the_title(); ?></h1>
        </div>
        <div class="bg-light bg-gradient px-4 py-2 border-5 border-bottom border-primary">
            <p class="text-dark text-muted"><em>Para ejecutar una búsqueda, por favor complete los datos requeridos</em></p>
        </div>
    </div>

    <div class="<?php echo esc_attr($container); ?>" id="content" tabindex="-1">
        <div class="row">
            <div class="col-12">
                <p>Seleccioná una ciudad, una o más especialidades y uno o más requisitos de experiencia para cargar anuncios</p>
            </div><!-- .col -->
        </div><!-- .row -->
        <div class="row">
            <div class="col-12 col-xl-9">
                <form class="mb-5" id="busqueda-bolsa" action="#">
                    <div class="form-group row mb-4">
                        <label for="ciudad" class="col-sm-2 col-form-label">Ciudad</label>
                        <div class="col-sm-10 col-xl-6">
                            <select name="ciudad" id="lista-ciudades" class="form-select">
                                <option value="">Todas las ciudades</option>
                            </select>
                        </div>
                    </div>

                    <fieldset class="form-group row mb-4" id="lista-especialidades">
                        <legend class="col-sm-2 col-form-label float-sm-left pt-0">Especialidad</legend>
                        <div class="col-sm-10 col-form-checks">
                        </div>
                    </fieldset>

                    <fieldset class="form-group row mb-4" id="lista-experiencia">
                        <legend class="col-sm-2 col-form-label float-sm-left pt-0">Experiencia</legend>
                        <div class="col-sm-10 col-form-checks">
                        </div>
                    </fieldset>

                    <button type="button" class="btn btn-danger" id="buscar-anuncios">Buscar</button>
                </form>

                <div id="anuncios"></div>
            </div><!-- .col -->
        </div><!-- .row -->
    </div><!-- #content -->
</div><!-- .wrapper -->

<?php
get_footer();
