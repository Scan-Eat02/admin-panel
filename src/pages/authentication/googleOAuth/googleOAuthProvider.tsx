import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleOAuth } from "./googleOAuth";
import { GOOGLE_CLIENT_ID } from "@/utils/enums";
export const GoogleOAuthWrapper = ({
  isDisabled,
  onGoogleAuth,
}: {
  isDisabled: boolean;
  onGoogleAuth: (isGoogleAuthLogingIn: boolean) => void;
}) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleOAuth isDisabled={isDisabled} onGoogleAuth={onGoogleAuth} />
    </GoogleOAuthProvider>
  );
};
export default GoogleOAuthWrapper;
