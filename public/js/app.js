const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value.trim();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';


  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {

      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        const {
          precipProbability,
          temperature,
          summary,
          temperatureHigh: max,
          temperatureLow: min,
        } = data.forecast;

        messageOne.textContent = data.location;
        messageTwo.textContent = `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain. The high today is ${max} with a low of ${min}.`;
      }
    });
  });
});