import AuthBlock from '~/widgets/AuthBlock';
import SignUpMainBanner from '~/widgets/SignUpMainBanner';

import styles from './styles.module.scss';

const SignUpMain = () => {
  return (
    <div className={styles.container}>
      <SignUpMainBanner />
      <AuthBlock />
    </div>
  );
};

export default SignUpMain;
