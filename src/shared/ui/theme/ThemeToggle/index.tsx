import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { StorageKeys, StorageUtility } from '~/shared/utils/localStorage';
import { setTheme } from '~/store/themeSlice';

import Switch from '../../Switch';
import { ThemeMode } from './theme.t';

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const isDarkTheme = theme === ThemeMode.DARK;

  const handleThemeChange = (isOn: boolean) => {
    const newTheme = isOn ? ThemeMode.DARK : ThemeMode.LIGHT;
    dispatch(setTheme(newTheme));
    document.documentElement.setAttribute('data-theme', newTheme);
    StorageUtility.setItem(StorageKeys.THEME_KEY, newTheme);
  };

  return <Switch isOn={isDarkTheme} onChange={handleThemeChange} />;
};

export default ThemeToggle;
