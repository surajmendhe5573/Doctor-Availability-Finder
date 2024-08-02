const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/doctor-availability', (req, res) => {
  const { date, time } = req.query;

  if (!date || !time) {
    return res.status(400).json({ error: 'Date and time are required' });
  }

  const availability = JSON.parse(fs.readFileSync(path.join(__dirname, 'availability.json'), 'utf8')).availabilityTimings;
  const dayOfWeek = new Date(date).toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  const dayAvailability = availability[dayOfWeek] || [];

  let isAvailable = false;
  for (let slot of dayAvailability) {
    if (time >= slot.start && time <= slot.end) {
      isAvailable = true;
      break;
    }
  }

  if (isAvailable) {
    return res.json({ isAvailable: true });
  }

  let nextAvailableSlot = findNextAvailableSlot(availability, date, time);
  res.json({
    isAvailable: false,
    nextAvailableSlot
  });
});

function findNextAvailableSlot(availability, date, time) {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  let currentDate = new Date(date);
  let currentTime = time;

  for (let i = 0; i < 7; i++) {
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const dayAvailability = availability[dayOfWeek] || [];

    for (let slot of dayAvailability) {
      if (dayOfWeek === daysOfWeek[new Date(date).getDay()] && currentTime < slot.start) {
        return { date: currentDate.toISOString().split('T')[0], time: slot.start };
      } else if (dayOfWeek !== daysOfWeek[new Date(date).getDay()]) {
        return { date: currentDate.toISOString().split('T')[0], time: slot.start };
      }
    }

    currentDate.setDate(currentDate.getDate() + 1);
    currentTime = '00:00';
  }

  return null;
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
