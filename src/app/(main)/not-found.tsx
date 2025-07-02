import Link from 'next/link';

import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header404}>404</h1>
      <h2 className={styles.headerNotFound}>Tweet Not Found</h2>
      <Link href="/" className={styles.link}>
        Go back to homepage
      </Link>
    </div>
  );
}
