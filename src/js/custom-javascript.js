import Splide from './assets/splide/js/splide.min.js';

// Add your custom JS here.
new Splide( '.splide', {
    perPage: 4,
    breakpoints: {
        1200: {
            perPage: 3
        },
        992: {
            perPage: 2
        },
        576: {
            perPage: 1
        }
    },
    gap: '2rem'
} ).mount();