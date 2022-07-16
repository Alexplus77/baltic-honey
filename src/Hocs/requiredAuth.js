import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const RequiredAuth = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth, userData } = useSelector((state) => state.contentReducer);
  if (!isAuth) {
    navigate("/");
  }
  return children;
};
