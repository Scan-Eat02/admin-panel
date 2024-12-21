import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useNotification } from "@/hooks";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { useGoogleOAuth } from "../services";
import { USER_ACCESS_KEY } from "@/utils/enums";
import { useUser } from "@/context";
const useGoogleOAuthController = (
  onGoogleAuth: (isGoogleAuthLogingIn: boolean) => void
) => {
  const notification = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthActionLogin = useMemo(
    () => location.pathname.includes("login"),
    [location]
  );

  const { login } = useUser();
  const makeUserLoginSignup = useGoogleOAuth(isAuthActionLogin);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse: CodeResponse) =>
      makeUserLoginSignup.mutate(codeResponse),
    onError: (error) => {
      notification("error", "Login Failed", "Google Login Failed");
      console.error(error);
    },
    flow: "auth-code",
  });

  useEffect(() => {
    if (makeUserLoginSignup.isSuccess && makeUserLoginSignup.data) {
      login(makeUserLoginSignup.data);
      Cookies.set(USER_ACCESS_KEY.TOKEN, makeUserLoginSignup.data.token);
      navigate("/dashboard", { replace: true });
    }
  }, [makeUserLoginSignup.isSuccess, makeUserLoginSignup.data]);

  useEffect(() => {
    onGoogleAuth(makeUserLoginSignup.isLoading);
  }, [makeUserLoginSignup.isLoading]);

  return {
    buttonLabel: isAuthActionLogin ? "Login" : "Sign up",
    isUserLogingIn: makeUserLoginSignup.isLoading,
    googleLogin,
  };
};

export default useGoogleOAuthController;
