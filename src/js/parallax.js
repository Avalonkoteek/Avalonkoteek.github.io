$(document).ready(function() {
  if (screen.width > 1000) {
    console.log(screen.width);
    $(window).scroll(function(e) {
      parallax();
    });
  }
  function parallax() {
    var scroll = $(window).scrollTop();
    var screenHeight = $(window).height();

    $(".js-parallax").each(function() {
      var offset = $(this).offset().top;
      let height = $(this).height();
      var distanceFromBottom = offset - scroll - screenHeight;
      let diff = scroll - offset;
      let ratio = Math.round((diff / height) * 100);

      $(this).css("transform", "translateY( " + parseInt(ratio * 0.9) + "px)");
    });
  }
});
