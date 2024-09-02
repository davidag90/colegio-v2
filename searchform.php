<?php

/**
 * The template for displaying search forms
 *
 * @package Colegio Theme 2
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

$bootstrap_version = get_theme_mod('understrap_bootstrap_version', 'bootstrap4');
$uid               = wp_unique_id('s-'); // The search form specific unique ID for the input.

$aria_label = '';
if (isset($args['aria_label']) && !empty($args['aria_label'])) {
	$aria_label = 'aria-label="' . esc_attr($args['aria_label']) . '"';
}
?>

<form role="search" class="search-form mb-1 d-none d-xl-block" method="get" action="<?php echo esc_url(home_url('/')); ?>" <?php echo $aria_label; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped above. 
																																																														?>>
	<label class="screen-reader-text" for="<?php echo $uid; ?>"><?php echo esc_html_x('Search for:', 'label', 'understrap'); ?></label>
	<div class="input-group input-group-sm" id="front-searchbox">
		<input type="search" class="field search-field form-control bg-light bg-opacity-10 text-light" id="<?php echo $uid; ?>" name="s" value="<?php the_search_query(); ?>" placeholder="<?php echo esc_attr_x('Search &hellip;', 'placeholder', 'understrap'); ?>">
		<?php if ('bootstrap5' === $bootstrap_version) : ?>
			<button type="submit" class="submit search-submit btn btn-light" name="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
		<?php else : ?>
			<span class="input-group-append">
				<button type="submit" class="submit search-submit btn btn-light" name="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
			</span>
		<?php endif; ?>
	</div>
</form>
<?php
