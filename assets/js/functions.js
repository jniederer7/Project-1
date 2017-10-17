/*----------------------------- Navigation -------------------------- */
jQuery(window).on('scroll', function (){
    "use strict";

    // main menu
    if ($(this).scrollTop() > 700){
        $('#main-menu').addClass('navbar-fixed-top');
      } else {
        $('#main-menu').removeClass('navbar-fixed-top');
      }

    // menu toggle
    $( "ul.sub-menu").parent().append("<span class='toggle_nav_button'>+</span>");
    $(".toggle_nav_button").click(
      function(){
        var link = $(this);
        $(this).parent().find("ul.sub-menu").slideToggle('fast', function(){
          if ($(this).is(':visible')){
            link.text('-');
          } else {
            link.text('+');
          }
        });
      });

    // Scroll to top
    if ($(this).scrollTop() > 200) {
        $('#scroll-to-top').fadeIn('slow');
      } else {
        $('#scroll-to-top').fadeOut('slow');
      }

    // Single page Nav
    if ($(this).scrollTop() > 400) {
        $('.post-navigation').fadeIn('slow');
      } else {
        $('.post-navigation').fadeOut('slow');
      }
});



(function($) {
  "use strict";

  /*------------- Scroll to Top -----------------*/
  $('#scroll-to-top').click(function(){
    $("html,body").animate({ scrollTop: 0 }, 1000);
    return false;
  });


 /*----------- Scroll to Feature Section ----------*/ 
  $('#go-to-next').click(function() {
    $('html,body').animate({scrollTop:$('#about').offset().top - 150}, 1000);
  });


  /*------------------- Parallax ------------------*/
  jQuery(window).load(function(){
    $("#top-section").parallax("50%", 0.5);
    $("#video-section").parallax("50%", 0.5);  
    $("#quality").parallax("50%", 0.5);
    $("#testimonial").parallax("50%", 0.5);
    $("#quote").parallax("50%", 0.5);
    $("#subscribe").parallax("50%", 0.5);
    $("#page-name-sec").parallax("50%", 0.5);
    $("#footer-section").parallax("50%", 0.5);
  });


  /*------------------- Team Member Slider  --------------*/
  var teamSlider = $("#team-member-slider");

  teamSlider.owlCarousel({
    autoPlay : 3000,
    stopOnHover : true,
    pagination : true,
    paginationNumbers: false,

    itemsCustom : [
    [0, 1],
    [450, 1],
    [600, 1],
    [700, 2],
    [1000, 3],
    [1200, 4],
    ],
        // Responsive 
        responsive: true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth: window
    });


  /*---------------- Clients Logo Slider -----------------*/
  var logoSlider = $("#clients-logo-slider");

  logoSlider.owlCarousel({
    autoPlay : 3000,
    stopOnHover : true,
    pagination : true,
    paginationNumbers: false,

    itemsCustom : [
    [0, 1],
    [450, 2],
    [600, 2],
    [700, 3],
    [1000, 5],
    [1200, 5],
    ],
        // Responsive 
        responsive: true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth: window
    });

})(jQuery);



