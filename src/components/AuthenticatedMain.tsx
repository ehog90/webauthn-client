import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, FunctionComponent, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useAxios } from '../hooks/useAxios';
import { IUserData } from '../interfaces/login.interfaces';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/user.slice';
import AnimatedLogo from './AnimatedLogo';
import styles from './AuthenticatedMain.module.scss';

interface IAuthenticatedMainProps {}

const AuthenticatedMain: FunctionComponent<IAuthenticatedMainProps> = (
  props
) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const {
    data: userData,
    get: getUserData,
    errorCode: userDataErrorCode,
  } = useAxios<IUserData>('login/user-data');

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ('401' === userDataErrorCode) {
      navigate('./login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataErrorCode]);

  useEffect(() => {
    userData && dispatch(setUser(userData));
  }, [dispatch, userData]);

  return (
    <Fragment>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand>
            <AnimatedLogo className={styles.logo}></AnimatedLogo>WebAuthn Demo
          </Navbar.Brand>
          <Nav className='me-auto'>
            <NavLink to='./home' className='nav-link'>
              Home
            </NavLink>
            <NavLink to='./registrations' className='nav-link'>
              Registrations
            </NavLink>
          </Nav>
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              {userData && (
                <div className={styles.userData}>
                  <div>
                    <FontAwesomeIcon
                      icon={faUser}
                      className='me-2'
                    ></FontAwesomeIcon>
                    {userData.userName}
                  </div>
                  <div role='button'>
                    <NavLink to='./logout'>
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                      ></FontAwesomeIcon>
                    </NavLink>
                  </div>
                </div>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='mt-2'>
        <Outlet></Outlet>
      </Container>
    </Fragment>
  );
};

export default AuthenticatedMain;
