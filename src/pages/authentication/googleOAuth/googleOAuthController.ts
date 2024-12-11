import { useNotification } from "@/hooks";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { useLocation } from "react-router-dom";
import { useGoogleOAuth } from "../services";

const useGoogleOAuthController = () => {
  const notification = useNotification();
  const location = useLocation();
  const makeUserLoginSignup = useGoogleOAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse: CodeResponse) =>
      makeUserLoginSignup.mutate(codeResponse),
    onError: (error) => {
      notification("error", "Login Failed", "Google Login Failed");
      console.error(error);
    },
    flow: "auth-code",
  });

  return {
    buttonLabel: location.pathname.includes("login") ? "Login" : "Sign up",
    googleLogin,
  };
};

export default useGoogleOAuthController;
