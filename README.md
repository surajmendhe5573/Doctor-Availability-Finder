# Doctor Availability Finder API

The Doctor Availability Finder API provides the availability of a doctor on a specified date and time. The API will accept two inputs, the date and time, and return whether the doctor is available or not. If the doctor is not available on the specified date and time, the API will return the nearest available date and time.

## Endpoint

### GET /doctor-availability

**Query Parameters:**

- `date`: string (required) - The date for which the availability is being queried (in the format "YYYY-MM-DD").
- `time`: string (required) - The time for which availability is being queried (in 24-hour format "hh:mm").

**Response:**

- If the doctor is available on the requested date and time, the response will be:
  ```json
  {
    "isAvailable": true
  }

- If the doctor is not available on the requested date and time, the response will be:
  ```json
  {
    "isAvailable": false,
    "nextAvailableSlot": {
      "date": "YYYY-MM-DD",
      "time": "hh:mm"
   }
  }

- Where nextAvailableSlot.date is the next available calendar date, and nextAvailableSlot.time is the start time against the first slot available.


## 🚀 About Me
I'm a Backend developer...


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/suraj-mendhe-569879233/?original_referer=https%3A%2F%2Fsearch%2Eyahoo%2Ecom%2F&originalSubdomain=in)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)
