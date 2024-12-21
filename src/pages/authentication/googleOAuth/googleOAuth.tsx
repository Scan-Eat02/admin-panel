import { Button } from "antd";
import useGoogleOAuthController from "./googleOAuthController";
export const GoogleOAuth = ({
  isDisabled,
  onGoogleAuth,
}: {
  isDisabled: boolean;
  onGoogleAuth: (isGoogleAuthLogingIn: boolean) => void;
}) => {
  const { buttonLabel, isUserLogingIn, googleLogin } =
    useGoogleOAuthController(onGoogleAuth);
  return (
    <div>
      <Button
        onClick={googleLogin}
        loading={isUserLogingIn}
        disabled={isDisabled}
      >
        {buttonLabel} with Google
      </Button>
    </div>
  );
};
