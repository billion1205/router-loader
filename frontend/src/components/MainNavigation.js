import classes from './MainNavigation.module.css';
import {Link, NavLink} from "react-router-dom";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/* NavLink는 className에서 isActive사용하는 함수를 사용하여 보다 더 다이나믹하게 만들 수있다.*/}
            {/* "/" 링크는 부모path기 때문에 주소에 "/"만쳐도 버튼을 클릭하지 않았는데도 활성화가 된다 .
            이를 방지하기 위하여 "end"속성을 붙여줘야 한다. */}
            <NavLink to="/" className={({isActive})=>isActive?classes.active:undefined} end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({isActive})=>isActive?classes.active:undefined}>Events</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
