const requestURL = 'https://jsonplaceholder.typicode.com/users';

function sendRequest(method, url, body=null){
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
    
    xhr.send(JSON.stringify(body)); // send request 
    });
    
}
// sendRequest('GET', requestURL)
// .then(data=> console.log(data))
// .catch(err => console.log(err));
const body ={
    name: 'Dima',
    age:'23'
}
sendRequest('POST', requestURL,body)
.then(data=> console.log(data))
.catch(err => console.log(err));