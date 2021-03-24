import React, {Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import './App.css';

// page uses the hook
function Page() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng : any) => {
    i18n.changeLanguage(lng);
  };

  return (
      <div className="App">
        <div className="App-header">
          <button type="button" onClick={() => changeLanguage('de')}>
            de
          </button>
          <button type="button" onClick={() => changeLanguage('en')}>
            en
          </button>
        </div>
        <div>{t('Welcome')}</div>
      </div>
  );
}

// loading component for suspense fallback
const Loader = () => (
    <div className="App">
      <div>loading...</div>
    </div>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
  return (
      <Suspense fallback={<Loader />}>
        <Page />
      </Suspense>
  );
}
