import { useMutation } from "react-query";
import apiClient from "@/apis/apiClient";
import { APIS_ROUTES, API_MUTATION_KEY } from "@/utils/enums";

const signUp = async (signUp: ISignUp) => {
  const result = await apiClient.post<ISignUp, IAxiosResponse<any>>(
    APIS_ROUTES.AUTH.SIGNUP,
    signUp
  );

  return result.response.data;
};

const useSignUp = () =>
  useMutation<any, IAPIError, ISignUp>([API_MUTATION_KEY.SIGNUP], signUp);

export default useSignUp;
