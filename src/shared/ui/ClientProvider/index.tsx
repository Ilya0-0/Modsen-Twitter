'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '~/store/index';
import { NotificationManager } from '~/widgets/NotificationManager';

export function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <NotificationManager />
    </Provider>
  );
}
