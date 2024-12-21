import { useMutation } from "react-query";
import apiClient from "@/apis/apiClient";
import { APIS_ROUTES, API_MUTATION_KEY } from "@/utils/enums";

const login = async (login: ILogin) => {
  const result = await apiClient.post<ILogin, IAxiosResponse<any>>(
    APIS_ROUTES.AUTH.LOGIN,
    login
  );

  return result.response.data;
};

const useLogin = () =>
  useMutation<any, IAPIError, ILogin>([API_MUTATION_KEY.LOGIN], login);

export default useLogin;
