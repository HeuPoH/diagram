import React from 'react';
import { ReduxProvider } from 'app/redux-provider';
import { MainPage } from 'pages/main';

export const App: React.FC = () => {
  return (
    <ReduxProvider>
      <MainPage />
    </ReduxProvider>
  );
};
