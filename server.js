const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 4000;

const publicPath = path.join(__dirname, 'Lab4_week4');

app.use(express.static(publicPath));

app.get('/about-us.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about-us.html'));
});

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getWeather', async (req, res) => {
  try {
    const apiKey = '2b350a87de1accceaaa66f9966efb1fe';
    const city = req.query.city || 'New York';

    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);

    const weatherData = {
      location: response.data.location.name,
      temperature: response.data.current.temp_c,
      condition: response.data.current.condition.text,
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
