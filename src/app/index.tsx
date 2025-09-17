import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { App } from 'app/app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <AppRoot>
        <App />
      </AppRoot>
    </ConfigProvider>
  </StrictMode>
);
