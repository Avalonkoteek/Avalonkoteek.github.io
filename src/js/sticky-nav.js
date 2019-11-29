class StickyNavigation {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = -60;
    let self = this;
    const burger = $(".burger");
    const nav = $(".nav-links");

    // $(".js-nav-link").click(function() {
    //   self.onLinkClick(event, $(this));

    //   if (burger.hasClass("toggle")) {
    //     burger.removeClass("toggle");
    //     nav.removeClass("nav-active");
    //   }
    // });

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

  onLinkClick(event, element) {
    event.preventDefault();
    let scrollTop =
      $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
    $("html, body").animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
    this.checkTabContainerPosition();
  }

  checkTabContainerPosition() {
    let offset = $(".header-main").offset().top;
    if ($(window).scrollTop() > offset) {
      $(".js-nav").addClass("js-nav--top");
    } else {
      $(".js-nav").removeClass("js-nav--top");
    }
  }
}

new StickyNavigation();
