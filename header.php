<?php

/**
 * The header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

$bootstrap_version = get_theme_mod('understrap_bootstrap_version', 'bootstrap4');
$navbar_type       = get_theme_mod('understrap_navbar_type', 'collapse');

if ($_GET['tipo_usuario']) {
	setcookie('tipo_usuario', $_GET['tipo_usuario'], time() + (60 * 60 * 24 * 7 * 4), "/");
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<?php // Redirects to manage special cases of "Trámites" 
	if (is_page(7881)) : // ID from "Solicitud de Subsidio"  
	?>
		<script>
			window.location.replace("https://colodontcba.org.ar/colegio/comisiones-trabajo/comision-fondo-ayuda-solidario/");
		</script>
	<?php endif;

	if (is_page(8046)) : // ID from "Reválida Ética" page 
	?>
		<script>
			window.location.replace("https://colodontcba.org.ar/colegio/comisiones-trabajo/comision-revalida-etica-especialidades/");
		</script>
	<?php endif; ?>

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> <?php understrap_body_attributes(); ?>>
	<?php do_action('wp_body_open'); ?>

	<?php if (!isset($_COOKIE['tipo_usuario']) && !$_GET['tipo_usuario']): ?>
		<script>
			function reloadCurrentURL() {
				let url = new URL(window.location.href);

				url.searchParams.append('tipo_usuario', 'profesional');

				location.replace(url);
			}
		</script>

		<div class="modal fade" id="tipo-usuario" tabindex="-1" role="dialog" aria-labelledby="tipo-usuario-titulo" aria-hidden="true">
			<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="tipo-usuario-titulo">Bienvenido al sitio web del COPC</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<p>Por favor seleccione la sección que desea visitar:</p>
						<div class="d-flex flex-row justify-content-start">
							<a href="<?php echo esc_url(home_url() . '/pacientes?tipo_usuario=paciente') ?>" class="btn btn-danger me-2">Sección Pacientes</a>
							<button type="button" onclick="reloadCurrentURL()" class="btn btn-primary">Sección Profesionales</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php endif; ?>

	<div class="site d-flex flex-column min-vh-100" id="page">

		<!-- ******************* The Navbar Area ******************* -->
		<header id="wrapper-navbar">

			<a class="skip-link <?php echo understrap_get_screen_reader_class(true); ?>" href="#content">
				<?php esc_html_e('Skip to content', 'understrap'); ?>
			</a>

			<?php get_template_part('global-templates/navbar', $navbar_type . '-' . $bootstrap_version); ?>

		</header><!-- #wrapper-navbar -->