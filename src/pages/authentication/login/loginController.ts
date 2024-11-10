import { Form, FormProps } from "antd";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { PASSWORD_CIPHER_MESSAGE, USER_ACCESS_KEY } from "@/utils/enums";
import {
  EMAIL_REGEX_PATTERN,
  PASSWORD_REGEX_PATTERN,
  PHONE_REGEX_PATTERN,
} from "@/utils/regex";

const useLoginController = () => {
  //   const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish: FormProps<ILogin>["onFinish"] = (data) => {
    const userEmailOrNumber = form.getFieldValue("emailOrNumber")?.trim();
    const userPassword = form.getFieldValue("password")?.trim();

    // Email or Number validation
    if (!userEmailOrNumber) {
      form.setFields([
        {
          name: "emailOrNumber",
          errors: ["Please provide an email or mobile number."],
        },
      ]);
      return;
    }
    if (
      !EMAIL_REGEX_PATTERN.test(userEmailOrNumber) &&
      !PHONE_REGEX_PATTERN.test(userEmailOrNumber)
    ) {
      form.setFields([
        {
          name: "emailOrNumber",
          errors: ["Please enter a valid email or mobile number."],
        },
      ]);
      return;
    }

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
    data.emailOrNumber = userEmailOrNumber;
    data.password = CryptoJS.AES.encrypt(
      userPassword,
      PASSWORD_CIPHER_MESSAGE
    ).toString();

    // Proceed with login submission (e.g., API call)
  };

  const onBlur = (fieldName: string) => {
    const value = form.getFieldValue(fieldName);

    if (fieldName === "emailOrNumber") {
      if (!value || value.trim().length === 0) {
        form.setFields([
          {
            name: "emailOrNumber",
            errors: ["Please provide an email or mobile number"],
          },
        ]);
      } else if (
        !EMAIL_REGEX_PATTERN.test(value) &&
        !PHONE_REGEX_PATTERN.test(value)
      ) {
        form.setFields([
          {
            name: "emailOrNumber",
            errors: ["Invalid email or mobile number format"],
          },
        ]);
      } else {
        form.setFields([{ name: "emailOrNumber", errors: [] }]);
      }
    }

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
  return { form, onFinish, onBlur };
};

export default useLoginController;
