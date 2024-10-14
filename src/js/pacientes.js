new Splide(".splide", {
  perPage: 3,
  // Responsive breakpoints
  breakpoints: {
    1200: {
      perPage: 2,
    },
    992: {
      perPage: 2,
    },
    576: {
      perPage: 1,
    },
  },
  gap: "1rem",
}).mount();