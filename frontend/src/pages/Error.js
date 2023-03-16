import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const err = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong. Please try again.";

  if (err.status === 500) {
    // message = JSON.parse(err.data).message;
    message = err.data.message;  //에러 발생코드에서 json()함수로 던진걸 바로 사용가능하다.
  }
  if (err.status === 404) {
    title = "Not fond";
    message = "The page you are looking for does not exist. 404";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
