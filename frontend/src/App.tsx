import React, {Suspense, useEffect} from 'react';
import Loader from "./pages/loader/Loader";
import Router from "./pages/Router";
import SocketClient from "./libraries/SocketClient";

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
    useEffect(() => {
        SocketClient.createConnection();
    })

  return (
      <Suspense fallback={<Loader />}>
        <Router />
      </Suspense>
  );
}
