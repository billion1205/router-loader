import EventsList from "../components/EventsList";
import {json, useLoaderData} from "react-router-dom";
import EventDetailPage, {loader as eventDetailLoader} from "./EventDetail";
import EditEventPage from "./EditEvent";

function EventsPage() {
  //useloaderData()사용
  const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>;
  }
  const events = data.events;

  return (
      <>
        <EventsList events={events}/>
      </>
  );
}

export default EventsPage;

//로더로 사용할 함수.
export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    //Response는 브라우저자체에서 제공하는 기능으로 상태코드도 변경할 수 있다.
    // throw new Response(JSON.stringify({message: "Could not fetch events"}),{status:500});
    //위 코드를 아래와 같이 간단하게 사용할 수 있다.
    throw json({message: "Could not fetch events"}, {status: 500});
  } else {
    return response;
  }
};

