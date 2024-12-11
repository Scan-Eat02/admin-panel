import { useMutation } from "react-query";

import apiClient from "@/apis/apiClient";
import { CodeResponse } from "@react-oauth/google";
import { APIS_ROUTES, API_MUTATION_KEY } from "@/utils/enums";

const googleOAuth = async (codeResponse: CodeResponse) => {
  try {
    if (!codeResponse.code) return;
    const result = await apiClient.post<CodeResponse, IAxiosResponse<any>>(
      APIS_ROUTES.AUTH.GOOGLE_AUTH,
      { isAdmin: true, ...codeResponse }
    );
    return result.response.Data;
  } catch (error) {
    console.error("Google Login Error:", error);
  }
};

const useGoogleOAuth = () =>
  useMutation<any, IAPIError, CodeResponse>(
    [API_MUTATION_KEY.GOOGLE_AUTH],
    googleOAuth
  );

export default useGoogleOAuth;
