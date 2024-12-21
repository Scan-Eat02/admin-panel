import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { USER_ACCESS_KEY } from "@/utils/enums";

const useRoutesController = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!Cookies.get(USER_ACCESS_KEY.TOKEN)
  );

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get(USER_ACCESS_KEY.TOKEN));
  }, [location]);

  return {
    isAuthenticated,
  };
};
export default useRoutesController;
