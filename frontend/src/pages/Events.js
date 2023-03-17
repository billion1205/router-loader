import React, {Suspense, useEffect, useMemo} from "react";
import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";

function EventsPage() {
  //useloaderData()사용
  //defer()가 반환한 'events'키
  const { events } = useLoaderData();

  return (
      //Suspense콤포넌트는 다른 콤포넌트의 데이터가 도착하길 기다리는 동안에
      //풀백을 보여주는 역할을 한다.
      <Suspense fallback={<p style={{textAlign:'center'}}>로딩중~~~~</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
  );
}

export default EventsPage;

//원래 loader함수의 내용을 별도의 함수로 만들어 넣었다.
async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    //Response는 브라우저자체에서 제공하는 기능으로 상태코드도 변경할 수 있다.
    // throw new Response(JSON.stringify({message: "Could not fetch events"}),{status:500});
    //위 코드를 아래와 같이 간단하게 사용할 수 있다.
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    //useloadData는 프로미스를 알아서 차리하지만
    //loader와 프로미스 사이에는 defer()가 존재해서 풀어서 반환해줘야한다.
    const resData=await response.json();
    return resData.events;
  }
}

//로더로 사용할 함수.
export const loader = () => {
  return defer({
    //함수를 지정하는게 아닌 실행해서 리턴값을 저장한다.
    //당연 Promise라 그런거고 Promese가 아니면 연기할 필요가 없다.
    events: loadEvents(),
  });
};
