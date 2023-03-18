import React, { useEffect, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import {
  fetchWeatherDataFailure,
  fetchWeatherDataRequest,
  fetchWeatherDataSuccess,
} from "../../src/redux/action-Creators/ActionCreator";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

function Weather() {
  const cityRef = useRef();

  const apiKey = "b5902073cd6bd3c4c5c602baa96162da";
  const dispatch = useDispatch();
  const store = useSelector((states) => states.WeatherApp);

  const fetchWeatherData = () => {
    dispatch(fetchWeatherDataRequest());
    const city = cityRef.current.value || "Mahbubnagar";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric}`
      )
      .then((response) => {
        const weatherData = response.data;
        console.log(weatherData);
        dispatch(fetchWeatherDataSuccess(weatherData));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchWeatherDataFailure(errorMsg));
      });
    cityRef.current.value = "";
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div id="main">
      <h1>Weather App<span>🌤</span></h1>
      <Form
        className="mt-4"
        id="form"
        onSubmit={handleSubmit}
      >
            <input
              type="text"
              id="input"
              ref={cityRef}
              placeholder="SEARCH"
            />
                <br />
            <Button
              type="submit"
              variant="outline-dark"
              style={{
                width: "150px",
                height: "50px",
                marginTop: "20px",
              }}
            >
              Get Weather
            </Button>
            <ListGroup
              style={{ width: "42rem", marginTop: "20px" }}
              className=""
            >
              <ListGroup>
                <h3>
                  <b style={{ color: "#bf4d5d" }}>Country</b>:
                  {store?.weatherData?.sys?.country}
                </h3>
              </ListGroup>
              <ListGroup>
                <h3>
                  <b style={{ color: "#bf4d5d" }}>State</b>:
                  {store?.weatherData?.name}
                </h3>
              </ListGroup>
              <ListGroup>
                <h3>
                  <b style={{ color: "#bf4d5d" }}>Temperature</b>:
                  {store?.weatherData?.main?.temp} &deg;C
                </h3>
              </ListGroup>
              <ListGroup>
                <h3>
                  <b style={{ color: "#bf4d5d" }}>Humidity</b>:
                  {store?.weatherData?.main?.humidity}%
                </h3>
              </ListGroup>
            </ListGroup>        
      </Form>
    </div>
  );
}

export default Weather;
