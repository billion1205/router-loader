import React from 'react';
import {Link} from "react-router-dom";
import EventsList from "../components/EventsList";

const DUMMY_EVENTS=[
  {id:'e1',title:'Some event'},
  {id:'e2',title:'Another event'},
]

const EventsPage = () => {
  return (
      <div>
        <h1>All Events</h1>
        <ul>
          {DUMMY_EVENTS.map(event=><li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.title}</Link>
          </li>)}
        </ul>
      </div>
  );
};

export default EventsPage;