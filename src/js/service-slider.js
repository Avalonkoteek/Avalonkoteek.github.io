


$(document).ready(function($) {
  let serviceContentWrapper = $(".js-slider-wrapper");

  serviceContentWrapper.each(function() {
    let blockNavigation = $(this).find(".js-btn-wrapper");

    let imageWrapper = $(this).find(".js-image-wrapper");
    let imagesList = imageWrapper.children(".js-visual-content");

    let textWrapper = $(this).find(".service-section__text-box");
    let textList = textWrapper.children(".js-text-content");

    $(this).on(
      "click",
      ".service-section__text-box .js-tab-trigger button",
      function() {
        let indexButton = $(this).index();
        console.log("index:" + indexButton);
        let imageItem = imagesList.eq(indexButton);
        let textItem = textList.eq(indexButton);
        classUpdate(imageItem);
        classUpdate(textItem);
      }
    );

    $(this).on("click", ".js-image-wrapper .js-btn-wrapper button", function() {
      let direction = $(this);

      let indexVisibleblock = imagesList.index(
        imageWrapper.children(".is-selected")
      );

      if (indexVisibleblock == undefined) {
        imagesList[0].addClass(".is-selected");
        indexVisibleblock = 0;
      }

      let index = indexVisibleblock;

      if (!direction.hasClass("inactive")) {
        if (direction.hasClass("cd-next")) {
          index++;
        } else {
          index--;
        }
        let imageItem = imagesList.eq(index);
        let textItem = textList.eq(index);
        let imageLength = imagesList.length;
        classUpdate(imageItem);
        classUpdate(textItem);
        updateBlockNavigation(index, blockNavigation, imageLength);
      }
    });
  });

  function updateBlockNavigation(n, blockNavigation, imageLength) {
    let blockNavigationNext = blockNavigation.find(".cd-next");
    let blockNavigationPrev = blockNavigation.find(".cd-prev");
    console.log(n);
    if (n == 0) {
      blockNavigationPrev.addClass("inactive");
    } else {
      blockNavigationPrev.removeClass("inactive");
    }
    if (n + 1 >= imageLength) {
      blockNavigationNext.addClass("inactive");
    } else {
      blockNavigationNext.removeClass("inactive");
    }
  }

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
