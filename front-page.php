<?php

/**
 * Front page template file
 *
 * Specific template designed to manage the front page contents, which in this site must be contained by a Wordpress static page
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();
$container = get_theme_mod('understrap_container_type');
?>

<div class="wrapper" id="page-wrapper">
	<div class="<?php echo esc_attr($container); ?>" id="content">
		<div class="width-100">
			<div id="front-carousel" class="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
				<div class="carousel-inner">
					<?php
					// Query args to feed Bootstrap Carousel with slides
					$args = array(
						'post_type' => 'home_slides',		// Custom post type to feed hero slideshow
						'posts_per_page' => 3           // Limit posts to show to 3 elements
					);

					$query = new WP_Query($args);

					$c = 0; // Counter to check first iteration and add "active" class needed for Boootstrap carousel component to work

					if ($query->have_posts()) :
						while ($query->have_posts()) : $query->the_post(); ?>
							<div class="carousel-item <?php if ($c == 0) : ?>active<?php endif; ?>">
								<?php $link = get_field('content_link'); ?>

								<?php if ($link) : ?>
									<a class="d-block w-100" href="<?php echo $link['url']; ?>">
									<?php else : ?>
										<a class="d-block w-100 " href="#">
										<?php endif; ?>
										<picture>
											<?php
											$slide_desktop = get_field('slide_desktop');
											$slide_mobile = get_field('slide_mobile');
											?>

											<source srcset="<?php echo esc_url($slide_mobile['url']); ?>" class="d-block w-100" media="(max-width:768px)">
											<img src="<?php echo esc_url($slide_desktop['url']); ?>" class="d-block w-100">
										</picture>
										</a>
							</div>
							<?php $c++; ?>
						<?php endwhile; ?>

						<?php wp_reset_postdata(); ?>
					<?php endif; ?>
				</div><!-- .carousel-inner -->
			</div><!-- .carousel.slide -->
		</div>

		<div class="width-100">
			<div class="container-fluid">
				<div class="row">
					<div class="col">
						<h2 class="d-none">Accesos Rápidos</h2>
						<nav id="accesos-rapidos" class="width-100 p-4 bg-light bg-gradient border-top border-bottom border-dark-subtle border-5">
							<a href="https://www.indexweb.com.ar/colegio/loginservicios.aspx" class="d-flex align-items-center justify-content-center flex-column text-center rounded-4 p-1 bg-danger bg-gradient link-light">
								<span class="d-block mb-2"><i class="fa-solid fa-circle-user fa-2x fa-fw"></i></span>
								<span class="d-block link-text">Mi cuenta</span>
							</a>

							<a href="https://www.indexweb.com.ar/capac/grilla.aspx" class="d-flex align-items-center justify-content-center flex-column text-center rounded-4 p-1 bg-primary bg-gradient link-light">
								<span class="d-block mb-2"><i class="fa-solid fa-graduation-cap fa-2x fa-fw"></i></span>
								<span class="d-block link-text">Formación</span>
							</a>

							<a href="<?php echo site_url(); ?>/colegio/comisiones-trabajo/" class="d-flex align-items-center justify-content-center flex-column text-center rounded-4 p-1 bg-primary bg-gradient link-light">
								<span class="d-block mb-2"><i class="fa-solid fa-people-group fa-2x fa-fw"></i></span>
								<span class="d-block link-text">Comisiones</span>
							</a>

							<div class="d-block d-md-none break">&nbsp;</div>

							<a href="<?php echo site_url(); ?>/informacion-general/convenios-beneficios/" class="d-flex align-items-center justify-content-center flex-column text-center rounded-4 p-1 bg-primary bg-gradient link-light">
								<span class="d-block mb-2"><i class="fa-solid fa-handshake fa-2x fa-fw"></i></span>
								<span class="d-block link-text">Beneficios</span>
							</a>

							<a href="<?php echo site_url(); ?>/colegio/comisiones-trabajo/comision-fondo-ayuda-solidario/" class="d-flex align-items-center justify-content-center flex-column text-center rounded-4 p-1 bg-primary bg-gradient link-light">
								<span class="d-block mb-2"><i class="fa-solid fa-life-saver fa-2x fa-fw"></i></span>
								<span class="d-block link-text">Subsidios</span>
							</a>

							<div class="d-none d-md-block d-xl-none break">&nbsp;</div>

							<a href="https://www.indexweb.com.ar/colegio/matriculados.aspx?Estado=1" class="d-flex align-items-center justify-content-center flex-column text-center rounded-4 p-1 bg-primary bg-gradient link-light">
								<span class="d-block mb-2"><i class="fa-solid fa-file-text fa-2x fa-fw"></i></span>
								<span class="d-block link-text">Matriculados</span>
							</a>

							<div class="d-block d-md-none break">&nbsp;</div>

							<a href="https://www.indexweb.com.ar/colegio/loginservicios.aspx" class="d-flex align-items-center justify-content-center flex-column text-center rounded-4 p-1 bg-primary bg-gradient link-light">
								<span class="d-block mb-2"><i class="fa-solid fa-kit-medical fa-2x fa-fw"></i></span>
								<span class="d-block link-text">Urgencias</span>
							</a>

							<a href="https://www.indexweb.com.ar/matriculas/bolsa.aspx" class="d-flex align-items-center justify-content-center flex-column text-center rounded-4 p-1 bg-primary bg-gradient link-light">
								<span class="d-block mb-2"><i class="fa-solid fa-briefcase fa-2x fa-fw"></i></span>
								<span class="d-block link-text">Bolsa</span>
							</a>

							<a href="#" class="d-flex align-items-center justify-content-center flex-column text-center rounded-4 p-1 bg-primary bg-gradient link-light" data-bs-toggle="modal" data-bs-target="#aviso-aprendiz">
								<span class="d-block mb-2"><i class="fa-solid fa-book fa-2x fa-fw"></i></span>
								<span class="d-block link-text">Aprendiz</span>
							</a>
						</nav>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="content-area" id="primary">
				<main class="site-main" id="main" role="main">

					<?php
					while (have_posts()) : the_post();

					endwhile;

					the_content();
					?>

				</main>
			</div><!-- #primary -->

			<?php // get_template_part( 'sidebar-templates/sidebar', 'right-frontpage' ); 
			?>
		</div><!-- .row -->
	</div><!-- #content -->

</div><!-- #page-wrapper -->

<?php
get_footer();
