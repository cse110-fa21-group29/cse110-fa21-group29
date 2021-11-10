$(document).ready(function () {
    $('.recipe-card-grid').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: $(".next-button"),
        prevArrow: $(".prev-button"),

    });
});