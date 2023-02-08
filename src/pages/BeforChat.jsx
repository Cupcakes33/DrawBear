import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { chattingApi } from "../apis/axios";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ChatItem from "./ChatItem";
import styled from "styled-components";
import { backgrounds } from "polished";
const BeforChat = ({ diaryId, userId }) => {

  // const [infi, setInfi] = useState({
  //   diaryId,
  //   pageParam: 1,
  // });

  const { ref, inView } =
    useInView();
    //   {
    //   threshold: 0,
    //   triggerOnce: true,
    // }

  const { data, error, status, fetchNextPage, fetchPreviousPage, isFetchingNextPage, hasNextPage, hasPreviousPage } =
    useInfiniteQuery(
      ["chattings", diaryId],
      ({ pageParam }) => chattingApi.search({ diaryId, pageParam }),
      {
        getPreviousPageParam: (firstPage) => {
          console.log(firstPage.prevCursor)
          // return firstPage.prevCursor  ?? undefined
          return !!firstPage.isLast ? firstPage.nextPage : undefined;
        },
      },
      {
        staleTime: 1000,
      }
    );

  useEffect(() => {
    if (inView) {
      fetchPreviousPage();
    }
  }, [inView]);

  if (status === "loading") return <h2> 로딩중 .. </h2>;
  if (status === "error") return <h2> Error : {error.toString()} </h2>;
  return (
    <>
      <div ref={ref}></div>
      <InfiniteScroll hasMore={hasPreviousPage} loadMore={fetchPreviousPage}>
        {data?.pages?.map((page) => {
          console.log(page);
          return page?.Chats?.map((chatInfo, index) => {
            // console.log(chatInfo);
            if (userId === chatInfo.userId) {
              return <ChatItem chatInfo={chatInfo} bgcolor="#3CC7A6" rowreverse="row-reverse" key={index}></ChatItem>;
            } else {
              return <ChatItem chatInfo={chatInfo} key={index} bgcolor="#ffffff"></ChatItem>;
            }
          });
        })}
      </InfiniteScroll>
    </>
  );
};
export default BeforChat;
