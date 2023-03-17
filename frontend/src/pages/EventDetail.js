import React, { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  //이제 useRouterloaderData는 defer()의 반환값을 가진다.
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

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
    const resData = await response.json();
    return resData.events;
  }
}

//매개변수가 필요한 로더에서는 request,params 두가지 매개변수를 받는다.
export async function loader({ request, params }) {
  const id = params.eventId;
  return defer({
    //만약 앞에 await을 넣으면 데이터가 전부 로딩되기 전까지는 페이지 이동자체가 일어나지 않는다.
    //데이타 로딩전까지 즉 빈화면이 보여지는게 아닌, 페이지 이동자체가 일어나지 않음.
    //event:await loadEvent(id),
    //event:await loadEvents(),
    event: loadEvent(id),
    events:loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });
  if (!response.ok) {
    throw json({ message: "메세지 삭제 못함" }, { status: 500 });
  }
  return redirect("/events");
}
