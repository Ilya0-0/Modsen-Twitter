import Image from 'next/image';

import dummy from '~/public/png/Work-from-home.webp';
import Banner from '~/shared/ui/Banner';

import styles from './styles.module.scss';

const SignUpBanner = () => {
  return (
    <Banner className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.dummy}>
          <Image
            draggable={false}
            fill
            src={dummy}
            alt="a man working on laptop"
          />
        </div>
      </div>
    </Banner>
  );
};

export default SignUpBanner;
