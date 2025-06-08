import { footerLinks } from '~/constants/footerLinks';

import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.authFooter}>
      {footerLinks.map(({ href, label }) => (
        <a key={href} href={href} className={styles.link}>
          {label}
        </a>
      ))}
    </footer>
  );
};

export default Footer;
