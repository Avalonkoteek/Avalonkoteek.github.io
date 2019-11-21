const requestURL = 'https://avalonkoteek.github.io/portfolio/data.json';

function sendRequest(method, url){
    return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    
    xhr.open(method,url);                         //open new request(method(get-получение,post-добавление,put,puch...))
    
    xhr.responseType ="json";  

    xhr.setRequestHeader('Content-Type','application/json')

    xhr.onload = () =>{
        if(xhr.status >=400){
            reject(xhr.response);
        }                                               //обработка всех ошибок
      resolve(xhr.response);                            //если успешный ответ от сервера
    }
    
    xhr.onerror =() =>{
        reject(xhr.response);   //если ошибка
    }
    
    });
    
}
function addItem(data){
    let name_first = data[0].id;
    console.log(name_first);
} 
sendRequest('GET', requestURL)
.then(data => {
    let arr=[];
    data.forEach(element => {
        arr.push(element);
    });
    addItem(arr);
})
.catch(err => console.log(err));

// sendRequest('POST', requestURL,body)
// .then(data=> console.log(data))
// .catch(err => console.log(err));