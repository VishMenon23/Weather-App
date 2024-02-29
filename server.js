const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  console.log(city)
  const apiKey = "Add_openweathermap_API_KEY";

  // Add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  console.log("HERE")
  let weather;
  let error = null;
  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
    const { coord: { lon, lat } } = response.data;
    // Now lon and lat variables contain the longitude and latitude respectively
    console.log("Longitude:", lon);
    console.log("Latitude:", lat);
    // console.log("weather =",weather)
  } catch (error) {
    console.log("ERROR")
    
    weather = null;
    error = "Error, Please try again";
  }
  // Render the index template with the weather data and error message
  res.render("index", { weather, error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
