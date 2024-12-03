interface IAxiosResponse<T> {
  response: {
    Data: T;
    Status: string;
  };
}

interface IAPIError {
  response: {
    Status: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    Error?: {
      message: string;
      name: string;
      code?: string;
      errorCode?: string;
    };
  };
  status: number;
}

interface ILogin {
  emailOrNumber: string;
  password: string;
}

interface ISignUp {
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword?: string;
}
