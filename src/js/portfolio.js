const requestURL = "https://avalonkoteek.github.io/portfolio/data.json";

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

// Получаем данные с сервера
sendRequest("GET", requestURL)
  .then(data => addContent(data))
  .catch(err => console.log(err));

function addContent(data) {
  data.forEach(item => {
    createItem(item);
  });

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

    $overlay.show();

    $closeBtn.click(function() {
      $overlay.remove();
    });
  });
}
function createItem(element) {
  let $ul__wrapper = $(".js-portfolio-wrapper");
  let $li = $('<li class="portfolio-item"></li>');
  let $itemBox = $('<div class="portfolio-item__box"></div>');
  let $btn = $(
    '<img class="play-btn"  alt=" " src="../src/img/360-degrees.svg">'
  );
  if (element.type.visualType === "video") {
    $btn = $(
      '<img class="play-btn"  alt=" " src="../src/img/portfolio/play.svg">'
    );
  }

  let $img = $(
    '<div class="portfolio-item__img-box js-visual-content lightbox-js lightbox-iframe-js" data-url="' +
      element.type.url +
      '" data-type=' +
      element.type.visualType +
      '><img class="portfolio-item__img" src="' +
      element.type.imageUrl +
      '" alt=" "></div>'
  );

  let $priceAndData = $(
    '<div class="portfolio-item__time">Срок: ' +
      element.time +
      ", цена: " +
      element.price +
      "</div>"
  );

  let $textContentWrapper = $(
    '<div class="portfolio-item__box portfolio-item__text"><h3 class="portfolio-item__title">' +
      element.title +
      "</h3><p>" +
      element.text +
      "</p><p>" +
      element.format +
      "</p></div>"
  );

  $ul__wrapper.append($li);
  $li.append($itemBox);
  $li.append($textContentWrapper);
  $itemBox.append($img);

  $itemBox.append($priceAndData);
  $img.append($btn);
}

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
