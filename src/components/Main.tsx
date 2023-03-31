import { FunctionComponent } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AuthenticatedMain from './AuthenticatedMain';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Registrations from './Registrations';
interface IMainProps {}

const Main: FunctionComponent<IMainProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='authed' element={<AuthenticatedMain />}>
          <Route path='' element={<Navigate to={'./home'} />} />
          <Route path='home' element={<Home />} />
          <Route path='registrations' element={<Registrations />} />
          <Route path='logout' element={<Logout />} />
        </Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='*' element={<Navigate to='login' />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
