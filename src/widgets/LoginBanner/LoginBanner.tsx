import Image from 'next/image';

import Banner from '~/shared/ui/Banner/Banner';

import chandelier from '/public/png/chandelier-with-green-round-lampshade.png';
import dummy from '/public/png/dummy.png';

import styles from './LoginBanner.module.scss';

const LoginBanner = () => {
  return (
    <Banner className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.chandelier}>
          <Image src={chandelier} alt="chandelier with green round lampshade" />
        </div>
        <div className={styles.dummy}>
          <Image src={dummy} alt="a man holds a phone" />
        </div>
      </div>
    </Banner>
  );
};

export default LoginBanner;
