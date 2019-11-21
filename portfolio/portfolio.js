const requestURL = "https://avalonkoteek.github.io/portfolio/data.json";

function sendRequest(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin: *");

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      }
      resolve(xhr.response);
    };

    xhr.onerror = () => {
      reject(xhr.response);
    };
  });
}
function addItem(data) {
  let name_first = data[0].id;
  console.log(name_first);
}
sendRequest("GET", requestURL)
  .then(data => console.log(data))
  .catch(err => console.log(err));

// sendRequest('POST', requestURL,body)
// .then(data=> console.log(data))
// .catch(err => console.log(err));
