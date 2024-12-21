import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./privateRoutes";
import AuthRoutes from "./authRoutes";
import useRoutesController from "./routesController";

const AppRoutes = () => {
  const { isAuthenticated } = useRoutesController();

  return (
    <Routes>
      <Route
        path="/*"
        element={isAuthenticated ? <PrivateRoutes /> : <AuthRoutes />}
      />
    </Routes>
  );
};
export default AppRoutes;
