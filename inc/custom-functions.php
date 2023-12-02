<?php 

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
			'name'          => __( 'Right Sidebar Front Page', 'understrap' ),
			'id'            => 'right-sidebar-frontpage',
			'description'   => __( 'Right sidebar widget area on the front page', 'understrap' ),
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);
}

function custom_excerpt_length( $length ) {
	return 20;
}

add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

function understrap_all_excerpts_get_more_link( $post_excerpt ) {
    if ( is_admin() || ! get_the_ID() || is_front_page() ) {
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