$(function() {
  
  const ImageArray__processing = [
    "img/1.jpg",
    "img/2.jpg",
    "img/1.jpg",
    "img/2.jpg"
  ];
  const ImageArray__air_photo = [
    "img/1.jpg",
    "img/2.jpg",
    "img/1.jpg",
    "img/2.jpg"
  ];
  const ImageArray__wide_angle = [
    "img/1.jpg",
    "img/2.jpg",
    "img/1.jpg",
    "img/2.jpg"
  ];
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
});

class LightboxIframe {
  constructor(type, url) {
    if (type == "youtube") {
      $("lightbox__wrapper").css(
        "background-image",
        "url(http://img.youtube.com/vi/" + url + "/sddefault.jpg)"
      );

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

// Slider
class LightboxSlider {
  constructor(UrlImgArray) {
    //
    let $navigationButtonPrev = $(
      "<button class='lightboxNavigation-btn lb-prev'></button>"
    );
    let $navigationButtonPost = $(
      "<button class='lightboxNavigation-btn lb-next'></button>"
    );

    let ImgArray = [];
    let $ulImgArray = $("<ul></ul>");

    //append
    $(".lightbox__wrapper").append($ulImgArray);
    $(".lightbox__wrapper").append($navigationButtonPrev);
    $(".lightbox__wrapper").append($navigationButtonPost);

    //
    UrlImgArray.forEach(element => {
      ImgArray.push($("<li><img src=" + element + "></li>"));
    });
    ImgArray.forEach(element => {
      $ulImgArray.append(element);
    });
    addCircleNavigation(ImgArray.length);

    //
    addSlider();
  }
}

function addSlider() {
  //
  let imageWrapper = $(".lightbox__wrapper ul");
  let imagesList = imageWrapper.children("li");
  let btn = $(".lightboxNavigation-btn");
  let index = returnIndex(imageWrapper, imagesList);

  //
  if (index == -1) {
    index = 0;
  }

  updateButtonNavigation(index, imagesList.length);
  classUpdate(imagesList.eq(index));
  //
  btn.on("click", function(event) {
    //
    let direction = $(this);

    //
    if (!direction.hasClass("lb-btn-inactive")) {
      if (direction.hasClass("lb-next")) {
        index++;
      } else {
        index--;
      }

      let imageItem = imagesList.eq(index);
      classUpdate(imageItem);
      updateButtonNavigation(index, imagesList.length);
      updateCircleNavigation(index);
    }
  });
}

function returnIndex(wrapper, list) {
  let indexVisibleblock = list.index(wrapper.children("li.is-selected"));
  return indexVisibleblock;
}

function updateButtonNavigation(index, ListLength) {
  let BtnNext = $(".lb-next");
  let BtnPrev = $(".lb-prev");

  if (index == 0) {
    BtnPrev.addClass("lb-btn-inactive");
  } else {
    BtnPrev.removeClass("lb-btn-inactive");
  }
  if (index + 1 >= ListLength) {
    BtnNext.addClass("lb-btn-inactive");
  } else {
    BtnNext.removeClass("lb-btn-inactive");
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
    .addClass("move-left")
    .removeClass("move-right")
    .end()
    .nextAll()
    .addClass("move-right")
    .removeClass("move-left");
}

// Circle Slider Navigation
function addCircleNavigation(arrayLenght) {
  const $lbCircleWrapper = $("<div class='lb-circle-wrapper'></div>");
  $(".lightbox__wrapper").append($lbCircleWrapper);

  for (let i = 0; i < arrayLenght; i++) {
    if (i == 0) {
      $lbCircleWrapper.append(
        $("<div class='lb-circle lb-circle--is-selected'></div>")
      );
    } else {
      $lbCircleWrapper.append($("<div class='lb-circle'></div>"));
    }
  }
}
function updateCircleNavigation(indexItem) {
  let $circleList = $(".lb-circle");
  for (let i = 0; i < $circleList.length; i++) {
    $circleList.removeClass("lb-circle--is-selected");
  }
  let activeCircle = $circleList.eq(indexItem);

  activeCircle.addClass("lb-circle--is-selected");
}
