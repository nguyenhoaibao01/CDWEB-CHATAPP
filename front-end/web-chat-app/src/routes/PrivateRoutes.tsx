import { FunctionComponent, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

interface PrivateRoutesProps {
  exact: boolean;
  path: string;
  component: FunctionComponent;
}

const PrivateRoutes = ({
  exact,
  path,
  component,
}: PrivateRoutesProps): JSX.Element => {
  const history = useHistory();
  // useEffect(() => {
  //   if (!token) {
  //     history.push('/login');
  //   }
  // }, [token, history]);
  return <Route exact={exact} path={path} component={component} />;
};

export default PrivateRoutes;
