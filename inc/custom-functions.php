<?php
// Desactiva carga por defecto de librerías CF7
add_filter( 'wpcf7_load_js', '__return_false' );
add_filter( 'wpcf7_load_css', '__return_false' );

// Carga librerías CF7 solo en página Contacto
function custom_cf7_lib_loading() {
	if (is_page('contacto')) {
		if ( function_exists( 'wpcf7_enqueue_scripts' ) ) {
			wpcf7_enqueue_scripts();
		}
			
		if ( function_exists( 'wpcf7_enqueue_styles' ) ) {
			wpcf7_enqueue_styles();
		}
	}
}

add_action( 'wp_enqueue_scripts', 'custom_cf7_lib_loading' );

// Desactiva widget blocks
function disable_widget_blocks() {
    remove_theme_support( 'widgets-block-editor' );
}

add_action( 'after_setup_theme', 'disable_widget_blocks' );

// Modificación de clases aplicadas a custom_logo
add_filter( 'get_custom_logo', 'understrap_change_logo_class' );

if ( ! function_exists( 'understrap_change_logo_class' ) ) {
	/**
	 * Replaces logo CSS class.
	 *
	 * @param string $html Markup.
	 *
	 * @return string
	 */
	function understrap_change_logo_class( $html ) {

		$html = str_replace( 'class="custom-logo-link"', 'class="navbar-brand custom-logo-link"', $html );
		$html = str_replace( 'alt=""', 'title="Home" alt="logo"', $html );

		return $html;
	}
}

add_action('widgets_init', 'custom_sidebars_init');

function custom_sidebars_init() {
	register_sidebar(
		array(
			'name'          => __( 'Right Sidebar Posts', 'understrap' ),
			'id'            => 'right-sidebar-posts',
			'description'   => __( 'Right sidebar widget area on the posts', 'understrap' ),
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>'
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Sidebar Aranceles', 'understrap' ),
			'id'            => 'sidebar-aranceles',
			'description'   => 'Barra lateral seccion aranceles',
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>'
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Sidebar Contacto', 'understrap' ),
			'id'            => 'sidebar-contacto',
			'description'   => 'Barra lateral seccion contacto',
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>'
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Sidebar Comisiones', 'understrap' ),
			'id'            => 'sidebar-comisiones',
			'description'   => 'Barra lateral para páginas de Comisiones de Trabajo',
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>'
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Sidebar Trámites', 'understrap' ),
			'id'            => 'sidebar-tramites',
			'description'   => 'Barra lateral para páginas de Trámites',
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>'
		)
	);
}

function custom_excerpt_length( $length ) {
	return 20;
}

add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

function understrap_all_excerpts_get_more_link( $post_excerpt ) {
    if ( is_admin() || ! get_the_ID() || is_front_page() || is_archive() || is_page('convenios-beneficios') ) {
        return $post_excerpt;
    }
    
    $permalink = esc_url( get_permalink( (int) get_the_ID() ) ); // @phpstan-ignore-line -- post exists

    return $post_excerpt . ' [...]<p><a class="btn btn-secondary understrap-read-more-link" href="' . $permalink . '">' . __(
        'Read More...',
        'understrap'
    ) . '<span class="screen-reader-text"> from ' . get_the_title( get_the_ID() ) . '</span></a></p>';
}

if(!function_exists('register_footer_menus')) {
    function register_footer_menus() {
        register_nav_menus(
            array(
                'footer-menu-01' => 'Footer Menu 1',
                'footer-menu-02' => 'Footer Menu 2'
            )
        );
    }
}
add_action('after_setup_theme', 'register_footer_menus');

if ( ! function_exists( 'understrap_post_nav' ) ) {
	/**
	 * Display navigation to next/previous post when applicable.
	 *
	 * @global WP_Post|null $post The current post.
	 */
	function understrap_post_nav() {
		global $post;
		if ( ! $post ) {
			return;
		}

		// Don't print empty markup if there's nowhere to navigate.
		$previous = ( is_attachment() ) ? get_post( $post->post_parent ) : get_adjacent_post( false, '', true );
		$next     = get_adjacent_post( false, '', false );
		if ( ! $next && ! $previous ) {
			return;
		}
		?>
		<nav class="py-4 navigation post-navigation">
			<h2 class="screen-reader-text"><?php esc_html_e( 'Post navigation', 'understrap' ); ?></h2>
			<div class="nav-links btn-group" role="group">
				<?php
				if ( get_previous_post_link() ) {
					previous_post_link( '%link', _x( '<i class="fa fa-angle-left"></i>&nbsp;%title', 'Previous post link', 'understrap' ) );
				}
				if ( get_next_post_link() ) {
					next_post_link( '%link', _x( '%title&nbsp;<i class="fa fa-angle-right"></i>', 'Next post link', 'understrap' ) );
				}
				?>
			</div><!-- .nav-links -->
		</nav><!-- .post-navigation -->
		<?php
	}
}

add_filter('next_post_link', 'next_post_link_attributes');
add_filter('previous_post_link', 'previous_post_link_attributes');

function next_post_link_attributes($output) {
    $injection = 'class="btn btn-outline-primary"';
    return str_replace('<a href=', '<a '.$injection.' href=', $output);
}

function previous_post_link_attributes($output) {
    $injection = 'class="btn btn-outline-primary"';
    return str_replace('<a href=', '<a '.$injection.' href=', $output);
}

// Anula prefijos en templates de "Archive"
add_filter( 'get_the_archive_title_prefix', 'delete_archive_prefix' );

function delete_archive_prefix() {
	return false;
}

// JS complementario para presentación de Convenios
function convenios_enqueue_scripts() {
	if (is_page( 'convenios-beneficios' )):
		wp_enqueue_script( 'convenios-js', get_stylesheet_directory_uri() . '/src/js/convenios.js', array() , null, true );
	endif;
}

add_action( 'wp_enqueue_scripts', 'convenios_enqueue_scripts' );


function custom_cat_title($title_parts) {
	/* $filtered_title = str_replace(' archivos', '', $title_parts['title']); */
	$title_parts['title'] = 'Mi titulo';/* $filtered_title */

	return $title_parts;
}

add_filter( 'document_title_parts', 'custom_cat_title');