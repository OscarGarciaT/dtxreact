import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = (props) => {
  const loginSuccess = useSelector(({ login }) => login?.success);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      navigate("/pacientes");
    } else {
      navigate("/login");
    }
  }, [loginSuccess]);

  return <>{props.children}</>;
};

export default Auth;
