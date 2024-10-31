const start = 23;
const end = 24;
const range = 15;

function setTimeSlots(hour, end, range = 60) {
  const result = [];
  let minutes = 0;

  for (let i = hour; i <= end; i++) {
    const fullHour = `${doubleDigits(i)}:${doubleDigits(minutes)}`;

    if (i === end && minutes === 15) {
      continue;
    }

    if (minutes === 60) {
      minutes = 0;
      continue;
    }

    result.push(fullHour);
    minutes += range;
    i--;
  }

  return result;
}

function doubleDigits(input) {
  if (input < 10) {
    return "0" + input;
  }
  return input;
}

const timeSlots = setTimeSlots(start, end, range);
console.log(timeSlots);

module.exports = { setTimeSlots };
