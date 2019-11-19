$(document).ready(function() {
  $(window).scroll(function(e) {
    parallax();
  });

  function parallax() {
    var scroll = $(window).scrollTop();
    var screenHeight = $(window).height();

    $(".js-parallax").each(function() {
      var offset = $(this).offset().top;
      let height = $(this).height();
      var distanceFromBottom = offset - scroll - screenHeight;
      let diff = scroll - offset;
      let ratio = Math.round((diff / height) * 100);

      $(this).css("transform", "translateY( " + parseInt(ratio * 0.6) + "px)");
    });
  }
});
