import { Form, FormProps } from "antd";
import {
  EMAIL_REGEX_PATTERN,
  PASSWORD_REGEX_PATTERN,
  PHONE_REGEX_PATTERN,
} from "@/utils/regex";

import { useSignUp } from "../services";
import { encryptPassword } from "@/utils";
const useSignUpController = () => {
  const [form] = Form.useForm();
  const signUpUser = useSignUp();

  const onFinish: FormProps<ISignUp>["onFinish"] = (data) => {
    const userEmail = form.getFieldValue("email")?.trim();
    const userMobileNumber = form.getFieldValue("mobileNumber")?.trim();
    const userPassword = form.getFieldValue("password");

    // Email validation
    if (!userEmail) {
      form.setFields([
        {
          name: "email",
          errors: ["Please provide an email."],
        },
      ]);
    } else if (!EMAIL_REGEX_PATTERN.test(userEmail)) {
      form.setFields([
        {
          name: "email",
          errors: ["Please enter a valid email."],
        },
      ]);
    }
    // Mobile number validation
    else if (!userMobileNumber) {
      form.setFields([
        {
          name: "mobileNumber",
          errors: ["Please provide a mobile number."],
        },
      ]);
    } else if (!PHONE_REGEX_PATTERN.test(userMobileNumber)) {
      form.setFields([
        {
          name: "mobileNumber",
          errors: ["Please enter a valid mobile number."],
        },
      ]);
    }
    // Password validation
    else if (!userPassword) {
      form.setFields([
        {
          name: "password",
          errors: ["Password is required."],
        },
      ]);
    } else if (!PASSWORD_REGEX_PATTERN.test(userPassword)) {
      form.setFields([
        {
          name: "password",
          errors: [
            "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
          ],
        },
      ]);
    } else {
      // Clear errors if validation passes
      form.setFields([
        { name: "email", errors: [] },
        { name: "mobileNumber", errors: [] },
        { name: "password", errors: [] },
      ]);

      // Prepare data for submission
      data.password = encryptPassword(userPassword);
      delete data.confirmPassword;

      signUpUser.mutate(data);
    }

    // Proceed with sign-up submission (e.g., API call)
  };

  const onBlur = (fieldName: string) => {
    const value = form.getFieldValue(fieldName);

    if (fieldName === "email") {
      if (!value || value.trim().length === 0) {
        form.setFields([
          {
            name: "email",
            errors: ["Please provide your email"],
          },
        ]);
      } else if (!EMAIL_REGEX_PATTERN.test(value)) {
        form.setFields([
          {
            name: "email",
            errors: ["Invalid email format"],
          },
        ]);
      } else {
        form.setFields([{ name: "email", errors: [] }]);
      }
    }

    // if (fieldName === "mobileNumber") {
    //   if (!value || value.trim().length === 0) {
    //     form.setFields([
    //       { name: "mobileNumber", errors: ["Mobile number is required"] },
    //     ]);
    //   } else if (!PHONE_REGEX_PATTERN.test(value)) {
    //     form.setFields([
    //       {
    //         name: "mobileNumber",
    //         errors: ["Invalid mobile number format"],
    //       },
    //     ]);
    //   } else {
    //     form.setFields([{ name: "mobileNumber", errors: [] }]);
    //   }
    // }

    // if (fieldName === "password") {
    //   if (!value || value.trim().length === 0) {
    //     form.setFields([
    //       { name: "password", errors: ["Password is required"] },
    //     ]);
    //   } else if (!PASSWORD_REGEX_PATTERN.test(value)) {
    //     form.setFields([
    //       {
    //         name: "password",
    //         errors: [
    //           "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
    //         ],
    //       },
    //     ]);
    //   } else {
    //     form.setFields([{ name: "password", errors: [] }]);
    //   }
    // }

    // if (fieldName === "confirmPassword") {
    //   const password = form.getFieldValue("password");
    //   const confirmPassword = form.getFieldValue("confirmPassword");
    //   if (confirmPassword !== password) {
    //     form.setFields([
    //       { name: "confirmPassword", errors: ["Passwords do not match"] },
    //     ]);
    //   } else {
    //     form.setFields([{ name: "confirmPassword", errors: [] }]);
    //   }
    // }
  };

  return { form, onFinish, onBlur };
};

export default useSignUpController;
