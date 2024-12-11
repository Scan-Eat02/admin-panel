import { Button } from "antd";
import useGoogleOAuthController from "./googleOAuthController";
export const GoogleOAuth = () => {
  const { buttonLabel, googleLogin } = useGoogleOAuthController();
  return (
    <div>
      <Button onClick={googleLogin}>{buttonLabel} with Google</Button>
    </div>
  );
};
