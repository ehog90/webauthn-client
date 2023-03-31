import * as React from 'react';

import { useAppSelector } from '../redux/hooks';
import { selectUserData } from '../redux/user.slice';

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const userData = useAppSelector(selectUserData);

  return (
    <React.Fragment>
      <h2 className='mb-2'>Home</h2>
      <h5>Welcome, {userData?.userName}!</h5>
    </React.Fragment>
  );
};

export default Home;
