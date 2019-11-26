
let $sliderWrapper = $(".js-slider");
    new Slider($sliderWrapper);
    
    class Slider{
        constructor($contentWrapper){
          console.log("qqq");
            $contentWrapper.each(function() {
                let $imageWrapper = $(this).find(".js-slider-wrapper");
                let $imagesList = $(this).find(".js-visual-content");

                if($imagesList.length>1){
                    let index = getIndexSelectedItem($imagesList);
                    if(index<0){
                        classUpdate($imagesList.eq(0));
                    }
                    addNavigation($imageWrapper);
                    clickBtnNavigation($(this));
                }
            });
        }
    }
    function addNavigation($wrapper){
        let $btnNavigationWrapper = $('<div class="js-slider-btnWrapper"></div>');
        let $btnNavigationNext = $('<button class="js-slider-btn js-btn-next">NEXT</button>');
        let $btnNavigationPrev = $('<button class="js-slider-btn js-btn-prev">PREV</button>');
        $btnNavigationWrapper.append($btnNavigationPrev);
        $btnNavigationWrapper.append($btnNavigationNext);
        $wrapper.append($btnNavigationWrapper);
    }
    function clickBtnNavigation($wrapper){
        let $imageWrapper = $wrapper.find(".js-slider-wrapper");
        let $imagesList = $wrapper.find(".js-visual-content");
        let $btnNavigationWrapper = $imageWrapper.find(".js-slider-btnWrapper");

        $wrapper.on("click", ".js-slider-btn", function() {
            let direction = $(this);
            let index = getIndexSelectedItem($imagesList);
            if(index<0){
                $imagesList.eq(0).addClass("is-selected");
                index = 0;
            }
            if (!direction.hasClass("inactive")) {
                if (direction.hasClass("js-btn-next")) {
                  index++;
                } else {
                  index--;
                }
            }   
            let imageItem = $imagesList.eq(index);
            let imageLength = $imagesList.length;
            classUpdate(imageItem);
            updateBlockNavigation(index, $btnNavigationWrapper, imageLength);
            });
    }
    function getIndexSelectedItem(itemsList){
        let parentItemsList = itemsList.parent();
        return itemsList.index(parentItemsList.children(".is-selected"));
    }


  
    function updateBlockNavigation(index, btnNavigationWrapper, imageLength) {
      let btnNext = btnNavigationWrapper.find(".js-btn-next");
      let btnPrev = btnNavigationWrapper.find(".js-btn-prev");
   
      if (index == 0) {
        btnPrev.addClass("inactive");
      } else {
        btnPrev.removeClass("inactive");
      }
      if (index + 1 >= imageLength) {
        btnNext.addClass("inactive");
      } else {
        btnNext.removeClass("inactive");
      }
    }
  
    function classUpdate(item) {
        item
          .addClass("is-selected")
          .removeClass("move-left")
          .removeClass("move-right")
          .siblings()
          .removeClass("is-selected")
          .end()
          .prevAll()
          .removeClass("move-right")
          .addClass("move-left")
          .end()
          .nextAll()
          .removeClass("move-left")
          .addClass("move-right");
    }
    
  

  