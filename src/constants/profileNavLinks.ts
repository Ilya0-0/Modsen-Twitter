import { FC, SVGProps } from 'react';

import bookmarks from '~/public/svg/bookmarks.svg?react';
import explore from '~/public/svg/explore.svg?react';
import home from '~/public/svg/home.svg?react';
import lists from '~/public/svg/lists.svg?react';
import messages from '~/public/svg/messages.svg?react';
import more from '~/public/svg/more.svg?react';
import notification from '~/public/svg/notification.svg?react';
import profile from '~/public/svg/profile.svg?react';

interface ProfileNavLink {
  href: string;
  label: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  isDynamic?: boolean;
  basePath?: string;
}

export const profileNavLinks: ProfileNavLink[] = [
  { href: '/home', label: 'Home', icon: home },
  { href: '/explore', label: 'Explore', icon: explore },
  { href: '/notifications', label: 'Notifications', icon: notification },
  { href: '/messages', label: 'Messages', icon: messages },
  { href: '/bookmarks', label: 'Bookmarks', icon: bookmarks },
  { href: '/lists', label: 'Lists', icon: lists },
  {
    href: '/profile/:userId',
    label: 'Profile',
    icon: profile,
    isDynamic: true,
    basePath: 'profile',
  },
  { href: '/more', label: 'More', icon: more },
];
