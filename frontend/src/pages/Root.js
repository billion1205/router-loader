import React from 'react';
import MainNavigation from "../components/MainNavigation";
import {Outlet, useLoaderData, useNavigate, useNavigation} from "react-router-dom";

const RootLayout = () => {
  // const navigation=useNavigation();

  return (
     <>
       {/*전체 레이아웃을 잡는 콤포넌트와 각각 path들이 나타날 자리를 표시하는 Outlet콤포넌트*/}
       <MainNavigation/>
       <main>
         {/*{navigation.state==='loading' && <p>로딩중............</p>}*/}
         <Outlet/>
       </main>
     </>
  );
};

export default RootLayout;