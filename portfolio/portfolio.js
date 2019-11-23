const requestURL =
  "http://127.0.0.1:5500/portfolio/data.json";
let $btn = $(".js-tab");

//get dataJson
sendRequest("GET", requestURL)
  .then(data => addContent(data))
  .catch(err => console.log(err));

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
//inpusts checked
$btn.on('click',function(){
 $btn.attr('data-checked', 'false');
 $(this).attr('data-checked', 'true');
});


function addItem(data) {
  const videoArr = data.filter(element => element.type == "video");
  console.log(data);
  checkedTab();

}
function checkedTab(){
  let $tabList = $(".portfolio-navigation__tab");
  $tabList.each(function(){
 if($(this).data("checked")=="checked" ){
  uppdateContent($(this).data("type"));
 };
  })
}
function sortData(dataArr,type){
  let newData = dataArr.filter(obj => {
    let ar = obj.type.filter(s => {return s.visualType === type});
    if(ar.length == 0)return true;
    else return false;
  });
  return newData;

}
function addContent(SortData){
  SortData.forEach(element => {
    createElement(element);
  });
}


function createElement(element){

let title = element.title;
let decription = element.text;
let price = element.price;
let time = element.time;
let format = element.format;

// base blocks
let $ul__wrapper = $(".js-portfolio-wrapper");
let $li = $('<li class="portfolio-item"></li>');
let $visualContentWrapper = $('<div class="portfolio-item__visual-box"></div>');
let $textContentWrapper = $('<div class="portfolio-item__text-box"></div>');

let $textContentItem__title = $('<h3 class="portfolio-item__title">'+title+'</h3>');
let $textContentItem__description = $('<div class="portfolio-item__description">'+decription+'</div>');

$ul__wrapper.append($li);
$li.append($visualContentWrapper);
$li.append($textContentWrapper);

$textContentWrapper.append($textContentItem__title);
$textContentWrapper.append($textContentItem__description);

// text


//visual
element.type.forEach(el =>{
  let type = el.visualType;
  if(type=="video"){
    let $visualContentItem = $('<div class="portfolio-item__visual-item">VIDEO'+el.url+'</div>');
    $visualContentWrapper.append($visualContentItem);
  }
});
// слайдер
// video
//  

}
class PortfolioSlider{
 constructor(arr){
   
 }
}