// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//   response.json().then((data) => {
//     if (data.text) {
//       return console.log('Something went wrong...')
//     }
//     console.log(data);
//   });
// });

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
        console.log(data);

        const {
          precipProbability,
          temperature,
          summary
        } = data.forecast;

        messageOne.textContent = data.location;
        messageTwo.textContent = `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`;
      }
    });
  });
});