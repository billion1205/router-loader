import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventRoot";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
  loader as eventDetailLoader,
    action as deleteEventAction
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import NewEventPage from "./pages/NewEvent";
import {action as manipulaateEventAction} from './components/EventForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, //자식에게서 에러가 생겨도 버블링되어 잡힌다.
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId", //주소자체만으로 부모로써 역할을 할뿐 자신의 콤포넌트는 불필요
            id: "event-detail", //자식에게 loader를 전달해줄때 필요하다.
            loader: eventDetailLoader, //loader는 자식주소 이동시에도 실행된다.
            children: [
              { index: true, element: <EventDetailPage />,action: deleteEventAction},
              { path: "edit", element: <EditEventPage /> ,action:manipulaateEventAction},
            ],
          },
          { path: "new", element: <NewEventPage />,action:manipulaateEventAction},
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
