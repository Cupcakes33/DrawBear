import { useEffect, useState } from "react";
import DiaryList from "../components/main/DiaryList";
import NoDiary from "../components/main/NoDiary";
import Footer from "../components/common/Footer";
import { StContainer, StHeader, StSection } from "../UI/common";
import { useDispatch } from "react-redux";
import { __main } from "../redux/modules/diarySlice";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { mainApi } from "../apis/axios";

const Main = () => {
  const [isDiaryData, setIsDiaryData] = useState(false);
  const dispatch = useDispatch();


  const { data, isError, isLoading, error } = useQuery(["main"], mainApi.read);
  
  // useEffect(() => {
  //   // dispatch(__main());
    // axios.get(`${process.env.REACT_APP_MY_API}/api/diary`).then((response) => {
    //   console.log(response);
    // });
  // }, []);
  console.log(data);

  return (
    <StContainer>
      <StHeader flexCenter>
        <h1>LOGO</h1>
      </StHeader>
      <StSection>{!isDiaryData ? <NoDiary /> : <DiaryList />}</StSection>
      <Footer></Footer>
    </StContainer>
  );
};

export default Main;
