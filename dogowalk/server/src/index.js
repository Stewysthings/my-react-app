const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/calculate-walk', async (req, res) => {
  const { dogSize, energyLevel, gear, location } = req.body
  let baseTime = dogSize === 'Large' && energyLevel === 'High' ? 60 : 35 // Princess Cynthia vs. others
  let weatherModifier = 1.0
  let gearModifier = 0

  try {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY' // Replace with your key
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    )
    const temp = Math.round(weather.data.main.temp)
    const humidity = weather.data.main.humidity
    const precipitation = weather.data.weather[0].main

    // Princess Cynthia rules
    if (temp >= 7 && temp <= 14) weatherModifier = 1.0
    else if (temp >= 15 && temp <= 18) weatherModifier = 0.75
    else if (temp >= 19 && temp <= 21) weatherModifier = 0.5
    else if (temp >= 22 && temp <= 23) weatherModifier = 0.25
    else if (temp > 23) weatherModifier = 0
    else if (temp === 6) weatherModifier = 0.75
    else if (temp === 1) weatherModifier = 0.5
    else if (temp <= 0) weatherModifier = 0.33

    if (gear === 'Sweater' && temp < 7) gearModifier = 5
    if (gear === 'CoolingVest' && temp > 18) gearModifier = 5

    const humidityModifier = humidity > 60 ? 0.9 : 1.0
    const precipModifier = precipitation.includes('Rain') || precipitation.includes('Snow') ? 0.85 : 1.0

    const walkTime = Math.round(baseTime * weatherModifier * humidityModifier * precipModifier) + gearModifier
    const warning = temp > 21 ? 'High heat—monitor for overheating.' : temp < 1 ? 'Cold—watch for shivering.' : ''

    res.json({ walkTime, temp, fahrenheit: (temp * 9/5 + 32).toFixed(1), warning })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather' })
  }
})

app.listen(3000, () => console.log('Server running on port 3000'))