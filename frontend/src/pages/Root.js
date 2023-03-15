import React from 'react';
import MainNavigation from "../components/MainNavigation";
import {Outlet} from "react-router-dom";

const RootLayout = () => {
  return (
     <>
       {/*전체 레이아웃을 잡는 콤포넌트와 각각 path들이 나타날 자리를 표시하는 Outlet콤포넌트*/}
       <MainNavigation/>
       <main>
         <Outlet/>
       </main>
     </>
  );
};

export default RootLayout;