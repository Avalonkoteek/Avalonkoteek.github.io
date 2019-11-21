const requestURL =
  "http://127.0.0.1:5500/VideoServise-website/portfolio/data.json";

sendRequest("GET", requestURL)
  .then(data => addItem(data))
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

function addItem(data) {
  const videoArr = data.filter(element => element.type == "video");
  console.log(videoArr);
}
