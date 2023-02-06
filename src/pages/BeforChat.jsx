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
  const [infi, setInfi] = useState({
    diaryId,
    pageParam: 1,
  });
  const { ref, inView } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });
  console.log(diaryId);
  const { data, error, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["chattings"],
      () => chattingApi.search(infi),
      {
        getNextPageParam: (lastPage) =>
          !lastPage.isLast ? lastPage.nextPage : undefined,
      },
      {
        staleTime: 60000,
      }
    );

  useEffect(() => {
    if (inView) {
    }
  }, [inView]);

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;
  return (
    <>
      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        <InfinitContent>
          {data?.pages[0]?.Chats.length !== 0 ? (
            data?.pages?.map((page) => {
              return page?.Chats?.map((chatInfo, index) => {
                if (userId === chatInfo.userId) {
                  return (
                    <ChatItem
                      chatInfo={chatInfo}
                      bgcolor="#3CC7A6"
                      rowreverse="row-reverse"
                      key={index}
                    ></ChatItem>
                  );
                } else {
                  return (
                    <ChatItem
                      chatInfo={chatInfo}
                      key={index}
                      bgcolor="#ffffff"
                    ></ChatItem>
                  );
                }
              });
            })
          ) : (
            <>
              <div>카톡내용없음</div>
            </>
          )}
        </InfinitContent>
      </InfiniteScroll>
      <div style={{ height: "100px", backgroundColor: "red" }} ref={ref}></div>;
    </>
  );
};
export default BeforChat;
const InfinitContent = styled.div`
  width: 100%;
`;
