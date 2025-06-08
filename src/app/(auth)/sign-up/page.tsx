import SignUpBanner from '~/widgets/SignUpBanner';
import SignUpForm from '~/widgets/SignUpForm';

import styles from './styles.module.scss';

const SignUp = () => {
  return (
    <div className={styles.container}>
      <SignUpBanner />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
