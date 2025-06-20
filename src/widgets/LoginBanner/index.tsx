import Image from 'next/image';

import chandelier from '~/public/png/chandelier-with-green-round-lampshade.webp';
import dummy from '~/public/png/dummy.webp';
import Banner from '~/shared/ui/Banner';

import styles from './styles.module.scss';

const LoginBanner = () => {
  return (
    <Banner className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.chandelier}>
          <Image
            draggable={false}
            src={chandelier}
            alt="chandelier with green round lampshade"
          />
        </div>
        <div className={styles.dummy}>
          <Image draggable={false} src={dummy} alt="a man holds a phone" />
        </div>
      </div>
    </Banner>
  );
};

export default LoginBanner;
