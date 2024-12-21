interface IAxiosResponse<T> {
  response: {
    data: T;
    statusCode: number;
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
  // emailOrNumber: string;
  email: string;
  password: string;
}

interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword?: string;
}

interface User {
  message: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber?: string;
    isEmailVerified?: boolean;
  };
  id: number;
  email: string;
}
