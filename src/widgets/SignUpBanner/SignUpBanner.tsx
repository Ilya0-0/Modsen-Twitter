import Image from 'next/image';

import Banner from '~/shared/ui/Banner/Banner';

import dummy from '/public/png/Work-from-home.png';

import styles from './SignUpBanner.module.scss';

const SignUpBanner = () => {
  return (
    <Banner className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.dummy}>
          <Image src={dummy} alt="a man working on laptop" />
        </div>
      </div>
    </Banner>
  );
};

export default SignUpBanner;
