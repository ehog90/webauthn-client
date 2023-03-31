import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Buffer } from 'buffer';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { useAxios } from '../hooks/useAxios';
import { IRandomKeyResponse } from '../interfaces/device-reg.interface';
import { ILoginResponse } from '../interfaces/login.interfaces';
import styles from './Login.module.scss';

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useLocalStorage('authMode', 'password');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {
    data: loginWithPasswordData,
    errorCode: loginWithPasswordErrorCode,
    post: loginWithPassword,
  } = useAxios<ILoginResponse>('login/password');

  const {
    data: loginWithWebauthnData,
    errorCode: loginWithWebauthnErrorCode,
    post: loginWithWebauthn,
  } = useAxios<ILoginResponse>('login/webauthn');

  const { data: newKey, post: getNewKey } = useAxios<IRandomKeyResponse>(
    'webauthn/key-unauthed'
  );

  React.useEffect(() => {
    if (loginWithPasswordData?.token) {
      localStorage.setItem('ACCESS_TOKEN', loginWithPasswordData.token);
      navigate('/authed/home');
    }
  }, [loginWithPasswordData, navigate]);

  React.useEffect(() => {
    if (loginWithWebauthnData?.token) {
      localStorage.setItem('ACCESS_TOKEN', loginWithWebauthnData.token);
      navigate('/authed/home');
    }
  }, [loginWithWebauthnData, navigate]);

  const handleLogin = React.useCallback(() => {
    loginWithPassword({ body: { userName, password } });
  }, [loginWithPassword, password, userName]);

  const handleLoginWebauthn = () => {
    getNewKey();
  };

  const handleSwitchAuthMode = () => {
    setAuthMode((v) => (v === 'password' ? 'webauthn' : 'password'));
  };

  React.useEffect(() => {
    if (!newKey) {
      return;
    }
    const publicKeyCredentialRequestOptions = {
      challenge: Uint8Array.from(newKey.key, (c) => c.charCodeAt(0)),
      timeout: 60000,
    };
    navigator.credentials
      .get({
        publicKey: publicKeyCredentialRequestOptions as any,
      })
      .then((cr: any) => {
        const authenticatorData = Buffer.from(
          cr.response.authenticatorData
        ).toString('base64');
        const clientData = Buffer.from(cr.response.clientDataJSON).toString(
          'base64'
        );
        const signature = Buffer.from(cr.response.signature).toString('base64');
        const id = cr.id;
        const type = cr.type;
        loginWithWebauthn({
          body: { authenticatorData, clientData, signature, id, type },
        });
      });
  }, [loginWithWebauthn, newKey]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <h3>Login</h3>
        {authMode === 'password' && (
          <React.Fragment>
            <div className={styles.loginItem}>
              <label>Username</label>
              <input
                type='text'
                value={userName}
                onChange={(evt) => setUserName(evt.target.value)}
              />
            </div>
            <div className={styles.loginItem}>
              <label>Password</label>
              <input
                type='password'
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </div>
          </React.Fragment>
        )}
        {authMode === 'webauthn' && (
          <React.Fragment>
            <div
              className={styles.webauthn}
              role='button'
              onClick={handleLoginWebauthn}
            >
              <FontAwesomeIcon icon={faFingerprint}></FontAwesomeIcon>
            </div>
          </React.Fragment>
        )}

        <div className={styles.loginButtons}>
          {authMode === 'password' && (
            <div>
              <Button
                variant='primary'
                onClick={handleLogin}
                disabled={!userName || !password}
              >
                Login
              </Button>
            </div>
          )}
          <div>
            <Button variant='primary' onClick={handleSwitchAuthMode}>
              {authMode === 'password'
                ? 'Switch to WebAuthn'
                : 'Switch to Password'}
            </Button>
          </div>
        </div>
        {(loginWithPasswordErrorCode === '403' ||
          loginWithWebauthnErrorCode === '403') && (
          <div className={styles.error}>Login Failed!</div>
        )}
      </div>
    </div>
  );
};

export default Login;
