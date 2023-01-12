import React from "react";
import styled from "styled-components";

const Comment = () => {
  return (
    <Stbox>
      <div className="userinfo-box">
        <img src="" alt="프사" />
        <h4>닉네임</h4>
      </div>
      <pre>안녕</pre>
    </Stbox>
  );
};

export default Comment;

const Stbox = styled.div`
  margin-top: 1.7rem;
  margin-bottom: 1.7rem;
  .userinfo-box {
    display: flex;
    align-items: center;
    img {
      width: 3.7rem;
      height: 3.7rem;
      border-radius: 100%;
      background-color: tomato;
    }
    h4 {
      margin-left: 1rem;
    }
  }
  pre {
    margin-left: 4.5rem;
  }
`;
