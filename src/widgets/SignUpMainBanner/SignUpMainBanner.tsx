import Banner from '~/shared/ui/Banner/Banner';

import TwitterLogo from '/public/svg/twitter-logo.svg?react';

import styles from './SignUpMainBanner.module.scss';

const SignUpMainBanner = () => {
  return (
    <Banner className={styles.banner}>
      <div className={styles.matteGlass}></div>
      <div className={styles.bannerContent}>
        <p className={styles.decorativeText}>Modsen</p>
        <TwitterLogo className={styles.bannerImg} />
      </div>
    </Banner>
  );
};
export default SignUpMainBanner;
