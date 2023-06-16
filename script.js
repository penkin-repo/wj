const listWrapper = document.querySelector(".list");
const alert = document.querySelector(".alert");
const btn = document.querySelector("#add");
btn.addEventListener("click", func);


function func() {
    // Define the request body data
    const requestBody = {
        // "addNotification": "addNotification",
        // "userId": 1245,
        // "eventId": 5,
        "getProgram": "getProgram"
        // "addNotification": "addNotification",
        // "userId": 1,
        // "eventId": 1
    };

    // Make the POST request
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    fetch('https://white-june.f5-portal.ru/api.php', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(requestBody)
        // body: "getProgram:getProgram"
    })  .then(response => {
        console.log(response);
        return response;
    })
        .then(response => response.json())
        .then(result => {
            console.log('Ответ сервера:', result);
            // Дальнейшая обработка ответа сервера
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
            // Обработка ошибки
        });
}

function createList(array) {
    listWrapper.innerHTML = "";
    array.forEach((item, i) => {
        if (i < 10) {
            let newLi = document.createElement("li");
            newLi.innerHTML = `${item.title}`;
            listWrapper.appendChild(newLi);
        }
    })
}