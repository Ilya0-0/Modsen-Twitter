'use client';

import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

import { profileNavLinks } from '~/constants/profileNavLinks';

import styles from './styles.module.scss';

interface NavigationMenuProps {
  onClose?: () => void;
}

const NavigationMenu = ({ onClose }: NavigationMenuProps) => {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();

  const isActive = (href: string, isDynamic?: boolean, basePath?: string) => {
    if (isDynamic && basePath) {
      return segment === basePath;
    }
    return pathname === href;
  };

  return (
    <nav className={styles.profileNav}>
      {profileNavLinks.map(
        ({ href, label, icon: Icon, isDynamic, basePath }) => (
          <li
            key={href}
            className={`${styles.navItem} ${isActive(href, isDynamic, basePath) ? styles.active : ''}`}
            onClick={onClose}
          >
            <div className={styles.navIcon}>
              <Icon />
            </div>
            <Link href={href} className={styles.link}>
              {label}
            </Link>
          </li>
        )
      )}
    </nav>
  );
};

export default NavigationMenu;
