import React, {Suspense} from 'react';
import Loader from "./pages/loader/Loader";
import Router from "./pages/Router";

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
  return (
      <Suspense fallback={<Loader />}>
        <Router />
      </Suspense>
  );
}
