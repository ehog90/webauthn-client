import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useAxios } from '../hooks/useAxios';
import { IUserData } from '../interfaces/login.interfaces';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/user.slice';

interface IAuthedProps {}

const Authed: React.FunctionComponent<IAuthedProps> = (props) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const {
    data: userData,
    get: getUserData,
    errorCode: userDataErrorCode,
  } = useAxios<IUserData>('login/user-data');

  React.useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if ('401' === userDataErrorCode) {
      navigate('./login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataErrorCode]);

  React.useEffect(() => {
    userData && dispatch(setUser(userData));
  }, [dispatch, userData]);

  return (
    <React.Fragment>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Nav className='me-auto'>
            <NavLink to='./home' className='nav-link'>
              Home
            </NavLink>
            <NavLink to='./registrations' className='nav-link'>
              Registrations
            </NavLink>
            <NavLink to='./logout' className='nav-link'>
              Logout
            </NavLink>
          </Nav>
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              {userData && (
                <React.Fragment>
                  <FontAwesomeIcon
                    icon={faUser}
                    className='me-2'
                  ></FontAwesomeIcon>
                  {userData.userName}
                </React.Fragment>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='mt-2'>
        <Outlet></Outlet>
      </Container>
    </React.Fragment>
  );
};

export default Authed;
