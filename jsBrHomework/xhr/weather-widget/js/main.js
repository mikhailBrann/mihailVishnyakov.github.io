const request = new XMLHttpRequest();
//меняем тип запроса на асинхронный
request.open('GET', 'https://neto-api.herokuapp.com/weather', true);
request.send();

//проверяем XHR-запрос на окончание загрузки
request.addEventListener('load',() => {
	if (request.status === 200) {
	  const response = JSON.parse(request.responseText);
	  setData(response);
	}
})
