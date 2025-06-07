import SignUpBanner from '~/widgets/SignUpBanner/SignUpBanner';
import SignUpForm from '~/widgets/SignUpForm/SignUpForm';

import styles from './SignUp.module.scss';

const SignUp = () => {
  return (
    <div className={styles.container}>
      <SignUpBanner />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
