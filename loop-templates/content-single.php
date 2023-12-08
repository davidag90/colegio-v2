<?php
/**
 * Single post partial template
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<header class="entry-header">

		<div class="entry-meta"><?php echo get_the_date(); ?></div><!-- .entry-meta -->
		
		<?php the_title( '<h1 class="entry-title mb-3 pb-3 border-1 border-bottom">', '</h1>' ); ?>

	</header><!-- .entry-header -->

	<?php echo get_the_post_thumbnail( $post->ID, 'medium', array(
		'class'	=> 'float-start me-4 mb-4'
	) ); ?>

	<div class="entry-content">

		<?php
		the_content();
		
		understrap_link_pages();
		?>

	</div><!-- .entry-content -->
	
</article><!-- #post-<?php the_ID(); ?> -->
