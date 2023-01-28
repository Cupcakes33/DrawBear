import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const Chatting = () => {
  return (
    <>
      <h2>채팅방</h2>
      <div>
        <form>
          <ul></ul>
          <input type="text" name="message" placeholder="message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};
export default Chatting;
