$(function() {
  // create element
  var $overlay = $('<div id="lightbox_overlay"></div>');
  var $wrap = $('<div class="lightbox__wrap"></div>');
  var $video = $('<div class="lightbox__video"></div>');

  // append method
  $overlay.append($wrap);
  $wrap.append($video);
  $("body").append($overlay);

  // click on each images
  $(".youtube").on("click", function(event) {
    $("lightbox__video").css(
      "background-image",
      "url(http://img.youtube.com/vi/" + this.id + "/sddefault.jpg)"
    );

    var iframe_url =
      "https://www.youtube.com/embed/" +
      this.id +
      "?autoplay=1&autohide=1&controls=2";

    var iframe = $("<iframe/>", {
      frameborder: "0",
      src: iframe_url,
      width: $(".lightbox__video").width(),
      height: $(".lightbox__video").height(),
      allowfullscreen: "",
      webkitallowfullscreen: "",
      mozallowfullscreen: "",
      oallowfullscreen: "",
      msallowfullscreen: ""
    });

    $(".lightbox__video").append(iframe);

    $overlay.show();
  });

  // click on close icon

  $overlay.click(function() {
    close_lightbox();
  });

  // close owerlay
  function close_lightbox() {
    $overlay.hide();
    $(".lightbox__video iframe").remove();
    return false;
  }
});
