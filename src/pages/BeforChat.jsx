import { useInfiniteQuery } from "@tanstack/react-query";
import { chattingApi } from "../apis/axios";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ChatItem from "./ChatItem";
import styled from "styled-components";
import { useRef } from "react";
const BeforChat = ({ diaryId, userId }) => {
  const scrollRef = useRef();

  const { ref, inView } = useInView();

  const {
    data,
    error,
    status,
    isLoading,
    fetchPreviousPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ["chattings", diaryId],
    ({ pageParam }) => chattingApi.search({ diaryId, pageParam }),
    {
      getPreviousPageParam: (firstPage) => {
        return !!firstPage.isLast ? firstPage.nextPage : undefined;
      },
      refetchOnWindowFocus: false,
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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end" });
  }, [isLoading]);

  if (status === "loading") return <h2> 로딩중 .. </h2>;
  if (status === "error") return <h2> Error : {error.toString()} </h2>;
  return (
    <>
      <div ref={scrollRef}>
        <div ref={ref}></div>
        <InfiniteScroll hasMore={hasPreviousPage} loadMore={fetchPreviousPage}>
          {data?.pages?.map((page) => {
            return page?.Chats?.map((chatInfo, index) => {
              if (userId === chatInfo.userId) {
                return (
                  <ChatItem
                    chatInfo={chatInfo}
                    bgcolor="#3CC7A6"
                    rowreverse="row-reverse"
                    key={`chatIten${index}`}
                  ></ChatItem>
                );
              } else if (chatInfo.userId === 99999) {
                return <TimeLine>ㅡ {chatInfo.chat} ㅡ</TimeLine>;
              } else {
                return (
                  <ChatItem
                    chatInfo={chatInfo}
                    key={`chatIten${index}`}
                    bgcolor="#ffffff"
                  ></ChatItem>
                );
              }
            });
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};
export default BeforChat;

const TimeLine = styled.div`
  display: block;
  text-align: center;
`;
