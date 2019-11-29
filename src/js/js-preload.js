$(document).ready(function() {
  $(".js-preload").each(function(index) {
    var imageSrc = $(this).data("image-src");
    $(this).css("background-image", "url(" + imageSrc + ")");
  });
});
