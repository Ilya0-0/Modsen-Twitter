import LoginBanner from '~/widgets/LoginBanner/LoginBanner';
import LoginForm from '~/widgets/LoginForm/LoginForm';

import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.container}>
      <LoginBanner />
      <LoginForm />
    </div>
  );
};

export default Login;
