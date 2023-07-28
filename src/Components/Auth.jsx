import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithtoken } from "../slices/loginSlice";

const Auth = (props) => {
  const loginSuccess = useSelector(({ login }) => login?.success);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithtoken());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      navigate("/pacientes");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [loginSuccess]);

  return <>{props.children}</>;
};

export default Auth;
