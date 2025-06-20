import { redirect } from 'next/navigation';

const Home = () => {
  redirect('/auth/signup-main');
};

export default Home;
