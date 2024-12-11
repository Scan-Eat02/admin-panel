import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleOAuth } from "./googleOAuth";
export const GoogleOAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId="680587483747-vkfthvs68ko817uj5gk0sjmml19m8don.apps.googleusercontent.com">
      <GoogleOAuth />
    </GoogleOAuthProvider>
  );
};
export default GoogleOAuthWrapper;
