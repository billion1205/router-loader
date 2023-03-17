import classes from './NewsletterSignup.module.css';
import {Form, useFetcher} from "react-router-dom";
import {useEffect} from "react";

function NewsletterSignup() {
  const fetcher= useFetcher();
  const {data,state}=fetcher;

  useEffect(()=>{
    if(state==='idle' && data && data.message){
      window.alert(data.message);
    }
  },[data,state])

  return (
      //fetcher.Form은 다른 곳으로 이동이 읽어나지 않는다.
      //이상하게 강의랑 다르게 action='/newsletter'를 적어줘야한다.
      <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
        <input name='email'
            type="email"
            placeholder="Sign up for newsletter..."
            aria-label="Sign up for newsletter"
        />
        <button>Sign up</button>
      </fetcher.Form>
  );
}

export default NewsletterSignup;