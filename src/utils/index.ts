import CryptoJS from "crypto-js";
import { IV_HEX, PASSWORD_CIPHER_MESSAGE } from "./enums";

export const capitalizeFirstLetter = (text: string) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const encryptPassword = (password: string): string => {
  const iv = CryptoJS.enc.Hex.parse(IV_HEX);
  const key = CryptoJS.enc.Utf8.parse(PASSWORD_CIPHER_MESSAGE);

  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    format: CryptoJS.format.Hex,
  });

  return encrypted.toString();
};
