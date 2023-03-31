import { Buffer } from 'buffer';
import * as React from 'react';
import { Button } from 'react-bootstrap';

import { useAxios } from '../hooks/useAxios';
import { IAuthentication } from '../interfaces/authentication.interface';
import { IRandomKeyResponse } from '../interfaces/device-reg.interface';
import { useAppSelector } from '../redux/hooks';
import { selectUserData } from '../redux/user.slice';
import Authentication from './Authentication';
import styles from './Registrations.module.scss';

interface IRegistrationsProps {}

const Registrations: React.FunctionComponent<IRegistrationsProps> = (props) => {
  const { data: newKey, post: getNewKey } =
    useAxios<IRandomKeyResponse>('webauthn/key');
  const userData = useAppSelector(selectUserData);

  const { post: register } = useAxios<IRandomKeyResponse>('webauthn/register');

  const { data: authentications, get: getAuthentications } =
    useAxios<IAuthentication[]>('authentication');

  const { delete: deleteAuth } =
    useAxios<IAuthentication[]>('authentication/:id');

  React.useEffect(() => {
    getAuthentications();
  }, [getAuthentications]);

  React.useEffect(() => {
    if (!userData || !newKey) {
      return;
    }
    const credentialOptions: PublicKeyCredentialCreationOptions = {
      attestation: 'direct',
      challenge: Uint8Array.from(newKey.key, (c) => c.charCodeAt(0)),
      rp: {
        name: 'webauthnDemo',
        id: 'localhost',
      },
      user: {
        name: userData.userName,
        id: Uint8Array.from(userData.userName, (c) => c.charCodeAt(0)),
        displayName: userData.userName,
      },
      authenticatorSelection: {
        authenticatorAttachment: 'cross-platform',
      },
      pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
      timeout: 60000,
    };
    navigator.credentials
      .create({
        publicKey: credentialOptions,
      })
      .then((cr: any) => {
        const clientData = Buffer.from(cr.response.clientDataJSON).toString(
          'base64'
        );
        const attestationObject = Buffer.from(
          cr.response.attestationObject
        ).toString('base64');
        const attachment = cr.authenticatorAttachment;
        const id = cr.id;
        const type = cr.type;

        register({
          body: { clientData, attestationObject, attachment, id, type },
        }).then(() => {
          getAuthentications();
        });
      });
  }, [getAuthentications, newKey, register, userData]);

  const handleRegisterDevice = () => {
    getNewKey();
  };

  const handleDelete = (auth: IAuthentication) => {
    deleteAuth({ routeParams: { id: auth.id } }).then(() =>
      getAuthentications()
    );
  };

  return (
    <React.Fragment>
      <h2>Register</h2>
      <div>
        <Button variant='primary' onClick={handleRegisterDevice}>
          Register Device
        </Button>
      </div>
      <h2 className='mt-2 mb-2'>My Registrations</h2>
      <div className={styles.auths}>
        {authentications?.map((auth) => (
          <Authentication
            key={auth.id}
            auth={auth}
            onDelete={handleDelete}
          ></Authentication>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Registrations;
