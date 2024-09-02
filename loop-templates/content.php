<?php

/**
 * Post rendering content according to caller of get_template_part
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;
?>
<div class="col">
	<div <?php post_class('card h-100 border-0 bg-light bg-opacity-50 overflow-hidden'); ?> id="post-<?php the_ID(); ?>">
		<div class="card-img-top-wrap">
			<?php echo get_the_post_thumbnail($post->ID, 'large', array('class' => 'card-img-top h-100 w-auto', 'style' => 'max-width: none;')); ?>
		</div>

		<div class="card-body d-flex flex-column align-items-start">
			<p class="text-muted mb-0"><small><?php echo get_the_date(); ?></small></p>
			<?php the_title(sprintf('<h2 class="card-title h3"><a href="%s" rel="bookmark" class="text-decoration-none">', esc_url(get_permalink())), '</a></h2>'); ?>

			<p class="card-text"><?php echo get_the_excerpt(); ?>...</p>

			<div class="read-more mt-auto pt-3 text-end w-100">
				<a class="btn btn-primary understrap-read-more-link link-light" href="<?php echo get_the_permalink(); ?>"><?php echo __('Read More...', 'understrap') ?><span class="screen-reader-text"> from <?php echo get_the_title(); ?></span></a>
			</div><!-- .read-more -->
		</div><!-- .card-body -->
	</div><!-- #post-<?php the_ID(); ?> -->
</div><!-- .col -->