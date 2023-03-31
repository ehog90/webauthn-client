import { Fragment, FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ILogOffProps {}

const Logout: FunctionComponent<ILogOffProps> = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Fragment>Log Off</Fragment>;
};

export default Logout;
