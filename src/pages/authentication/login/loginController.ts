import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormProps } from "antd";
import Cookies from "js-cookie";

import { USER_ACCESS_KEY } from "@/utils/enums";
import {
  EMAIL_REGEX_PATTERN,
  PASSWORD_REGEX_PATTERN,
  // PHONE_REGEX_PATTERN,
} from "@/utils/regex";
import { useLogin } from "../services";
import { encryptPassword } from "@/utils";
import { useUser } from "@/context";

const useLoginController = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isGoogleAuthLogingIn, setIsGoogleAuthLogingIn] = useState(false);
  const { login } = useUser();
  const loginUser = useLogin();

  const onGoogleAuth = (isGoogleAuthLogingIn: boolean) => {
    setIsGoogleAuthLogingIn(isGoogleAuthLogingIn);
  };
  const onFinish: FormProps<ILogin>["onFinish"] = (data) => {
    // const userEmailOrNumber = form.getFieldValue("emailOrNumber")?.trim();
    const userEmail = form.getFieldValue("email")?.trim();
    const userPassword = form.getFieldValue("password")?.trim();

    // Email validation
    if (!userEmail) {
      form.setFields([
        {
          name: "email",
          errors: ["Please provide an Email"],
        },
      ]);
      return;
    }
    if (!EMAIL_REGEX_PATTERN.test(userEmail)) {
      form.setFields([
        {
          name: "email",
          errors: ["Please enter a valid Email"],
        },
      ]);
      return;
    }
    // if (!userEmailOrNumber) {
    //   form.setFields([
    //     {
    //       name: "emailOrNumber",
    //       errors: ["Please provide an email or mobile number."],
    //     },
    //   ]);
    //   return;
    // }
    // if (
    //   !EMAIL_REGEX_PATTERN.test(userEmailOrNumber) &&
    //   !PHONE_REGEX_PATTERN.test(userEmailOrNumber)
    // ) {
    //   form.setFields([
    //     {
    //       name: "emailOrNumber",
    //       errors: ["Please enter a valid email or mobile number."],
    //     },
    //   ]);
    //   return;
    // }

    // Password validation
    if (!userPassword) {
      form.setFields([
        {
          name: "password",
          errors: ["Password is required."],
        },
      ]);
      return;
    }
    if (!PASSWORD_REGEX_PATTERN.test(userPassword)) {
      form.setFields([
        {
          name: "password",
          errors: [
            "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
          ],
        },
      ]);
      return;
    }

    // Clear errors if validation passes
    form.setFields([
      { name: "emailOrNumber", errors: [] },
      { name: "password", errors: [] },
    ]);

    // Clear session and local storage
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove(USER_ACCESS_KEY.TOKEN);

    // Prepare data for submission
    // data.emailOrNumber = userEmailOrNumber;
    data.email = userEmail;
    data.password = encryptPassword(userPassword);

    loginUser.mutate(data);
  };

  const onBlur = (fieldName: string) => {
    const value = form.getFieldValue(fieldName);

    if (fieldName === "email") {
      if (!value || value.trim().length === 0) {
        form.setFields([
          {
            name: "email",
            errors: ["Please provide an Email"],
          },
        ]);
      } else if (!EMAIL_REGEX_PATTERN.test(value)) {
        form.setFields([
          {
            name: "email",
            errors: ["Invalid Email"],
          },
        ]);
      } else {
        form.setFields([{ name: "email", errors: [] }]);
      }
    }

    // if (fieldName === "emailOrNumber") {
    //   if (!value || value.trim().length === 0) {
    //     form.setFields([
    //       {
    //         name: "emailOrNumber",
    //         errors: ["Please provide an email or mobile number"],
    //       },
    //     ]);
    //   } else if (
    //     !EMAIL_REGEX_PATTERN.test(value) &&
    //     !PHONE_REGEX_PATTERN.test(value)
    //   ) {
    //     form.setFields([
    //       {
    //         name: "emailOrNumber",
    //         errors: ["Invalid email or mobile number format"],
    //       },
    //     ]);
    //   } else {
    //     form.setFields([{ name: "emailOrNumber", errors: [] }]);
    //   }
    // }

    if (fieldName === "password") {
      if (!value || value.trim().length === 0) {
        form.setFields([
          { name: "password", errors: ["Password is required"] },
        ]);
      } else if (!PASSWORD_REGEX_PATTERN.test(value)) {
        form.setFields([
          {
            name: "password",
            errors: [
              "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
            ],
          },
        ]);
      } else {
        form.setFields([{ name: "password", errors: [] }]);
      }
    }
  };
  useEffect(() => {
    if (loginUser.isSuccess && loginUser.data) {
      login(loginUser.data);
      Cookies.set(USER_ACCESS_KEY.TOKEN, loginUser.data.token);
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [loginUser.isSuccess, loginUser.data]);

  return {
    form,
    isLogingIn: loginUser.isLoading,
    isGoogleAuthLogingIn,
    onFinish,
    onBlur,
    onGoogleAuth,
  };
};

export default useLoginController;
