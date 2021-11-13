// used for build horizontal scroll recipes
// https://kenwheeler.github.io/slick/
let responsivelist = [];
for (let i = 1; i < 20; i++) {
  responsivelist[i] = {
    breakpoint: 450 * i,
    settings: {
      slidesToShow: i,
      slidesToScroll: i,
      infinite: true,
    },
  };
}
$(document).ready(function () {
  $("#recipe-card-grid-1").slick({
    nextArrow: $("#next-button-1"),
    prevArrow: $("#prev-button-1"),
    responsive: responsivelist,
  });
  $("#recipe-card-grid-2").slick({
    nextArrow: $("#next-button-2"),
    prevArrow: $("#prev-button-2"),
    responsive: responsivelist,
  });
  $("#recipe-card-grid-3").slick({
    nextArrow: $("#next-button-3"),
    prevArrow: $("#prev-button-3"),
    responsive: responsivelist,
  });
});
