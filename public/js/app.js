console.log('file is loaded');

const weatherAddress = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherAddress.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;
	messageOne.textContent = 'Loading.....';
	messageTwo.textContent = '';
	fetch('/weather?address=' + location).then((res) => {
		res.json().then((data) => {
			messageOne.textContent = '';

			if (data.error) {
				messageTwo.textContent = data.error;
				//return  console.log(data.error)
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.Forecast;
			}
		});
	});
});
