import { Suspense, useEffect, useState } from 'react';
import LoadingModal from './components/LoadingModal';
import ServiceClient from './libraries/ServiceClient';
import SocketClient from "./libraries/SocketClient";
import Loader from "./pages/loader/Loader";
import Router from "./pages/Router";

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);

  useEffect(() => {
    SocketClient.createConnection(process.env.NODE_ENV === "production" ? undefined : process.env["REACT_APP_BACKEND_URL"])
      .then(() => setSocketConnected(true));
    ServiceClient.configure(process.env.NODE_ENV === "production" ? `${process.env.PUBLIC_URL}/api` : `${process.env["REACT_APP_BACKEND_URL"]}/api`);
    setLoaded(true);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {loaded ?
        <>
          <Router />
          <LoadingModal show={!socketConnected} />
        </>
        :
        <Loader />
      }
    </Suspense>
  );
}
