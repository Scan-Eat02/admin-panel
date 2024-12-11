import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleOAuth } from "./googleOAuth";
import { GOOGLE_CLIENT_ID } from "@/utils/enums";
export const GoogleOAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleOAuth />
    </GoogleOAuthProvider>
  );
};
export default GoogleOAuthWrapper;
