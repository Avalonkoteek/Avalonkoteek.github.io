const requestURL =
  "http://127.0.0.1:5500/VideoServise-website/portfolio/data.json";

let type = "all";
let AllData = [];
let $btn = $(".js-tab");
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
    '<div class="portfolio-item__visual-box"></div>'
  );
  let $visualContentItems = $(
    '<div class="portfolio-item__visual-wrapper js-visual-content effect8 "></div>'
  );
  let $priceAndData = $(
    '<div class="portfolio-item__visual-text">Срок: ' +
      time +
      ", цена: " +
      price +
      "</div>"
  );

  let $textContentWrapper = $('<div class="portfolio-item__text-box"></div>');

  let $textContentItem__title = $(
    '<h3 class="portfolio-item__title">' + title + "</h3>"
  );
  let $textContentItem__description = $(
    '<div class="portfolio-item__description">' + decription + "</div>"
  );
  let $textContentItem__format = $(
    '<div class="portfolio-item__format">' + format + "</div>"
  );

  $ul__wrapper.append($li);
  $li.append($visualContentWrapper);
  $li.append($textContentWrapper);
  $visualContentWrapper.append($visualContentItems);
  $visualContentWrapper.append($priceAndData);
  $textContentWrapper.append($textContentItem__title);
  $textContentWrapper.append($textContentItem__description);
  $textContentWrapper.append($textContentItem__format);

  // text

  //visual
  element.type.forEach(el => {
    let type = el.visualType;
    if (type == "video") {
      let $visualContentItem = $(
        '<div class="portfolio-item__visual-item" data-url="' +
          el.url +
          '" data-type="video">VIDEO' +
          el.url +
          "</div>"
      );
      $visualContentItems.append($visualContentItem);
    }
    if (type == "panorama") {
      let $visualContentItem = $(
        '<div class="portfolio-item__visual-item" data-url="' +
          el.url +
          '" data-type="video"></div>'
      );
    }
  });
  // слайдер
  // video

  class Slider {
    constructor() {
      //
      let $itemList;
      let $itemWrapper;
      let $navigationBtn;
    }
  }
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
  //
}
class PortfolioSlider {
  constructor(arr) {
    if (arr.length > 1) {
      //создаем навигацию
    }
    let $visualContentItems = $(
      '<div class="portfolio-item__visual-wrapper js-visual-content effect8 "></div>'
    );
    let $visualContentItem = $(
      '<div class="portfolio-item__visual-wrapper"></div>'
    );
    //идем по массиву
    arr.forEach(element => {
      if (element.visualType == "video") {
      }
      if (element.visualType == "panorama") {
      }
      if (element.visualType == "slider") {
      }
    });
  }
}

///video and panorams
$().each(function() {
  //addClass
});

$(function() {
  let lightboxButton = $(".lightbox-js");
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
