import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

export const RequiredAuth = ({ children }) => {
  const location = useLocation();

  const { isAuth, userData } = useSelector((state) => state.contentReducer);
  if (!isAuth) {
    location.state = location.pathname;
    return <Navigate to={"/"} />;
  }
  return children;
};
