<?php

/**
 * Custom template for "Convenios y Beneficios" page
 * 
 * 
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();

$container = get_theme_mod('understrap_container_type');
$thumb_mobile = get_field('thumb_mobile');
$thumb_full = get_the_post_thumbnail_url();
?>

<div class="wrapper" id="page-wrapper">
	<h1 class="d-none"><?php echo get_the_title(); ?></h1>
	<div class="<?php echo esc_attr($container); ?>" id="content" tabindex="-1">
		<div class="row">
			<div class="col-12">
				<div id="header-pacientes" class="mb-5 mt-md-5">
					<?php if ($thumb_mobile): ?>
						<picture>
							<source srcset="<?php echo $thumb_mobile; ?>" class="d-block w-100" media="(max-width: 768px)" />
							<img src="<?php echo $thumb_full; ?>" class="d-block w-100" alt="Bienvenidos a la Sección de Pacientes del Colegio Odontológico de la Provincia de Córdoba. Esta sección está destinada para brindarle información clara y accesible sobre los servicios odontológicos disponibles para la Comunidad en general, con el objetivo de facilitar su acceso a información de calidad y garantizar la protección de sus derechos como pacientes. Aquí encontrará herramientas para consultar profesionales matriculados, servicios especializados, información sobre urgencias odontológicas y opciones para presentar denuncias o reclamos, siempre con el respaldo del Colegio. Queremos acompañarlo en el cuidado de su salud bucal y ayudarlo a resolver sus dudas de manera sencilla y eficiente." />
						</picture>
					<?php else: ?>
						<img src="<?php echo $thumb_full; ?>" class="d-block w-100" alt="Bienvenidos a la Sección de Pacientes del Colegio Odontológico de la Provincia de Córdoba. Esta sección está destinada para brindarle información clara y accesible sobre los servicios odontológicos disponibles para la Comunidad en general, con el objetivo de facilitar su acceso a información de calidad y garantizar la protección de sus derechos como pacientes. Aquí encontrará herramientas para consultar profesionales matriculados, servicios especializados, información sobre urgencias odontológicas y opciones para presentar denuncias o reclamos, siempre con el respaldo del Colegio. Queremos acompañarlo en el cuidado de su salud bucal y ayudarlo a resolver sus dudas de manera sencilla y eficiente." />
					<?php endif; ?>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 col-lg-8 order-2 order-lg-1">
				<main class="site-main" id="main">
					<?php
					while (have_posts()) :
						the_post();

						get_template_part('loop-templates/content', 'pacientes');
					endwhile;
					?>
				</main>
			</div>

			<div class="col-12 col-lg-4 order-1 order-lg-2">
				<div class="sticky-lg-top pt-lg-5">
					<?php dynamic_sidebar('sidebar-pacientes'); ?>
				</div>
			</div>
		</div><!-- .row -->
	</div><!-- #content -->
</div><!-- #page-wrapper -->

<?php
get_footer();
