$(document).ready(function($) {
  let serviceContentWrapper = $(".js-slider-wrapper");

  serviceContentWrapper.each(function() {
    let imageWrapper = $(this).find(".js-image-wrapper");
    let imagesList = imageWrapper.children(".js-visual-content");

    let textWrapper = $(this).find(".service-section__text-box");
    let textList = textWrapper.children(".js-text-content");

    if (
      !$(this)
        .find(".js-tab-trigger button")
        .hasClass("active-tab")
    ) {
      $(this)
        .find(".js-tab-trigger button")
        .eq(0)
        .addClass("active-tab");

      classUpdate(imagesList.eq(0));
      classUpdate(textList.eq(0));
    }

    $(this).on(
      "click",
      ".service-section__text-box .js-tab-trigger button",
      function() {
        let indexButton = $(this).index();
        let imageItem = imagesList.eq(indexButton);
        let textItem = textList.eq(indexButton);
        classUpdate(imageItem);
        classUpdate(textItem);
        $(this)
          .addClass("active-tab")
          .siblings()
          .removeClass("active-tab");
      }
    );
  });

  function classUpdate(items) {
    items.each(function() {
      var item = $(this);
      item
        .addClass("is-selected")
        .removeClass("move-left")
        .siblings()
        .removeClass("is-selected")
        .end()
        .prevAll()
        .addClass("move-left")
        .end()
        .nextAll()
        .removeClass("move-left");
    });
  }
});
