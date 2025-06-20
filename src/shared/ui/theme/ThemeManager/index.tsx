'use client';

import { ReactNode, useEffect } from 'react';

import { useAppDispatch } from '~/hooks/useAppDispatch';
import { StorageKeys, StorageUtility } from '~/shared/utils/localStorage';
import { setTheme } from '~/store/themeSlice';

import { ThemeMode } from '../ThemeToggle/theme.t';

const ThemeManager = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedTheme = StorageUtility.getItem<ThemeMode>(StorageKeys.THEME_KEY);
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? ThemeMode.DARK
        : ThemeMode.LIGHT;
      dispatch(setTheme(systemTheme));
      document.documentElement.setAttribute('data-theme', systemTheme);
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default ThemeManager;
