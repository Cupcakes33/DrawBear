import styled from "styled-components";
import weathericon from "../../assets/images/weathericon.png";
import weathericonMini from "../../assets/images/weathericonMini.png";

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
          value="맑음"
          onChange={handleChange}
          checked={!weather || weather === "맑음"}
        />
        <StWeatherIconMini />
      </label>
      <label htmlFor="cloud">
        <input
          type="radio"
          id="cloud"
          name="radio"
          value="흐림"
          onChange={handleChange}
        />
        <StWeatherIconMini weatherTypeMini="흐림" />
      </label>
      <label htmlFor="rain">
        <input
          type="radio"
          id="rain"
          name="radio"
          value="비"
          onChange={handleChange}
        />
        <StWeatherIconMini weatherTypeMini="비" />
      </label>
      <label htmlFor="snow">
        <input
          type="radio"
          id="snow"
          name="radio"
          value="눈"
          onChange={handleChange}
        />
        <StWeatherIconMini weatherTypeMini="눈" />
      </label>
    </StWeatherPickerContainer>
  );
};

export default WeatherPicker;

// default === "맑음"

const weatherTypesMini = (type) => {
  switch (type) {
    case "비":
      return "-50px 0px";
    case "흐림":
      return "0px -46px";
    case "천둥":
      return "-50px -46px";
    case "눈":
      return "0px -92px";
    case "안개":
      return "-50px -90px";
    default:
      return "";
  }
};

const StWeatherPickerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  input[type="radio"] {
    display: none;
  }

  input:checked + span {
    transform: scale(1.2);
  }
`;

export const StWeatherIconMini = styled.span`
  width: 40px;
  height: 40px;
  border: 2px solid #e9e9e9;
  border-radius: 50%;
  display: inline-block;
  transition: transform 0.2s ease-in-out;
  background-image: url(${weathericonMini});
  background-repeat: no-repeat;
  background-position: ${({ weatherTypeMini }) =>
    weatherTypesMini(weatherTypeMini)};
`;
