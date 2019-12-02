
class SliderPortfolio{
  constructor($contentWrapper){
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
  let $btnNavigationNext = $('<button class="js-slider-btn js-btn-next"></button>');
  let $btnNavigationPrev = $('<button class="js-slider-btn js-btn-prev"></button>');
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

class LightboxIframe {
  constructor(type, url) {
    if (type == "video") {
      let iframe_url =
        "https://www.youtube.com/embed/" +
        url +
        "?autoplay=1&autohide=1&controls=2";
      addIframe(iframe_url);
    } else {
      addIframe(url);
    }
  }
}
function addIframe(url) {
  let iframe = $("<iframe/>", {
    frameborder: "0",
    src: url,
    width: $(".lightbox__wrapper").width(),
    height: $(".lightbox__wrapper").height(),
    allowfullscreen: "",
    webkitallowfullscreen: "",
    mozallowfullscreen: "",
    oallowfullscreen: "",
    msallowfullscreen: ""
  });
  $(".lightbox__wrapper").append(iframe);
}

const requestURL ="https://avalonkoteek.github.io/portfolio/data.json";
let type = "all";
let AllData = [];
let $btn = $(".js-tab");
let $sliderWrapper = $(".js-slider");
    
//ПОЛУЧЕНИЕ
sendRequest("GET", requestURL)
  .then(data => {
    AllData = data.map(item => item);
  })
  .catch(err => console.log(err));
// request

function sendRequest(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      }
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(xhr.response);
    };
    xhr.send();
  });
}

//ОБРАБОТКА

$btn.on("click", function() {
  $btn.attr("data-checked", "false");
  $(this).attr("data-checked", "true");
  removeContent();
  type = $(this).data("type");
  updateContent();
});

function removeContent() {
  $(".portfolio-item").remove();
}
////

function updateContent() {
  let newData = [];
  if (type == "all") {
    addContent(AllData);
  } else {
    newData = sortData(type);
    addContent(newData);
  }
 

  $(".js-preload").each(function() {
    var imageSrc = $(this).data("image-src");
    $(this).css("background-image", "url(" + imageSrc + ")");
  });
  
  let lightboxButton = $(".lightbox-js");
  lightboxButton.on("click", function(event) {
    var $overlay = $('<div class="lightbox_overlay"></div>');
    var $wrap = $('<div class="lightbox__wrapper"></div>');
    let $closeBtn = $('<button class="closeLightbox"></button>');

    $overlay.append($wrap);
    $("body").prepend($overlay);
    $overlay.append($closeBtn);

    if ($(this).hasClass("lightbox-iframe-js")) {
      let url = $(this).data("url");
      let type = $(this).data("type");

      new LightboxIframe(type, url);
    }
    $overlay.show();

    $closeBtn.click(function() {
      $overlay.remove();
    });
  });
  new SliderPortfolio($(".js-slider"));


}
function sortData(type) {
  let newData = AllData.filter(item => {
    return item.type.filter(element => element.visualType == type).length > 0;
  });
  return newData;
}
function addContent(SortData) {
  SortData.forEach(element => {
    createElement(element);
  });
}
function createElement(element) {

  let title = element.title;
  let decription = element.text;
  let price = element.price;
  let time = element.time;
  let format = element.format;

  // base blocks
  let $ul__wrapper = $(".js-portfolio-wrapper");
  let $li = $('<li class="portfolio-item"></li>');
  let $visualContentWrapper = $(
    '<div class="portfolio-item__visual-container js-slider"></div>'
  );
  let $visualContentItems = $(
    '<div class="portfolio-item__image-wrapper js-slider-wrapper"></div>'
  );
  let $priceAndData = $(
    '<div class="portfolio-item__image-under-text">Срок: ' +
      time +
      ", цена: " +
      price +
      "</div>"
  );

  let $textContentWrapper = $('<div class="portfolio-item__text-container"></div>');
  let $textContentItem__title = $('<h3 class="portfolio-item__title">' + title + "</h3>");
  let $textContentItem__description = $('<div class="ortfolio-item__decription">' + decription + "</div>");
  let $textContentItem__format = $('<div class="portfolio-item__format">' + format + "</div>");

  $ul__wrapper.append($li);
  $li.append($visualContentWrapper);
  $li.append($textContentWrapper);
  $visualContentWrapper.append($visualContentItems);
  $visualContentWrapper.append($priceAndData);
  $textContentWrapper.append($textContentItem__title);
  $textContentWrapper.append($textContentItem__description);
  $textContentWrapper.append($textContentItem__format);


  //visual
  element.type.forEach(el => {
    let type = el.visualType;
    let str;
    if (type == "video") {
      str = '<div class="portfolio-item__image js-preload js-visual-content lightbox-js lightbox-iframe-js" data-url="' +
          el.url +
          '" data-type="video" data-image-src="'+el.imageUrl+'"></div>'
      
    }
    if (type == "panorama") {
      str =  '<div class="portfolio-item__image js-preload js-visual-content lightbox-iframe-js" data-url="' +
          el.url +
          '" data-type="panorama" data-image-src="'+el.imageUrl+'></div>'
    }
    let $visualContentItem=$(str);
    $visualContentItems.append($visualContentItem);
  });
}
let lightboxButton = $(".lightbox-js");
  lightboxButton.on("click", function(event) {
    //create lightbox wrapper
    var $overlay = $('<div class="lightbox_overlay"></div>');
    var $wrap = $('<div class="lightbox__wrapper"></div>');
    let $closeBtn = $('<button class="closeLightbox"></button>');

    // append method
    $overlay.append($wrap);
    $("body").prepend($overlay);
    $overlay.append($closeBtn);

    if ($(this).hasClass("lightbox-iframe-js")) {
      let url = $(this).data("url");
      let type = $(this).data("type");

      new LightboxIframe(type, url);
    }

    if ($(this).hasClass("lightbox-slider-js")) {
      let typeSlidshow = $(this).data("type");

      switch (typeSlidshow) {
        case "wide-angle":
          new LightboxSlider(ImageArray__wide_angle);
          break;
        case "air-photo":
          new LightboxSlider(ImageArray__air_photo);

          break;
        case "processing":
          new LightboxSlider(ImageArray__processing);

          break;
        default:
      }
    }
    $overlay.show();

    $closeBtn.click(function() {
      $overlay.remove();
    });
  });
new SliderPortfolio($(".js-slider"));
  // слайдер
  // video

