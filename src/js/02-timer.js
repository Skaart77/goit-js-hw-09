import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

let countdownInterval;
let targetDate;

      const updateTimer = () => {
        const currentDate = new Date();
        const remainingTime = targetDate - currentDate;

        if (remainingTime < 0) {
          clearInterval(countdownInterval);
          startButton.disabled = true;
          dateTimePicker.disabled = false;
          Notiflix.Report.info('Info', 'Countdown complete. Choose a date.', 'Ok');
          return;
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60).toString().padStart(2, '0');
        const seconds = Math.floor((remainingTime / 1000) % 60).toString().padStart(2, '0');

        daysField.textContent = days;
        hoursField.textContent = hours;
        minutesField.textContent = minutes;
        secondsField.textContent = seconds;
};

  const startCountdown = () => {
    targetDate = new Date(dateTimePicker.value);
    countdownInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;  
    dateTimePicker.disabled = true;
  };

  flatpickr(dateTimePicker, {enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
     onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const now = new Date();
      if (selectedDate < now) {
        Notiflix.Report.failure('Fail', 'Please choose a date in the future', 'Try again');        
        startButton.disabled = true;
      } else {
        Notiflix.Report.success('Success', 'The selected date is in the future. Click Start', 'Lets go!');
        startButton.disabled = false;        
      }
    }});

  startButton.addEventListener('click', startCountdown);
