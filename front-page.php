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
		<div class="width-100">
			<div id="front-carousel" class="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
				<div class="carousel-inner">
				<?php
				$args = array(
					'post_type'      => 'home_slides',   // Tipo de contenido personalizado
					'posts_per_page' => 3               // Máximo de 3 posts por página
				);

				$query = new WP_Query($args);
				
				$c = 0;

				if ($query->have_posts()):
					while ( $query->have_posts() ) : $query->the_post(); ?>
						<div class="carousel-item <?php if($c == 0): ?>active<?php endif; ?>">
							<?php $link = get_field('content_link'); ?>
							
							<?php if($link): ?>
								<a class="d-block w-100" href="<?php echo $link['url']; ?>">
							<?php else: ?>
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

		<div class="row">
			<div class="col">
				<h2 class="d-none">Accesos Rápidos</h2>
				<nav id="accesos-rapidos" class="d-flex flex-row justify-content-center flex-wrap width-100 p-4 bg-light bg-gradient border-top border-bottom border-dark-subtle border-5">
					<a href="#" class="d-flex align-items-center justify-content-center flex-column text-center rounded-5 p-2 bg-danger bg-gradient link-light" href="https://www.indexweb.com.ar/colegio/loginservicios.aspx">
						<span class="d-block mb-2"><i class="fa-solid fa-circle-user fa-3x fa-fw"></i></span>
						<span class="d-block fs-6">Mi cuenta</span>
					</a>
					<a href="#" class="d-flex align-items-center justify-content-center flex-column text-center rounded-5 p-2 bg-primary bg-gradient link-light" href="https://www.indexweb.com.ar/capac/grilla.aspx">
						<span class="d-block mb-2"><i class="fa-solid fa-graduation-cap fa-3x fa-fw"></i></span>
						<span class="d-block fs-6">Formación</span>
					</a>
					
					<div class="d-block d-md-none break">&nbsp;</div>

					<a href="#" class="d-flex align-items-center justify-content-center flex-column text-center rounded-5 p-2 bg-primary bg-gradient link-light" href="<?php echo site_url(); ?>/colegio/comisiones-trabajo/">
						<span class="d-block mb-2"><i class="fa-solid fa-briefcase fa-3x fa-fw"></i></span>
						<span class="d-block fs-6">Comisiones</span>
					</a>

					<div class="d-none d-md-block d-lg-none break">&nbsp;</div>
					
					<a href="#" class="d-flex align-items-center justify-content-center flex-column text-center rounded-5 p-2 bg-primary bg-gradient link-light" href="<?php echo site_url(); ?>/informacion-general/convenios-beneficios/">
						<span class="d-block mb-2"><i class="fa-solid fa-handshake fa-3x fa-fw"></i></span>
						<span class="d-block fs-6">Beneficios</span>
					</a>
					
					<div class="d-block d-md-none break">&nbsp;</div>
					
					<a href="#" class="d-flex align-items-center justify-content-center flex-column text-center rounded-5 p-2 bg-primary bg-gradient link-light" href="<?php echo site_url(); ?>/colegio/comisiones-trabajo/comision-fondo-ayuda-solidario/">
						<span class="d-block mb-2"><i class="fa-solid fa-life-saver fa-3x fa-fw"></i></span>
						<span class="d-block fs-6">Subsidios</span>
					</a>
					<a href="#" class="d-flex align-items-center justify-content-center flex-column text-center rounded-5 p-2 bg-primary bg-gradient link-light" href="https://www.indexweb.com.ar/colegio/matriculados.aspx?Estado=1">
						<span class="d-block mb-2"><i class="fa-solid fa-file-text fa-3x fa-fw"></i></span>
						<span class="d-block fs-6">Matriculados</span>
					</a>
				</nav>
			</div><!-- .col -->
		</div><!-- .row -->
		
		<div class="row">
			<div class="content-area" id="primary">
				<main class="site-main" id="main" role="main">

					<?php
					while ( have_posts() ) : the_post();
						
							endwhile;

					the_content();
					?>

				</main>
			</div><!-- #primary -->

			<?php // get_template_part( 'sidebar-templates/sidebar', 'right-frontpage' ); ?>
		</div><!-- .row -->
	</div><!-- #content -->

</div><!-- #page-wrapper -->

<?php
get_footer();
