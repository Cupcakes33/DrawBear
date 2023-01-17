import styled from "styled-components";
import weathericon from "../../assets/images/weathericon.png";
import weathericonMini from "../../assets/images/weathericonMini.png";

const WeatherPicker = () => {
  return (
    <StWeatherPickerContainer>
      {/* <StWeatherIcon />
      <StWeatherIcon weatherType="비" />
      <StWeatherIcon weatherType="흐림" />
      <StWeatherIcon weatherType="천둥" />
      <StWeatherIcon weatherType="눈" />
      <StWeatherIcon weatherType="안개" /> */}
      <StWeatherIconMini />
      <StWeatherIconMini weatherTypeMini="비" />
      <StWeatherIconMini weatherTypeMini="흐림" />
      <StWeatherIconMini weatherTypeMini="천둥" />
      <StWeatherIconMini weatherTypeMini="눈" />
      <StWeatherIconMini weatherTypeMini="안개" />
    </StWeatherPickerContainer>
  );
};

export default WeatherPicker;

// default === "맑음"
const weatherTypes = (type) => {
  switch (type) {
    case "비":
      return "-105px 0px";
    case "흐림":
      return "0px -95px";
    case "천둥":
      return "-105px -95px";
    case "눈":
      return "0px -190px";
    case "안개":
      return "-100px -182px";
    default:
      return "";
  }
};

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
`;
const StWeatherIcon = styled.span`
  width: 83px;
  height: 80px;
  background-image: url(${weathericon});
  background-repeat: no-repeat;
  background-position: ${({ weatherType }) => weatherTypes(weatherType)};
`;

const StWeatherIconMini = styled.span`
  width: 40px;
  height: 40px;
  border: 2px solid #e9e9e9;
  border-radius: 50%;
  background-image: url(${weathericonMini});
  background-repeat: no-repeat;
  background-position: ${({ weatherTypeMini }) =>
    weatherTypesMini(weatherTypeMini)};
`;
