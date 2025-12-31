/* eslint-disable jsx-a11y/alt-text */
import React , { useEffect , useState } from "react";
import Clock from "react-clock";
import 'react-clock/dist/Clock.css';

const Card = ({ data }) => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {

      const nowUTC = new Date();
      const localOffset = data.timezone * 1000;
      const localDate = new Date (nowUTC.getTime() + localOffset);
      setValue (localDate)

    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  if (JSON.stringify(data) !== "{}") {
    return (
      <div className="d-flex flex-column align-items-center mt-4">
        <p>
          <Clock value={value} />
        </p>
        <h2>
          {" "}
          {data.name}, {data.sys.country}{" "}
        </h2>
        <h1>
          <img
            src={`https://openweathermap.org//img/w/${data.weather[0].icon}.png`}
          />
          {Math.round(data.main.temp - 273.15)}°C
        </h1>
        <p>{data.weather[0].main}</p>
        <p>Humidity: {data.main.humidity}% </p>
        <p>Visibility: {data.visibility / 1000}km </p>
      </div>
    );
  } else {
    return <h1 className="text-center">Loading....</h1>;
  }
};

export default Card;
