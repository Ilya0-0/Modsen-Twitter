import AuthBlock from '~/widgets/AuthBlock/AuthBlock';
import SignUpMainBanner from '~/widgets/SignUpMainBanner/SignUpMainBanner';

import styles from './SignUpMain.module.scss';

const SignUpMain = () => {
  return (
    <div className={styles.container}>
      <SignUpMainBanner />
      <AuthBlock />
    </div>
  );
};

export default SignUpMain;
