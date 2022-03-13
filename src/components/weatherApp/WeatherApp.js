import { Fragment, useEffect, useState } from "react";
import classes from "./WeatherApp.module.css";
import thandImage from "./thand.jfif";
import garmiImage from "./garmmi.jpg";

const ImgComp = (props) => {
  return (
    <div className={props.cls}>
      <img src={props.image} alt="It is to show temprature in humourous way" />
    </div>
  );
};

const WeatherApp = () => {
  const [cityName, setCityName] = useState(null);
  const [search, setSearch] = useState("Mumbai");

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=c4389738498adeb9c6c4c6bb876c1679`
      );
      const resJson = await response.json();
      console.log(resJson);
      setCityName(resJson.main);
    };
    fetchApi();
  }, [search]);
  const cityNameHandler = (event) => {
    setSearch(event.target.value);
    console.log(cityName);
  };
  return (
    <Fragment>
      <div className={classes.box}>
        <div>
          <input type="search" id="cityName" onChange={cityNameHandler}></input>
        </div>
        {!cityName ? (
          <p> No Data Found </p>
        ) : (
          <div className={classes.info}>
            <h2 className={classes.location}>{`${
              search[0].toUpperCase() + search.slice(1)
            }`}</h2>
            <h1 className="temp">
              <i
                className="fa-solid fa-temperature-half fa-beat-fade"
                style={{
                  color: "rgb(202, 0, 0)",
                }}
              ></i>
              {cityName.temp}°C
            </h1>
            <h3>Real Feel : {cityName.feels_like}°Cel</h3>
            <div>
              {cityName.temp > 16 ? (
                <ImgComp cls="hot" image={garmiImage} />
              ) : (
                <ImgComp cls="cold" image={thandImage} />
              )}
            </div>
            <h3 className="tempMinMax">
              Min :
              {(cityName.temp_min - Math.floor(Math.random() * 8) + 1).toFixed(
                2
              )}
              °Cel | Max : {cityName.temp_max}
              °Cel
            </h3>
            {/* <div className={classes.wrapper}></div> */}
          </div>
        )}
        <div className={`${classes.wave} ${classes.wave1}`}></div>
        <div className={`${classes.wave} ${classes.wave2}`}></div>
      </div>
    </Fragment>
  );
};

export default WeatherApp;
