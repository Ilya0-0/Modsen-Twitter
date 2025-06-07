import styles from './layout.module.scss';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.pageLayout}>
      <main>{children}</main>
      <footer>
        <a href="/about">About</a>
        <a href="/help">Help Center</a>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/cookies">Cookie Policy</a>
        <a href="/ads">Ads info</a>
        <a href="/blog">Blog</a>
        <a href="/status">Status</a>
        <a href="/careers">Careers</a>
        <a href="/brand">Brand Resources</a>
        <a href="/advertising">Advertising</a>
        <a href="/marketing">Marketing</a>
      </footer>
    </div>
  );
};

export default AuthLayout;
