import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  redirectPath: string;
  isAllowed: boolean;
  children: ReactNode;
}
const ProtectedRoutes = ({ children, isAllowed, redirectPath }: IProps) => {
  if (isAllowed) {
    return children;
  } else return <Navigate to={redirectPath} />;
};

export default ProtectedRoutes;
