import { useState } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, Page, setOptions, localeKo } from "@mobiscroll/react";

setOptions({
  locale: localeKo,
  theme: "ios",
  themeVariant: "light",
});

const HorizontalDatePicker = () => {
  return (
    <Datepicker
      controls={["date"]}
      inputComponent="input"
      inputProps={{
        placeholder: "Please Select...",
      }}
    />
  );
};

export default HorizontalDatePicker;
