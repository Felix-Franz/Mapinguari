import { Suspense, useEffect } from 'react';
import ServiceClient from './libraries/ServiceClient';
import SocketClient from "./libraries/SocketClient";
import Loader from "./pages/loader/Loader";
import Router from "./pages/Router";

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
    useEffect(() => {
        SocketClient.createConnection(process.env.NODE_ENV === "production" ? undefined : process.env["REACT_APP_BACKEND_URL"]);
        ServiceClient.configure(process.env.NODE_ENV === "production" ? `${process.env.PUBLIC_URL}/api` : `${process.env["REACT_APP_BACKEND_URL"]}/api`)
    })

  return (
      <Suspense fallback={<Loader />}>
        <Router />
      </Suspense>
  );
}
