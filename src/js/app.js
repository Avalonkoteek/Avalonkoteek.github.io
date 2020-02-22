class StickyNavigation {
  constructor() {
    this.tabContainerHeight = -60;

    const burger = $(".burger");
    const nav = $(".nav-links");

    $(window).scroll(() => {
      this.onScroll();
    });

    burger.click(function() {
      if (burger.hasClass("toggle")) {
        nav.removeClass("nav-active");
        burger.removeClass("toggle");
      } else {
        nav.addClass("nav-active");
        burger.addClass("toggle");
      }
    });
  }
  onScroll() {
    this.checkTabContainerPosition();
  }
  checkTabContainerPosition() {
    if ($(window).scrollTop() > 0) {
      $(".js-nav").addClass("js-nav--top");
    } else {
      $(".js-nav").removeClass("js-nav--top");
    }
  }
}

// menu scripts
new StickyNavigation();
//parallax script

if (screen.width > 780) {
  $(window).scroll(function(e) {
    parallax($(".js-parallax"));
  });
}
//preload script
preloadImage($(".js-preload"));

// parallax
function parallax($parallaxImage) {
  var scroll = $(window).scrollTop();
  $parallaxImage.each(function() {
    var offset = $(this).offset().top;
    let height = $(this).height();
    let diff = scroll - offset;
    let ratio = Math.round((diff / height) * 100);
    $(this).css("transform", "translateY( " + parseInt(ratio * 0.9) + "px)");
  });
}
// end parallax
// preload image
function preloadImage($ImgElement) {
  $ImgElement.each(function() {
    var imageSrc = $(this).data("image-src");
    $(this).css("background-image", "url(" + imageSrc + ")");
  });
}
// end prload image
