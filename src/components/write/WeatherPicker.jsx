import styled from "styled-components";
import { weatherIcon } from "../../assets/images/weather";
import { flex } from "../../UI/common";

const WeatherPicker = ({ weather, setWeather }) => {
  const handleChange = (e) => {
    setWeather(e.target.value);
  };
  return (
    <StWeatherPickerContainer>
      <label htmlFor="sun">
        <input
          type="radio"
          id="sun"
          name="radio"
          value="sun"
          onChange={handleChange}
          checked={!weather || weather === "sun"}
        />
        <img src={weatherIcon.sun} alt="맑음" />
      </label>
      <label htmlFor="cloud">
        <input
          type="radio"
          id="cloud"
          name="radio"
          value="cloud"
          onChange={handleChange}
          checked={weather === "cloud"}
        />
        <img src={weatherIcon.cloud} alt="흐림" />
      </label>
      <label htmlFor="rain">
        <input
          type="radio"
          id="rain"
          name="radio"
          value="rain"
          onChange={handleChange}
          checked={weather === "rain"}
        />
        <img src={weatherIcon.rain} alt="비" />
      </label>
      <label htmlFor="snow">
        <input
          type="radio"
          id="snow"
          name="radio"
          value="snow"
          onChange={handleChange}
          checked={weather === "snow"}
        />
        <img src={weatherIcon.snow} alt="눈" />
      </label>
    </StWeatherPickerContainer>
  );
};

export default WeatherPicker;

const StWeatherPickerContainer = styled.div`
  width: 100%;
  ${flex("space-evenly", "", "row")}
  flex-wrap: wrap;
  gap: 10px;

  label {
    ${flex("", "", "column")}
    cursor: pointer;
  }
  input[type="radio"] {
    display: none;
  }

  input:checked + img {
    animation: jello-horizontal 0.9s infinite both;
  }

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: inline-block;
    transition: transform 0.2s ease-in-out;
  }
`;
