import LoginBanner from '~/widgets/LoginBanner';
import LoginForm from '~/widgets/LoginForm';

import styles from './styles.module.scss';

const Login = () => {
  return (
    <div className={styles.container}>
      <LoginBanner />
      <LoginForm />
    </div>
  );
};

export default Login;
