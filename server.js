const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const port = 3000;
const apiKey = "<Replace with your API key>";

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let unit = "metric";
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
  request(url, function (err, response, body) {
    if (err) {
      res.render('index', { weather: null, error: 'There was an error in getting your data, please try again!' });
    } else {
      let weather = JSON.parse(body)
      console.log(weather);
      if (weather.main == undefined) {
        res.render('index', {weather: null, error: 'There was an error in getting the temperature for that specific city, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
})