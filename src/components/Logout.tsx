import * as React from "react";
import { useNavigate } from "react-router-dom";

interface ILogOffProps {}

const Logout: React.FunctionComponent<ILogOffProps> = (props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/login", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <React.Fragment>Log Off</React.Fragment>;
};

export default Logout;
