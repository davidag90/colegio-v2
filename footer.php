<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

$container = get_theme_mod('understrap_container_type');
?>

<?php get_template_part('sidebar-templates/sidebar', 'footerfull'); ?>

<div class="wrapper bg-dark bg-gradient text-light mt-auto" id="footer-wrapper">

	<div class="container-fluid">

		<div class="row px-4 g-3 pb-3">
			<div class="col-xl-3 d-none d-xl-block">
				<div class="footer-logo-wrap">
					<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/footer-logo.png" alt="" class="footer-logo">
				</div>
			</div><!-- col -->

			<div class="col-12 col-md-6 col-lg-4 col-xl-3">
				<h4 class="text-uppercase">Accesos Rápidos</h4>
				<?php
				wp_nav_menu(
					array(
						'theme_location'  => 'footer-menu-01',
						'fallback_cb'     => '',
						'menu_class'	  => 'footer-menu',
						'menu_id'         => 'footer-menu-01',
						'link_before'	  => '<i class="fa-solid fa-angles-right fa-2xs me-1"></i>',
						'depth'           => 0
					)
				); ?>
			</div><!-- col -->

			<div class="col-12 col-md-6 col-lg-4 col-xl-3">
				<h4 class="text-uppercase">Colegio Odontológico</h4>
				<?php
				wp_nav_menu(
					array(
						'theme_location'  => 'footer-menu-02',
						'fallback_cb'     => '',
						'menu_class'	  => 'footer-menu',
						'menu_id'         => 'footer-menu-02',
						'link_before'	  => '<i class="fa-solid fa-angles-right fa-2xs me-1"></i>',
						'depth'           => 0
					)
				); ?>
			</div><!-- col -->

			<div class="col-12 col-md-6 col-lg-4 col-xl-3">
				<h4 class="text-uppercase">Contacto</h4>
				<p><i class="fa-solid fa-house"></i> Coronel Olmedo 35 - Córdoba (Argentina)</p>
				<p><i class="fa-solid fa-phone"></i> <a href="tel:3514224209" class="link-light" target="_blank">(0351) 422-4209</a> / <a href="tel:3514251653" class="link-light">425-1653</a> / <a href="351422255" class="link-light">422-255</a></p>
				<p><i class="fa-brands fa-whatsapp"></i> <a href="https://wa.me/5493517553010" class="link-light" target="_blank">(0351) 157-553010</a></p>
				<p><i class="fa-solid fa-envelope"></i> <a href="mailto:colegioodontologico@colodontcba.org.ar" class="link-light" target="_blank">Enviar e-mail</a></p>
				<div class="social-media">
					<a href="https://www.facebook.com/colegioodontologicocordoba/" class="d-inline-block link-light" target="_blank"><i class="fa-brands fa-facebook me-2 fa-2x"></i><span class="d-none">Facebook</span></a>
					<a href="https://www.instagram.com/colodontcba/" class="d-inline-block link-light" target="_blank"><i class="fa-brands fa-instagram me-2 fa-2x"></i><span class="d-none">Instagram</span></a>
					<a href="https://www.tiktok.com/@colegioodontolgicocba?lang=es" class="d-inline-block link-light" target="_blank"><i class="fa-brands fa-x-twitter me-2 fa-2x"></i><span class="d-none">TikTok</span></a>
					<a href="https://twitter.com/colodontcba" class="d-inline-block link-light" target="_blank"><i class="fa-brands fa-tiktok me-2 fa-2x"></i><span class="d-none">X</span></a>
					<a href="https://www.youtube.com/user/colodontcba" class="d-inline-block link-light" target="_blank"><i class="fa-brands fa-youtube me-2 fa-2x"></i><span class="d-none">YouTube</span></a>
					<a href="https://api.whatsapp.com/send/?phone=%2B5493517553010&text&type=phone_number&app_absent=0" class="d-inline-block link-light" target="_blank"><i class="fa-brands fa-whatsapp me-2 fa-2x"></i><span class="d-none">WhatsApp</span></a>
				</div>
			</div><!-- col -->
		</div><!-- .row -->

		<div class="row">

			<div class="col-md-12">

				<footer class="site-footer" id="colophon">

					<div class="site-info text-center py-2">

						<small><?php understrap_site_info(); ?></small>

					</div><!-- .site-info -->

				</footer><!-- #colophon -->

			</div><!-- col -->

		</div><!-- .row -->

	</div><!-- .container(-fluid) -->

</div><!-- #wrapper-footer -->

<?php // Closing div#page from header.php 
?>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>