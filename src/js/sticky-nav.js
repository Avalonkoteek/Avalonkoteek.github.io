class StickyNavigation {
  constructor() {
  
    this.tabContainerHeight = -60;
    let self = this;
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
    let offset = $("header").offset().top;
    if ($(window).scrollTop() > offset) {
      $(".js-nav").addClass("js-nav--top");
    } else {
      $(".js-nav").removeClass("js-nav--top");
    }
  }
}

new StickyNavigation();
