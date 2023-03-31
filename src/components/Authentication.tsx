import { format } from 'date-fns';
import * as React from 'react';
import { Button } from 'react-bootstrap';

import { IAuthentication } from '../interfaces/authentication.interface';
import styles from './Authentication.module.scss';

interface IAuthenticationProps {
  auth: IAuthentication;
  onDelete: (auth: IAuthentication) => void;
}

const Authentication: React.FunctionComponent<IAuthenticationProps> = ({
  auth,
  onDelete,
}) => {
  return (
    <div className={styles.auth}>
      <h5>{auth.id}</h5>
      <div className={styles.details}>
        {format(new Date(auth.createdAt), 'yyyy-MM-dd HH:mm')}{' '}
        <Button size='sm' onClick={() => onDelete(auth)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Authentication;
