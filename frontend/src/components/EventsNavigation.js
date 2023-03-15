import classes from './EventsNavigation.module.css';
import {NavLink} from "react-router-dom";

function EventsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink end to="/events" className={({isActive})=>isActive?classes.active:undefined}>All Events</NavLink>
          </li>
          <li>
            <NavLink end to="/events/new"  className={({isActive})=>isActive?classes.active:undefined}>New Event</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
